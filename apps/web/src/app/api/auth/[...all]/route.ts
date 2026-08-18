import { auth } from "#/server/auth";
import { getDb } from "#/server/db";

// Better Auth serves its whole surface (sign-up/in/out, session) through this
// catch-all. Its adapter is configured at module scope, so wait for PGlite's
// asynchronous boot before it issues its first query.
export async function GET(req: Request) {
  await getDb();
  return auth.handler(req);
}

export async function POST(req: Request) {
  await getDb();
  return auth.handler(req);
}
