import { auth } from "@/server/auth";
import { getDb } from "@/server/db";

// Better Auth serves its whole surface (sign-up/in/out, session) through this
// catch-all; we only make sure migrations finished before it touches tables.
export async function GET(req: Request) {
  await getDb();
  return auth.handler(req);
}

export async function POST(req: Request) {
  await getDb();
  return auth.handler(req);
}
