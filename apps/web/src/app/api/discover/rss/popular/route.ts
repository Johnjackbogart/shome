import type { PopularRssFeed } from "@shome/core";
import { sources, subscriptions } from "@shome/db";
import { count, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { discoverPopularRssFeeds, RssDiscoveryError } from "@/server/rss-discovery";

function toPopularFeed(
  source: typeof sources.$inferSelect,
  subscriberCount: number,
): PopularRssFeed | null {
  const url = source.config.url;
  if (typeof url !== "string") return null;
  return {
    url,
    title: source.title,
    description: null,
    siteName: null,
    siteUrl: null,
    isPodcast: false,
    subscriberCount,
  };
}

/**
 * Uses Shome's aggregate subscription data once it exists. Feedly's public
 * directory is only the cold-start fallback for an otherwise empty instance.
 */
export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();
  const subscriberCount = count(subscriptions.userId);
  const rows = await db
    .select({ source: sources, subscriberCount })
    .from(sources)
    .innerJoin(subscriptions, eq(subscriptions.sourceId, sources.id))
    .where(eq(sources.kind, "rss"))
    .groupBy(sources.id)
    .orderBy(desc(subscriberCount), sources.title, sources.canonicalKey)
    .limit(12);
  const localFeeds = rows
    .map((row) => toPopularFeed(row.source, row.subscriberCount))
    .filter((feed): feed is PopularRssFeed => feed !== null);
  if (localFeeds.length > 0) {
    return NextResponse.json({ feeds: localFeeds, origin: "shome" });
  }

  try {
    return NextResponse.json({ feeds: await discoverPopularRssFeeds(), origin: "feedly" });
  } catch (err) {
    if (err instanceof RssDiscoveryError) return jsonError(err.status, err.message);
    throw err;
  }
}
