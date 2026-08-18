import { connections } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "unknown connection");
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const deleted = await db
    .delete(connections)
    .where(and(eq(connections.id, id), eq(connections.userId, session.user.id)))
    .returning({ id: connections.id });
  if (deleted.length === 0) return jsonError(404, "unknown connection");
  return NextResponse.json({ ok: true });
}
