import path from "node:path";
import process from "node:process";
import { PGlite } from "@electric-sql/pglite";

// Run one SQL statement against the embedded dev database.
//
//   npm run db:sql -- "select tablename from pg_tables where schemaname='public'"
//
// STOP THE DEV SERVER FIRST — PGlite is single-process; opening the data dir
// from two processes corrupts it.

const query = process.argv.slice(2).join(" ").trim();
if (!query) {
  console.error('usage: npm run db:sql -- "select * from \\"user\\""');
  process.exit(1);
}

const dir =
  process.env.SHOME_PGLITE_DIR ?? path.resolve(process.cwd(), "../../apps/web/.data/pglite");
const db = new PGlite(dir);
try {
  const result = await db.query(query);
  if (result.rows?.length) {
    console.table(result.rows);
    console.log(`${result.rows.length} row(s)`);
  } else {
    console.log(`ok — ${result.affectedRows ?? 0} row(s) affected`);
  }
} finally {
  await db.close();
}
