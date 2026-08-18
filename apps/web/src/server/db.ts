import { createDatabase, type Db } from "@shome/db";

// The database is constructed synchronously so Better Auth can bind to it at
// module scope; migrations run once, and request paths await them via getDb().
// Caching on globalThis keeps one instance across Next dev hot reloads.
interface Handle {
  db: Db;
  ready: Promise<void>;
  close: () => Promise<void>;
}

const g = globalThis as typeof globalThis & {
  __shomeDb?: Handle;
  __shomeDbSignals?: boolean;
};

function registerGracefulClose() {
  if (g.__shomeDbSignals) return;
  g.__shomeDbSignals = true;
  // A PGlite data dir killed mid-write is left unreadable, so flush + close on
  // the signals a normal stop sends (a hard kill still can't be helped —
  // recovery is deleting apps/web/.data, see README).
  for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.once(signal, () => {
      const current = g.__shomeDb;
      const finish = () => process.exit(signal === "SIGINT" ? 130 : 143);
      if (!current) return finish();
      void current.close().then(finish, finish);
    });
  }
}

function handle(): Handle {
  if (!g.__shomeDb) {
    const created = createDatabase();
    const ready = created.migrate();
    // Swallow here to avoid unhandled-rejection noise (awaiters of getDb still
    // see the error) and drop the broken handle so the next request retries.
    g.__shomeDb = { db: created.db, ready, close: created.close };
    registerGracefulClose();
  }
  return g.__shomeDb;
}

/** Synchronous handle for module-scope wiring (Better Auth). Not yet migrated! */
export const db = handle().db;

/** Awaits migrations, then returns the shared handle — use this in request paths. */
export function getDb(): Promise<Db> {
  const h = handle();
  return h.ready.then(() => h.db);
}
