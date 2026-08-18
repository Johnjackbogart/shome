import { getConnector } from "@shome/connectors";
import { ConnectorConfigError } from "@shome/core";
import { connections, sources, subscriptions } from "@shome/db";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { BlockedHostError } from "#/server/netguard";
import { guardSource, refreshSubscription } from "#/server/refresh";
import { toSourceView } from "#/server/sources";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const rows = await db
    .select({ source: sources, customTitle: subscriptions.customTitle })
    .from(subscriptions)
    .innerJoin(sources, eq(subscriptions.sourceId, sources.id))
    .where(eq(subscriptions.userId, session.user.id))
    .orderBy(desc(subscriptions.createdAt));
  return NextResponse.json({
    sources: rows.map((row) => toSourceView(row.source, row.customTitle)),
  });
}

const createSchema = z.object({
  kind: z.enum(["rss", "bluesky", "mastodon", "youtube"]),
  config: z.record(z.string(), z.unknown()),
  connectionId: z.string().regex(UUID_RE).optional(),
});

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, createSchema);
  if (!body.ok) return body.res;
  const db = await getDb();
  const userId = session.user.id;

  const connector = getConnector(body.data.kind);
  if (!connector) return jsonError(500, `no connector for kind ${body.data.kind}`);

  let config: Record<string, unknown>;
  try {
    config = connector.parseConfig(body.data.config);
  } catch (err) {
    if (err instanceof ConnectorConfigError) return jsonError(400, err.message);
    throw err;
  }
  try {
    await guardSource(body.data.kind, config);
  } catch (err) {
    if (err instanceof BlockedHostError) return jsonError(400, err.message);
    throw err;
  }

  if (body.data.connectionId) {
    const [connection] = await db
      .select({ id: connections.id })
      .from(connections)
      .where(and(eq(connections.id, body.data.connectionId), eq(connections.userId, userId)))
      .limit(1);
    if (!connection) return jsonError(400, "unknown connection");
  }

  const canonicalKey = connector.canonicalKey(config);
  let [source] = await db
    .insert(sources)
    .values({ kind: body.data.kind, canonicalKey, config })
    .onConflictDoNothing()
    .returning();
  if (!source) {
    [source] = await db
      .select()
      .from(sources)
      .where(eq(sources.canonicalKey, canonicalKey))
      .limit(1);
  }
  if (!source) return jsonError(500, "failed to create source");

  await db
    .insert(subscriptions)
    .values({
      userId,
      sourceId: source.id,
      connectionId: body.data.connectionId,
    })
    .onConflictDoUpdate({
      target: [subscriptions.userId, subscriptions.sourceId],
      set: { connectionId: body.data.connectionId ?? null },
    });

  let fetched: number | undefined;
  let refreshError: string | undefined;
  try {
    ({ fetched } = await refreshSubscription(db, userId, source.id));
  } catch (err) {
    refreshError = err instanceof Error ? err.message : String(err);
  }

  const [updated] = await db.select().from(sources).where(eq(sources.id, source.id)).limit(1);
  return NextResponse.json({
    source: toSourceView(updated ?? source),
    fetched,
    refreshError,
  });
}
