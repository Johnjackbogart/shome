import { getConnector } from "@shome/connectors";
import { SOURCE_FETCH_ERROR } from "@shome/core";
import { connections, type Db, items, sources, subscriptions } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { decryptCredentials } from "./crypto";
import { assertPublicHttpUrl } from "./netguard";

export class NotSubscribedError extends Error {
  constructor() {
    super("not subscribed to this source");
  }
}

/** Carries the connector's own failure as `cause`, for the server side only. */
export class SourceFetchError extends Error {
  constructor(cause: unknown) {
    super(SOURCE_FETCH_ERROR, { cause });
  }
}

/** SSRF check for connector kinds that fetch user-supplied URLs. */
export async function guardSource(kind: string, config: Record<string, unknown>): Promise<void> {
  if (kind === "rss" && typeof config.url === "string") await assertPublicHttpUrl(config.url);
  if (kind === "mastodon" && typeof config.server === "string") {
    await assertPublicHttpUrl(config.server);
  }
}

/**
 * Fetch a source on behalf of one subscriber (credentials come from that
 * subscriber's linked connection) and upsert normalized items. v0 runs this
 * inline on request; a background scheduler takes over later.
 */
export async function refreshSubscription(
  db: Db,
  userId: string,
  sourceId: string,
): Promise<{ fetched: number }> {
  const [row] = await db
    .select({ source: sources, connectionId: subscriptions.connectionId })
    .from(subscriptions)
    .innerJoin(sources, eq(subscriptions.sourceId, sources.id))
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.sourceId, sourceId)))
    .limit(1);
  if (!row) throw new NotSubscribedError();

  const source = row.source;
  const connector = getConnector(source.kind);
  if (!connector) throw new Error(`unknown connector kind: ${source.kind}`);

  let credentials: Record<string, unknown> | undefined;
  if (row.connectionId) {
    const [connection] = await db
      .select()
      .from(connections)
      .where(eq(connections.id, row.connectionId))
      .limit(1);
    // Decrypted only here, in memory, for the duration of the fetch.
    if (connection) credentials = await decryptCredentials(connection.credentials);
  }
  if (source.kind === "youtube" && !credentials?.apiKey && process.env.YOUTUBE_API_KEY) {
    credentials = { ...credentials, apiKey: process.env.YOUTUBE_API_KEY };
  }

  await guardSource(source.kind, source.config);

  try {
    const result = await connector.fetchLatest(source.config, {
      credentials,
      since: source.lastFetchedAt ?? undefined,
    });
    const values = result.items.map((item) => ({
      sourceId: source.id,
      externalId: item.externalId,
      url: item.url ?? null,
      title: item.title ?? null,
      text: item.text ?? null,
      authorName: item.author?.name ?? null,
      authorHandle: item.author?.handle ?? null,
      authorAvatarUrl: item.author?.avatarUrl ?? null,
      media: item.media ?? [],
      publishedAt: item.publishedAt ?? null,
    }));
    if (values.length > 0) {
      await db
        .insert(items)
        .values(values)
        .onConflictDoNothing({ target: [items.sourceId, items.externalId] });
    }
    await db
      .update(sources)
      .set({
        lastFetchedAt: new Date(),
        lastError: null,
        title: result.sourceTitle ?? source.title,
      })
      .where(eq(sources.id, source.id));
    return { fetched: values.length };
  } catch (err) {
    await db
      .update(sources)
      .set({ lastError: SOURCE_FETCH_ERROR })
      .where(eq(sources.id, source.id));
    throw new SourceFetchError(err);
  }
}
