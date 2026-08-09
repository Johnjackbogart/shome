import { createDatabase, type Db } from "@shome/db";

// The database is constructed synchronously so Better Auth can bind to it at
// module scope; migrations run once, and request paths await them via getDb().
// Caching on globalThis keeps one instance across Next dev hot reloads.
interface Handle {
  db: Db;
  ready: Promise<void>;
}

const g = globalThis as typeof globalThis & { __shomeDb?: Handle };

function handle(): Handle {
  if (!g.__shomeDb) {
    const created = createDatabase();
    const ready = created.migrate();
    // Swallow here to avoid unhandled-rejection noise (awaiters of getDb still
    // see the error) and drop the broken handle so the next request retries.
    ready.catch(() => {
      if (g.__shomeDb?.ready === ready) g.__shomeDb = undefined;
    });
    g.__shomeDb = { db: created.db, ready };
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
