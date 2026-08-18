import { NextResponse } from "next/server";
import { jsonError } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { unfollowPerson } from "#/server/social";

export async function DELETE(_req: Request, ctx: { params: Promise<{ userId: string }> }) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const { userId } = await ctx.params;
  if (!userId || userId.length > 128) return jsonError(400, "invalid shome user");

  await unfollowPerson(await getDb(), session.user.id, userId);
  return NextResponse.json({ ok: true });
}
