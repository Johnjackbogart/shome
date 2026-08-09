import { NextResponse } from "next/server";
import { jsonError, UUID_RE } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { BlockedHostError } from "@/server/netguard";
import { NotSubscribedError, refreshSubscription } from "@/server/refresh";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "unknown source");
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  try {
    const { fetched } = await refreshSubscription(db, session.user.id, id);
    return NextResponse.json({ fetched });
  } catch (err) {
    if (err instanceof NotSubscribedError) return jsonError(404, err.message);
    if (err instanceof BlockedHostError) return jsonError(400, err.message);
    return jsonError(502, err instanceof Error ? err.message : String(err));
  }
}
