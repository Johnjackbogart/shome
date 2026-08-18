import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import pg from "pg";
import * as schema from "./schema";

/**
 * Driver-agnostic database handle. Both drivers speak the same Postgres query
 * builder; the casts below erase the driver-specific result generics only.
 */
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

/**
 * Locates the SQL migrations shipped with this package. Resolved lazily and
 * without the `new URL('…', import.meta.url)` pattern, which bundlers
 * (Turbopack) special-case as a static asset reference and fail on folders.
 */
function resolveMigrationsFolder(): string {
  const fromEnv = process.env.SHOME_MIGRATIONS_DIR;
  if (fromEnv) return fromEnv;
  // Unbundled (tests, scripts): relative to this source file.
  try {
    const candidate = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "migrations",
    );
    if (existsSync(candidate)) return candidate;
  } catch {
    // import.meta.url may be rewritten or invalid under a bundler — fall through.
  }
  // Bundled (Next.js): walk up from the server's cwd to the workspace layout.
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    for (const rel of [
      path.join("packages", "db", "migrations"),
      "migrations",
    ]) {
      // This intentionally probes deployment-specific paths. Migration SQL is
      // explicitly included in Next's output trace in apps/web/next.config.ts.
      const candidate = path.join(/* turbopackIgnore: true */ dir, rel);
      if (existsSync(/* turbopackIgnore: true */ candidate)) return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(
    "could not locate @shome/db migrations; set SHOME_MIGRATIONS_DIR to the migrations folder",
  );
}

export interface OpenDatabaseOptions {
  /** Postgres connection string; when absent an embedded PGlite database is used. */
  databaseUrl?: string;
  /** Directory for the embedded database (default .data/pglite; ':memory:' for tests). */
  pgliteDir?: string;
}

export interface DatabaseHandle {
  db: Db;
  /**
   * Resolves once the driver can serve queries, and rejects with a described
   * error if it can never serve them. Awaiting this is what turns an embedded
   * database that failed to boot into a legible failure — see `bootFailure`.
   */
  ready: Promise<void>;
  /** Applies pending migrations; call (and await) before serving queries. Idempotent. */
  migrate: () => Promise<void>;
  /**
   * Flushes and closes the underlying client. Call on shutdown — a PGlite data
   * dir killed mid-write can be left unreadable (recovery: delete the dir).
   */
  close: () => Promise<void>;
}

/**
 * PGlite is Postgres compiled to WASM, so a failed boot surfaces as an
 * Emscripten `abort()` whose stack is entirely inside the bundle — under Next
 * every frame is ignore-listed, leaving only:
 *
 *     Unhandled Rejection: RuntimeError: Aborted(). Build with -sASSERTIONS…
 *         at ignore-listed frames
 *
 * Nothing in that names the database, let alone the cause. Restate it.
 */
function bootFailure(dir: string, cause: unknown): Error {
  return new Error(
    `the embedded PGlite database at ${dir} failed to start. PGlite is ` +
      `single-process: most often another process already holds that ` +
      `directory — a second dev server (any port), or db:sql / db:studio / ` +
      `db:migrate. Stop the other process and retry. If nothing else is ` +
      `running, the directory was left mid-write and is unrecoverable: ` +
      `delete it and restart.`,
    { cause },
  );
}

/**
 * Constructs the database synchronously (so consumers like Better Auth can be
 * configured at module scope) and exposes migrations as a separate step.
 */
export function createDatabase(opts: OpenDatabaseOptions = {}): DatabaseHandle {
  const url = opts.databaseUrl ?? process.env.DATABASE_URL;
  let migrating: Promise<void> | undefined;
  if (url) {
    const pool = new pg.Pool({ connectionString: url });
    const db = drizzlePg(pool, { schema });
    return {
      db: db as unknown as Db,
      // node-postgres connects lazily per query, so there is no boot to await.
      ready: Promise.resolve(),
      migrate: () =>
        (migrating ??= migratePg(db, {
          migrationsFolder: resolveMigrationsFolder(),
        })),
      close: () => pool.end(),
    };
  }
  const dir =
    opts.pgliteDir ??
    process.env.SHOME_PGLITE_DIR ??
    path.join(process.cwd(), ".data", "pglite");
  if (dir !== ":memory:") mkdirSync(dir, { recursive: true }); // PGlite won't create parents
  const client = dir === ":memory:" ? new PGlite() : new PGlite(dir);
  const db = drizzlePglite(client, { schema });

  // PGlite boots asynchronously, but this function is synchronous by design (so
  // Better Auth can bind at module scope) and therefore cannot await it. Observe
  // the boot here so a failure never reaches the unhandled-rejection path, and
  // hand callers a described error instead of the raw Emscripten abort.
  let bootError: Error | undefined;
  const observed = client.waitReady.then(
    () => undefined,
    (cause: unknown) => {
      bootError = bootFailure(dir, cause);
    },
  );

  const ready = observed.then(() => {
    if (bootError) throw bootError;
  });
  // `ready` rejects for anyone who awaits it, but callers are not obliged to.
  // This marks it handled so an unawaited `ready` cannot itself become the
  // unhandled rejection this whole dance exists to remove.
  ready.catch(() => undefined);

  return {
    db: db as unknown as Db,
    ready,
    migrate: () =>
      (migrating ??= observed.then(() => {
        if (bootError) throw bootError;
        return migratePglite(db, {
          migrationsFolder: resolveMigrationsFolder(),
        });
      })),
    close: () => client.close(),
  };
}

/** Convenience for tests/scripts: construct and migrate in one call. */
export async function openDatabase(
  opts: OpenDatabaseOptions = {},
): Promise<Db> {
  const handle = createDatabase(opts);
  await handle.migrate();
  return handle.db;
}
