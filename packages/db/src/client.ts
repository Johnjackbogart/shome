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
    const candidate = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "migrations");
    if (existsSync(candidate)) return candidate;
  } catch {
    // import.meta.url may be rewritten or invalid under a bundler — fall through.
  }
  // Bundled (Next.js): walk up from the server's cwd to the workspace layout.
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    for (const rel of [path.join("packages", "db", "migrations"), "migrations"]) {
      const candidate = path.join(dir, rel);
      if (existsSync(candidate)) return candidate;
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
  /** Applies pending migrations; call (and await) before serving queries. Idempotent. */
  migrate: () => Promise<void>;
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
      migrate: () =>
        (migrating ??= migratePg(db, {
          migrationsFolder: resolveMigrationsFolder(),
        })),
    };
  }
  const dir =
    opts.pgliteDir ?? process.env.SHOME_PGLITE_DIR ?? path.join(process.cwd(), ".data", "pglite");
  if (dir !== ":memory:") mkdirSync(dir, { recursive: true }); // PGlite won't create parents
  const client = dir === ":memory:" ? new PGlite() : new PGlite(dir);
  const db = drizzlePglite(client, { schema });
  return {
    db: db as unknown as Db,
    migrate: () =>
      (migrating ??= migratePglite(db, {
        migrationsFolder: resolveMigrationsFolder(),
      })),
  };
}

/** Convenience for tests/scripts: construct and migrate in one call. */
export async function openDatabase(opts: OpenDatabaseOptions = {}): Promise<Db> {
  const handle = createDatabase(opts);
  await handle.migrate();
  return handle.db;
}
