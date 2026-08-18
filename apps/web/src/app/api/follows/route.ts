import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { followPerson, socialGraph } from "#/server/social";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  return NextResponse.json(await socialGraph(await getDb(), session.user.id));
}

const followSchema = z.object({ userId: z.string().min(1).max(128) });

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, followSchema);
  if (!body.ok) return body.res;
  if (body.data.userId === session.user.id) return jsonError(400, "you cannot follow yourself");

  const result = await followPerson(await getDb(), session.user.id, body.data.userId);
  if (!result) return jsonError(404, "shome user not found");
  return NextResponse.json(result, { status: result.created ? 201 : 200 });
}
