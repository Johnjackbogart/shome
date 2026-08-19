import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import pg from "pg";

// Apply pending migrations, reporting what is about to run and what ran.
//
//   npm run db:migrate
//
// The migration itself is drizzle's own migrator — the same call
// `drizzle-kit migrate` makes; everything else here is the report around it.
//
// STOP THE DEV SERVER FIRST when using the embedded database — PGlite is
// single-process; opening the data dir from two processes corrupts it.

const migrationsFolder =
  process.env.SHOME_MIGRATIONS_DIR ??
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "migrations");

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = paint(1);
const dim = paint(2);
const green = paint(32);
const yellow = paint(33);
const red = paint(31);

const ms = (n) => (n < 1000 ? `${Math.round(n)}ms` : `${(n / 1000).toFixed(1)}s`);
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const shortPath = (target) => path.relative(process.cwd(), target) || target;

/** Hides the password when echoing back a connection string. */
function describeUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    return parsed.href;
  } catch {
    return "the configured DATABASE_URL";
  }
}

/**
 * The journal is drizzle's ordered index of migration files. Each entry's
 * `when` is what lands in `drizzle.__drizzle_migrations.created_at`, and that
 * is how drizzle decides what has already run — so it is also how this script
 * decides what it is about to run.
 */
function readJournal() {
  const journalPath = path.join(migrationsFolder, "meta", "_journal.json");
  const journal = JSON.parse(readFileSync(journalPath, "utf8"));
  return journal.entries.map((entry) => {
    const file = path.join(migrationsFolder, `${entry.tag}.sql`);
    const sql = readFileSync(file, "utf8");
    return {
      tag: entry.tag,
      when: entry.when,
      statements: sql.split("--> statement-breakpoint").length,
      bytes: statSync(file).size,
      hash: createHash("sha256").update(sql).digest("hex"),
    };
  });
}

/** True for the errors a first-ever run raises: no drizzle schema, no table. */
function isMissingBookkeeping(error) {
  const code = error?.code;
  if (code === "42P01" || code === "3F000") return true;
  return code === undefined && /does not exist/i.test(String(error?.message ?? ""));
}

/** Rows already in drizzle's bookkeeping table; empty before the first run. */
async function readApplied(query) {
  try {
    const rows = await query(
      'select hash, created_at from drizzle."__drizzle_migrations" order by created_at',
    );
    return rows.map((row) => ({ hash: row.hash, when: Number(row.created_at) }));
  } catch (error) {
    if (isMissingBookkeeping(error)) return [];
    throw error;
  }
}

/** Connects to whichever database the app itself would use. */
function openTarget() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const pool = new pg.Pool({ connectionString: url });
    const db = drizzlePg(pool);
    return {
      description: `Postgres at ${describeUrl(url)}`,
      ready: async () => {}, // node-postgres connects lazily per query
      query: async (text) => (await pool.query(text)).rows,
      run: () => migratePg(db, { migrationsFolder }),
      close: () => pool.end(),
    };
  }
  const dir =
    process.env.SHOME_PGLITE_DIR ??
    path.resolve(process.cwd(), "..", "..", "apps", "web", ".data", "pglite");
  mkdirSync(dir, { recursive: true }); // PGlite won't create parents
  const client = new PGlite(dir);
  const db = drizzlePglite(client);
  return {
    description: `embedded PGlite at ${shortPath(dir)}`,
    // A failed WASM boot is otherwise a bare `Aborted()` with no usable stack,
    // and by far the likeliest cause is that something else holds the dir.
    ready: () =>
      client.waitReady.catch((cause) => {
        throw new Error(
          `${dir} could not be opened. PGlite is single-process: stop the dev ` +
            `server (and db:sql / db:studio) and run this again. If nothing ` +
            `else is running, the directory was left mid-write and is ` +
            `unrecoverable: delete it and re-run.`,
          { cause },
        );
      }),
    query: async (text) => (await client.query(text)).rows,
    run: () => migratePglite(db, { migrationsFolder }),
    close: () => client.close(),
  };
}

async function main() {
  const entries = readJournal();
  const target = openTarget();

  console.log(`${bold("db:migrate")} → ${target.description}`);
  console.log(dim(`  from ${shortPath(migrationsFolder)} (${plural(entries.length, "file")})`));

  try {
    await target.ready();
    const applied = await readApplied(target.query);
    const lastApplied = applied.at(-1);
    const appliedHashes = new Set(applied.map((row) => row.hash));
    // Drizzle compares against the newest applied migration only, so a file
    // whose `when` predates it never runs — report that instead of letting the
    // summary claim the database is up to date.
    const pending = entries.filter((entry) => !lastApplied || entry.when > lastApplied.when);
    const stranded = entries.filter(
      (entry) => lastApplied && entry.when <= lastApplied.when && !appliedHashes.has(entry.hash),
    );

    const latest = lastApplied ? `, latest ${new Date(lastApplied.when).toISOString()}` : "";
    console.log(dim(`  applied: ${applied.length}${latest} · pending: ${pending.length}`));

    for (const entry of stranded) {
      const editedInPlace = applied.some((row) => row.when === entry.when);
      console.log(
        yellow(
          editedInPlace
            ? `  ! ${entry.tag} already ran but its SQL has changed since — the change is not applied`
            : `  ! ${entry.tag} is older than the last applied migration and will never run — regenerate it`,
        ),
      );
    }

    if (pending.length === 0) {
      console.log(green("  ✓ up to date, nothing to apply"));
      return;
    }

    console.log(bold(`  applying ${pending.length}:`));
    for (const entry of pending) {
      const size = `${plural(entry.statements, "statement")}, ${(entry.bytes / 1024).toFixed(1)} KB`;
      console.log(`    ${entry.tag} ${dim(`(${size})`)}`);
    }

    const started = Date.now();
    await target.run();
    const elapsed = Date.now() - started;

    // Report what the database says landed, not what was planned.
    const after = await readApplied(target.query);
    const landed = after.filter((row) => !applied.some((prev) => prev.when === row.when));
    for (const row of landed) {
      const entry = entries.find((candidate) => candidate.hash === row.hash);
      console.log(green(`    ✓ ${entry?.tag ?? row.hash.slice(0, 12)}`));
    }
    console.log(green(`  ✓ applied ${plural(landed.length, "migration")} in ${ms(elapsed)}`));
  } catch (error) {
    // Drizzle runs every pending migration in one transaction, so a failure
    // leaves the database exactly as it was — say so, since the plan printed
    // above otherwise reads as half-applied.
    console.error(red("  ✗ migration failed — no changes were applied (single transaction)"));
    console.error(error);
    process.exitCode = 1;
  } finally {
    await target.close();
  }
}

await main();
