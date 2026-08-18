import type { DiscoveredRssFeed, PopularRssFeed } from "@shome/core";

const FEEDSEARCH_ENDPOINT = "https://feedsearch.dev/api/v1/search";
const FEEDLY_SEARCH_ENDPOINT = "https://cloud.feedly.com/v3/search/feeds";
const USER_AGENT = "shome/0.1 (open source media engine)";
const MAX_RESULTS = 20;
const MAX_URL_LENGTH = 2_048;
const MAX_TEXT_LENGTH = 500;
const POPULAR_CACHE_MS = 30 * 60 * 1_000;

let popularCache: { expiresAt: number; feeds: PopularRssFeed[] } | undefined;

export class RssDiscoveryError extends Error {
  constructor(
    message: string,
    public readonly status = 502,
  ) {
    super(message);
  }
}

/**
 * Feedsearch accepts bare domains, but normalizing them here gives the SSRF
 * guard one unambiguous public HTTP(S) URL to validate before any lookup.
 */
export function normalizeDiscoveryUrl(rawUrl: string): string {
  const input = rawUrl.trim();
  if (!input) throw new RssDiscoveryError("website URL is required", 400);
  if (input.length > MAX_URL_LENGTH) throw new RssDiscoveryError("website URL is too long", 400);

  let url: URL;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    throw new RssDiscoveryError("website URL is not valid", 400);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new RssDiscoveryError("website URL must use http(s)", 400);
  }
  if (url.username || url.password) {
    throw new RssDiscoveryError("website URL must not contain credentials", 400);
  }
  url.hash = "";
  return url.toString();
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, MAX_TEXT_LENGTH) : null;
}

function feedUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.length > MAX_URL_LENGTH) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function parseFeed(value: unknown): DiscoveredRssFeed | null {
  if (!value || typeof value !== "object") return null;
  const result = value as Record<string, unknown>;
  const url = feedUrl(result.url);
  if (!url) return null;
  return {
    url,
    title: text(result.title),
    description: text(result.description),
    siteName: text(result.site_name),
    siteUrl: feedUrl(result.site_url),
    isPodcast: result.is_podcast === true,
  };
}

function parsePopularFeed(value: unknown): PopularRssFeed | null {
  if (!value || typeof value !== "object") return null;
  const result = value as Record<string, unknown>;
  if (result.valid === false) return null;
  const rawFeedId = typeof result.feedId === "string" ? result.feedId : result.id;
  const url = feedUrl(typeof rawFeedId === "string" ? rawFeedId.replace(/^feed\//, "") : rawFeedId);
  if (!url) return null;
  const rawSubscribers = result.subscribers;
  const subscriberCount =
    typeof rawSubscribers === "number" &&
    Number.isSafeInteger(rawSubscribers) &&
    rawSubscribers >= 0
      ? rawSubscribers
      : null;
  if (subscriberCount === null) return null;

  return {
    url,
    title: text(result.title),
    description: text(result.description),
    siteName: null,
    siteUrl: feedUrl(result.website),
    isPodcast: false,
    subscriberCount,
  };
}

function parseFeedlyResults(payload: unknown): PopularRssFeed[] {
  if (
    !payload ||
    typeof payload !== "object" ||
    !Array.isArray((payload as { results?: unknown }).results)
  ) {
    throw new RssDiscoveryError("source search returned an unexpected response");
  }
  const seen = new Set<string>();
  return ((payload as { results: unknown[] }).results ?? [])
    .map(parsePopularFeed)
    .filter((feed): feed is PopularRssFeed => feed !== null)
    .filter((feed) => !seen.has(feed.url) && seen.add(feed.url));
}

/** Searches Feedly's public source directory by a publisher name or topic. */
export async function searchFeedlyRssFeeds(query: string): Promise<PopularRssFeed[]> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) throw new RssDiscoveryError("search is required", 400);
  if (normalizedQuery.length > MAX_TEXT_LENGTH) {
    throw new RssDiscoveryError("search is too long", 400);
  }

  const endpoint = new URL(FEEDLY_SEARCH_ENDPOINT);
  endpoint.searchParams.set("query", normalizedQuery);
  endpoint.searchParams.set("count", String(MAX_RESULTS));

  let response: Response;
  try {
    response = await fetch(endpoint, {
      signal: AbortSignal.timeout(15_000),
      headers: { accept: "application/json", "user-agent": USER_AGENT },
    });
  } catch {
    throw new RssDiscoveryError("source search service is unavailable", 503);
  }
  if (!response.ok) {
    throw new RssDiscoveryError(`source search failed: HTTP ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new RssDiscoveryError("source search returned invalid JSON");
  }
  return parseFeedlyResults(payload);
}

/** A dotted hostname or path is a URL; other input is a publisher-name search. */
export function looksLikeWebsite(rawInput: string): boolean {
  const input = rawInput.trim();
  return !/\s/.test(input) && (input.includes(".") || input.includes("/") || input.includes(":"));
}

/**
 * Finds feeds for one public website through Feedsearch's on-demand crawler.
 * This intentionally is not a global search: it only asks about the site the
 * user supplied, which keeps third-party crawling targeted and predictable.
 */
export async function discoverRssFeeds(siteUrl: string): Promise<DiscoveredRssFeed[]> {
  const endpoint = new URL(FEEDSEARCH_ENDPOINT);
  endpoint.searchParams.set("url", siteUrl);
  endpoint.searchParams.set("info", "true");
  endpoint.searchParams.set("favicon", "false");
  endpoint.searchParams.set("skip_crawl", "false");

  let response: Response;
  try {
    response = await fetch(endpoint, {
      signal: AbortSignal.timeout(15_000),
      headers: { accept: "application/json", "user-agent": USER_AGENT },
    });
  } catch {
    throw new RssDiscoveryError("feed discovery service is unavailable", 503);
  }
  if (!response.ok) {
    throw new RssDiscoveryError(`feed discovery failed: HTTP ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new RssDiscoveryError("feed discovery returned invalid JSON");
  }
  if (!Array.isArray(payload)) {
    throw new RssDiscoveryError("feed discovery returned an unexpected response");
  }

  const seen = new Set<string>();
  return payload
    .map(parseFeed)
    .filter((feed): feed is DiscoveredRssFeed => feed !== null)
    .filter((feed) => !seen.has(feed.url) && seen.add(feed.url))
    .slice(0, MAX_RESULTS);
}

/**
 * Returns real, globally popular feeds. Feedly publishes the subscriber count
 * with public source-search results, so a new Shome instance has useful
 * recommendations before it has enough of its own subscription data.
 */
export async function discoverPopularRssFeeds(): Promise<PopularRssFeed[]> {
  if (popularCache && popularCache.expiresAt > Date.now()) return popularCache.feeds;
  const feeds = (await searchFeedlyRssFeeds("#news"))
    .sort((a, b) => b.subscriberCount - a.subscriberCount)
    .slice(0, 12);
  popularCache = { feeds, expiresAt: Date.now() + POPULAR_CACHE_MS };
  return feeds;
}
