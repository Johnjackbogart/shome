// Shapes the web API serves to its clients (the Next.js UI and the Expo app).

export interface PublicUser {
  id: string;
  email: string;
  /** Better Auth username; null only if an account was created without one. */
  handle: string | null;
  displayName: string | null;
  image: string | null;
}

/** A shome member that can be found through people discovery. */
export interface SocialUserView {
  id: string;
  handle: string;
  displayName: string | null;
  image: string | null;
}

/** A discovered member, including whether the signed-in viewer follows them. */
export interface PeopleSearchResult extends SocialUserView {
  isFollowing: boolean;
}

/** The signed-in member's own follow relationships. */
export interface SocialGraphView {
  followerCount: number;
  followingCount: number;
  followers: SocialUserView[];
  following: SocialUserView[];
}

export interface SourceView {
  id: string;
  kind: string;
  /** The name the feed itself reported; never overwritten by a rename. */
  title: string | null;
  /** What this subscriber renamed the source to, if they have renamed it. */
  customTitle: string | null;
  config: Record<string, unknown>;
  lastFetchedAt: string | null;
  lastError: string | null;
}

/**
 * The one thing a subscriber is told when a source will not fetch. Connectors
 * report whatever the platform said — HTTP status codes, provider wording —
 * which is nothing anyone can act on, so both the server and the clients say
 * this instead, and rows stored before that was true still read this way.
 */
export const SOURCE_FETCH_ERROR = "cant fetch from source";

/** Prefix a sigil unless the stored config already carries it (YouTube handles do). */
function sigil(mark: string, value: string): string {
  return value.startsWith(mark) ? value : `${mark}${value}`;
}

/**
 * The name a source goes by in the UI: what this subscriber renamed it to,
 * else the name its feed reported, else the piece of config they typed in to
 * add it. Shared by both clients so the two cannot drift apart.
 */
export function sourceLabel(source: SourceView): string {
  return source.customTitle || originalSourceLabel(source);
}

/**
 * The name a source had before any rename — kept visible so it stays clear
 * which feed a renamed source actually is.
 */
export function originalSourceLabel(source: SourceView): string {
  const config = source.config;
  return (
    source.title ||
    (typeof config.url === "string" && config.url) ||
    (typeof config.actor === "string" && sigil("@", config.actor)) ||
    (typeof config.account === "string" && sigil("@", config.account)) ||
    (typeof config.hashtag === "string" && sigil("#", config.hashtag)) ||
    (typeof config.handle === "string" && sigil("@", config.handle)) ||
    (typeof config.channelId === "string" && config.channelId) ||
    source.kind
  );
}

/** A public feed found by the RSS discovery service for a website. */
export interface DiscoveredRssFeed {
  url: string;
  title: string | null;
  description: string | null;
  siteName: string | null;
  siteUrl: string | null;
  isPodcast: boolean;
}

/** A public RSS feed ranked by a third-party directory's subscriber count. */
export interface PopularRssFeed extends DiscoveredRssFeed {
  subscriberCount: number;
}

export interface PopularRssResponse {
  /** RSS sources ranked by aggregate Shome subscriptions. */
  shomeFeeds: PopularRssFeed[];
  /** RSS sources from Feedly's public directory, cached by the server. */
  webFeeds: PopularRssFeed[];
}

export interface MediaView {
  type: string;
  url: string;
  alt?: string;
  /** Optional provider player for formats a browser cannot play natively (for example HLS). */
  embedUrl?: string;
  thumbnailUrl?: string;
  status?: "uploading" | "processing" | "ready" | "failed";
}

export interface FeedItemView {
  id: string;
  sourceId: string;
  sourceKind: string;
  style: string;
  sourceTitle: string | null;
  url: string | null;
  title: string | null;
  text: string | null;
  authorName: string | null;
  authorHandle: string | null;
  authorAvatarUrl: string | null;
  media: MediaView[];
  publishedAt: string | null;
  fetchedAt: string;
  /** Links created when a first-party shome post was cross-posted. */
  crossPosts?: CrossPostLink[];
}

export interface CrossPostLink {
  provider: "bluesky" | "mastodon";
  url: string;
}

export interface ConnectionView {
  id: string;
  provider: string;
  label: string;
  /** The linked account, e.g. `alice.bsky.social` or `@alice@mastodon.social`. */
  account: string | null;
  createdAt: string;
}
