import type { SourceKind } from "@shome/core";
import { items, posts, sources, subscriptions, user } from "@shome/db";
import { and, desc, eq, ilike, or, type SQL, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { FeedItemView } from "@/lib/types";
import { jsonError, UUID_RE } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { mediaByPostId, postToFeedItem } from "@/server/posting";

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
    const pattern = `%${q.replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`;
    const match = or(ilike(items.title, pattern), ilike(items.text, pattern));
    if (match) filters.push(match);
  }

  const rows =
    kind === "post"
      ? []
      : await db
          .select({
            item: items,
            sourceKind: sources.kind,
            sourceTitle: sources.title,
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
    sourceTitle,
    url: item.url,
    title: item.title,
    text: item.text,
    html: item.html,
    authorName: item.authorName,
    authorHandle: item.authorHandle,
    authorAvatarUrl: item.authorAvatarUrl,
    media: item.media,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    fetchedAt: item.fetchedAt.toISOString(),
  }));

  const postRows =
    sourceId || (kind && kind !== "post")
      ? []
      : await db
          .select({ post: posts, name: user.name, username: user.username, image: user.image })
          .from(posts)
          .innerJoin(user, eq(posts.userId, user.id))
          .where(
            and(
              eq(posts.userId, session.user.id),
              ...(q ? [ilike(posts.text, `%${q.replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`)] : []),
            ),
          )
          .orderBy(desc(posts.createdAt))
          .limit(limit);
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
