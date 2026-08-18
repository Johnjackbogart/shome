import { subscriptions } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { refreshSubscription } from "#/server/refresh";

// v0 refreshes inline and sequentially; a background scheduler replaces this.
export async function POST() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();
  const userId = session.user.id;

  const subs = await db
    .select({ sourceId: subscriptions.sourceId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));

  const results: { sourceId: string; fetched?: number; error?: string }[] = [];
  for (const { sourceId } of subs) {
    try {
      const { fetched } = await refreshSubscription(db, userId, sourceId);
      results.push({ sourceId, fetched });
    } catch (err) {
      results.push({
        sourceId,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  return NextResponse.json({ results });
}
