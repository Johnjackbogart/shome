export type SourceKind = "rss" | "bluesky" | "mastodon" | "youtube";

export interface AuthorRef {
  name?: string;
  handle?: string;
  avatarUrl?: string;
}

export interface MediaRef {
  type: "image" | "video" | "audio";
  url: string;
  alt?: string;
}

/**
 * The normalized unit of content every connector produces. Everything Shome
 * stores, filters, and renders flows through this shape. Connector response
 * payloads are intentionally not retained.
 */
export interface ContentItem {
  /** Connector-scoped stable id used to dedupe on repeated fetches. */
  externalId: string;
  url?: string;
  title?: string;
  /** Plain-text body (used for keyword matching and rendering). */
  text?: string;
  author?: AuthorRef;
  media?: MediaRef[];
  publishedAt?: Date;
}
