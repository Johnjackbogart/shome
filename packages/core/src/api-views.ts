// Shapes the web API serves to its clients (the Next.js UI and the Expo app).

export interface PublicUser {
  id: string;
  email: string;
  /** Better Auth username; null only if an account was created without one. */
  handle: string | null;
  displayName: string | null;
}

export interface SourceView {
  id: string;
  kind: string;
  title: string | null;
  config: Record<string, unknown>;
  lastFetchedAt: string | null;
  lastError: string | null;
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
  sourceTitle: string | null;
  url: string | null;
  title: string | null;
  text: string | null;
  html: string | null;
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
  createdAt: string;
}
