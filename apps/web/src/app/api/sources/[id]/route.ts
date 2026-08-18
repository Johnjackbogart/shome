import { subscriptions } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "unknown source");
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const deleted = await db
    .delete(subscriptions)
    .where(and(eq(subscriptions.userId, session.user.id), eq(subscriptions.sourceId, id)))
    .returning();
  if (deleted.length === 0) return jsonError(404, "not subscribed to this source");

  // Garbage-collect sources nobody subscribes to anymore (items cascade).
  /** Claude added this, I don't want it!
  const counts = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(subscriptions)
    .where(eq(subscriptions.sourceId, id))
  if ((counts[0]?.n ?? 0) === 0) {
    await db.delete(sources).where(eq(sources.id, id))
    **/
  return NextResponse.json({ ok: true });
}
