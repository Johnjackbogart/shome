import { AtpAgent } from "@atproto/api";
import type { CrossPostLink, FeedItemView } from "@shome/core";
import { connections, type Db, type Post, type PostMedia, postMedia, posts } from "@shome/db";
import { and, asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { decryptCredentials } from "./crypto";
import { assertPublicHttpUrl } from "./netguard";

type Provider = "bluesky" | "mastodon";

export interface DeliveryResult {
  provider: Provider;
  ok: boolean;
  url?: string;
  error?: string;
}

export type NewPostMedia = Pick<
  PostMedia,
  | "id"
  | "type"
  | "contentType"
  | "byteSize"
  | "durationMs"
  | "originalName"
  | "provider"
  | "providerAssetId"
  | "status"
  | "playbackUrl"
  | "thumbnailUrl"
>;

// Stored credentials are an untyped JSON blob until they are parsed: the
// column holds a JWE, so `decryptCredentials` can only promise an object.
// Each provider narrows its own shape, and the payloads differ per provider.
const credentialField = z.string().trim().min(1);

const blueskyCredentials = z.object({
  identifier: credentialField,
  appPassword: credentialField,
});

const mastodonCredentials = z.object({
  accessToken: credentialField,
  server: credentialField,
});

function readableError(err: unknown): string {
  if (err instanceof Error && err.message) return err.message.slice(0, 240);
  return "the platform did not accept this post";
}

function blueskyPostUrl(uri: string): string {
  const [did, collection, rkey] = uri.replace(/^at:\/\//, "").split("/");
  if (!did || collection !== "app.bsky.feed.post" || !rkey) {
    throw new Error("Bluesky returned an unexpected post reference");
  }
  return `https://bsky.app/profile/${did}/post/${rkey}`;
}

async function publishBluesky(credentials: Record<string, unknown>, text: string): Promise<string> {
  // The public API permits 300 Unicode characters in a post. This keeps the
  // local post intact while returning a clear per-platform delivery failure.
  if ([...text].length > 300) throw new Error("Bluesky posts are limited to 300 characters");

  const parsed = blueskyCredentials.safeParse(credentials);
  if (!parsed.success) {
    throw new Error("this Bluesky connection needs an identifier and app password");
  }
  const { identifier, appPassword } = parsed.data;
  // Connections currently target the hosted Bluesky service. Deliberately do
  // not accept a credential-supplied service URL here: this request sends an
  // app password and must never be redirectable toward an arbitrary host.
  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password: appPassword });
  const created = await agent.post({ text });
  return blueskyPostUrl(created.uri);
}

function mastodonOrigin(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("this Mastodon connection needs a valid server URL");
  }
  if (url.protocol !== "https:") throw new Error("Mastodon server URLs must use https");
  return url.origin;
}

async function publishMastodon(
  credentials: Record<string, unknown>,
  text: string,
): Promise<string> {
  const parsed = mastodonCredentials.safeParse(credentials);
  if (!parsed.success) {
    throw new Error("this Mastodon connection needs a server URL and access token");
  }
  const { accessToken, server } = parsed.data;
  const origin = mastodonOrigin(server);
  // Credentials are user supplied, so guard legacy rows too (not only new
  // connection submissions) before sending an Authorization header.
  await assertPublicHttpUrl(origin);
  const res = await fetch(`${origin}/api/v1/statuses`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/json",
    },
    body: new URLSearchParams({ status: text }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`Mastodon rejected this post (HTTP ${res.status})`);
  const data = (await res.json()) as { url?: unknown };
  if (typeof data.url !== "string" || data.url.length === 0) {
    throw new Error("Mastodon did not return a post URL");
  }
  return data.url;
}

async function deliver(
  db: Db,
  userId: string,
  provider: Provider,
  connectionId: string,
  text: string,
): Promise<DeliveryResult> {
  try {
    const [connection] = await db
      .select({ credentials: connections.credentials })
      .from(connections)
      .where(
        and(
          eq(connections.id, connectionId),
          eq(connections.userId, userId),
          eq(connections.provider, provider),
        ),
      )
      .limit(1);
    if (!connection) return { provider, ok: false, error: "linked connection is unavailable" };

    const credentials = await decryptCredentials(connection.credentials);
    const url =
      provider === "bluesky"
        ? await publishBluesky(credentials, text)
        : await publishMastodon(credentials, text);
    return { provider, ok: true, url };
  } catch (err) {
    return { provider, ok: false, error: readableError(err) };
  }
}

export function crossPostLinks(post: Pick<Post, "blueskyUrl" | "mastodonUrl">): CrossPostLink[] {
  const links: CrossPostLink[] = [];
  if (post.blueskyUrl) links.push({ provider: "bluesky", url: post.blueskyUrl });
  if (post.mastodonUrl) links.push({ provider: "mastodon", url: post.mastodonUrl });
  return links;
}

export function postToFeedItem(
  post: Post,
  author: { name: string | null; username: string | null; image: string | null },
  media: readonly PostMedia[] = [],
): FeedItemView {
  return {
    id: post.id,
    // First-party posts do not have a fetched source; this stable sentinel
    // keeps the existing feed card contract without pretending otherwise.
    sourceId: `post:${post.id}`,
    sourceKind: "post",
    sourceTitle: "my post",
    url: null,
    title: null,
    text: post.text,
    html: null,
    authorName: author.name || author.username || "me",
    authorHandle: author.username,
    authorAvatarUrl: author.image,
    media: media.map(postMediaToMediaView),
    publishedAt: post.createdAt.toISOString(),
    fetchedAt: post.createdAt.toISOString(),
    crossPosts: crossPostLinks(post),
  };
}

export function postMediaUrl(id: string): string {
  return `/api/media/${id}`;
}

export function postMediaToMediaView(
  media: Pick<
    PostMedia,
    "id" | "type" | "provider" | "providerAssetId" | "status" | "playbackUrl" | "thumbnailUrl"
  >,
) {
  const cloudflareVideoId =
    media.provider === "cloudflare_stream" && media.type === "video" ? media.providerAssetId : null;
  return {
    type: media.type,
    url: media.playbackUrl ?? postMediaUrl(media.id),
    embedUrl: cloudflareVideoId
      ? `https://iframe.videodelivery.net/${encodeURIComponent(cloudflareVideoId)}`
      : undefined,
    thumbnailUrl: media.thumbnailUrl ?? undefined,
    status: media.status,
  };
}

export async function mediaByPostId(
  db: Db,
  postIds: readonly string[],
): Promise<Map<string, PostMedia[]>> {
  const grouped = new Map<string, PostMedia[]>();
  if (postIds.length === 0) return grouped;
  const attachments = await db
    .select()
    .from(postMedia)
    .where(inArray(postMedia.postId, [...postIds]))
    .orderBy(asc(postMedia.createdAt));
  for (const attachment of attachments) {
    const current = grouped.get(attachment.postId) ?? [];
    current.push(attachment);
    grouped.set(attachment.postId, current);
  }
  return grouped;
}

export async function createPost(
  db: Db,
  input: {
    userId: string;
    text: string;
    blueskyConnectionId?: string;
    mastodonConnectionId?: string;
    media?: NewPostMedia[];
  },
): Promise<{ post: Post; media: PostMedia[]; deliveries: DeliveryResult[] }> {
  const { created, attachedMedia } = await db.transaction(async (tx) => {
    const [post] = await tx
      .insert(posts)
      .values({ userId: input.userId, text: input.text })
      .returning();
    if (!post) throw new Error("could not save post");
    const attachedMedia = input.media?.length
      ? await tx
          .insert(postMedia)
          .values(input.media.map((media) => ({ ...media, postId: post.id })))
          .returning()
      : [];
    return { created: post, attachedMedia };
  });
  if (!created) throw new Error("could not save post");

  // Platform integrations currently have text-only publish contracts. Media is
  // still safely published to shome; an empty media-only post must not turn
  // into an invalid empty delivery attempt on an external platform.
  const deliveries = input.text
    ? await Promise.all(
        [
          input.blueskyConnectionId
            ? deliver(db, input.userId, "bluesky", input.blueskyConnectionId, input.text)
            : null,
          input.mastodonConnectionId
            ? deliver(db, input.userId, "mastodon", input.mastodonConnectionId, input.text)
            : null,
        ].filter((delivery): delivery is Promise<DeliveryResult> => delivery !== null),
      )
    : [];

  const blueskyUrl = deliveries.find(
    (delivery) => delivery.provider === "bluesky" && delivery.ok,
  )?.url;
  const mastodonUrl = deliveries.find(
    (delivery) => delivery.provider === "mastodon" && delivery.ok,
  )?.url;
  if (!blueskyUrl && !mastodonUrl) return { post: created, media: attachedMedia, deliveries };

  const [updated] = await db
    .update(posts)
    .set({ blueskyUrl: blueskyUrl ?? null, mastodonUrl: mastodonUrl ?? null })
    .where(eq(posts.id, created.id))
    .returning();
  return { post: updated ?? created, media: attachedMedia, deliveries };
}
