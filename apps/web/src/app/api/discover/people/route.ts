import { NextResponse } from "next/server";
import { jsonError } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { searchPeople } from "#/server/social";

export async function GET(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");

  const query = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (query.length > 100) return jsonError(400, "search is limited to 100 characters");

  const people = await searchPeople(await getDb(), session.user.id, query);
  return NextResponse.json({ people });
}
