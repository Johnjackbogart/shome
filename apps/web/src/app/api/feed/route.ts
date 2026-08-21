import type { SourceKind } from "@shome/core";
import { follows, items, posts, sources, subscriptions, user } from "@shome/db";
import { and, desc, eq, ilike, inArray, or, type SQL, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { FeedItemView } from "#/lib/types";
import { containsPattern, jsonError, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { mediaByPostId, postToFeedItem } from "#/server/posting";

const KINDS = ["rss", "bluesky", "mastodon", "youtube", "post"] as const;

export async function GET(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const params = new URL(req.url).searchParams;
  const limitRaw = Number(params.get("limit") ?? "50");
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 200) : 50;
  const q = params.get("q")?.trim() || undefined;
  const kind = params.get("kind") || undefined;
  const sourceId = params.get("sourceId") || undefined;
  if (kind && !KINDS.includes(kind as (typeof KINDS)[number]))
    return jsonError(400, "unknown kind");
  if (sourceId && !UUID_RE.test(sourceId)) return jsonError(400, "invalid sourceId");

  const filters: SQL[] = [eq(subscriptions.userId, session.user.id)];
  if (kind && kind !== "post") filters.push(eq(sources.kind, kind as SourceKind));
  if (sourceId) filters.push(eq(items.sourceId, sourceId));
  if (q) {
    // Searching a feed means searching for who said it as much as what was
    // said, so the publication and author names match alongside the body.
    const pattern = containsPattern(q);
    const match = or(
      ilike(items.title, pattern),
      ilike(items.text, pattern),
      ilike(items.authorName, pattern),
      ilike(items.authorHandle, pattern),
      ilike(sources.title, pattern),
      ilike(subscriptions.customTitle, pattern),
    );
    if (match) filters.push(match);
  }

  const rows =
    kind === "post"
      ? []
      : await db
          .select({
            item: items,
            sourceKind: sources.kind,
            // A rename by this subscriber wins over the name the feed reported.
            sourceTitle: sql<
              string | null
            >`coalesce(${subscriptions.customTitle}, ${sources.title})`,
          })
          .from(items)
          .innerJoin(subscriptions, eq(items.sourceId, subscriptions.sourceId))
          .innerJoin(sources, eq(items.sourceId, sources.id))
          .where(and(...filters))
          .orderBy(sql`coalesce(${items.publishedAt}, ${items.fetchedAt}) desc`)
          .limit(limit);

  const sourceViews: FeedItemView[] = rows.map(({ item, sourceKind, sourceTitle }) => ({
    id: item.id,
    sourceId: item.sourceId,
    sourceKind,
    style: "",
    sourceTitle,
    url: item.url,
    title: item.title,
    text: item.text,
    authorName: item.authorName,
    authorHandle: item.authorHandle,
    authorAvatarUrl: item.authorAvatarUrl,
    media: item.media,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    fetchedAt: item.fetchedAt.toISOString(),
  }));

  const includePosts = !sourceId && (!kind || kind === "post");
  const followedUserIds = includePosts
    ? (
        await db
          .select({ followingId: follows.followingId })
          .from(follows)
          .where(eq(follows.followerId, session.user.id))
      ).map((relationship) => relationship.followingId)
    : [];
  const postAuthors = [session.user.id, ...followedUserIds];
  const postSearch = q
    ? or(
        ilike(posts.text, containsPattern(q)),
        ilike(user.name, containsPattern(q)),
        ilike(user.username, containsPattern(q)),
      )
    : undefined;
  const postRows = includePosts
    ? await db
        .select({ post: posts, name: user.name, username: user.username, image: user.image })
        .from(posts)
        .innerJoin(user, eq(posts.userId, user.id))
        .where(and(inArray(posts.userId, postAuthors), ...(postSearch ? [postSearch] : [])))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
    : [];
  const attachments = await mediaByPostId(
    db,
    postRows.map(({ post }) => post.id),
  );
  const postViews = postRows.map(({ post, name, username, image }) =>
    postToFeedItem(post, { name, username, image }, attachments.get(post.id)),
  );

  const views = [...sourceViews, ...postViews]
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.fetchedAt).getTime() -
        new Date(a.publishedAt ?? a.fetchedAt).getTime(),
    )
    .slice(0, limit);
  return NextResponse.json({ items: views });
}
