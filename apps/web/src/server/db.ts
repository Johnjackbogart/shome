import { createDatabase, type Db } from "@shome/db";

// The database is constructed synchronously so Better Auth can bind to it at
// module scope. The server never migrates: schema changes are applied out of
// band with `npm run db:migrate`, so a deploy cannot alter the database while
// starting. Caching on globalThis keeps one instance across Next dev hot reloads.
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
    g.__shomeDb = {
      db: created.db,
      ready: created.ready,
      close: created.close,
    };
    registerGracefulClose();
  }
  return g.__shomeDb;
}

/** Synchronous handle for module-scope wiring (Better Auth). */
export const db = handle().db;

/**
 * The shared handle, for request paths. The await is the seam that makes an
 * embedded database which failed to boot legible: it rejects with an error
 * naming the data directory and the likely cause, so the route returns that
 * instead of an opaque WASM abort. Once booted this is an already-resolved
 * promise, so it costs a microtask.
 */
export async function getDb(): Promise<Db> {
  const current = handle();
  await current.ready;
  return current.db;
}
