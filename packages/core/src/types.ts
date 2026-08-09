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
 * The normalized unit of content every connector produces. Everything shome
 * stores, filters, and renders flows through this shape; `raw` keeps the
 * original payload so items can be re-normalized as the model evolves.
 */
export interface ContentItem {
  /** Connector-scoped stable id used to dedupe on repeated fetches. */
  externalId: string;
  url?: string;
  title?: string;
  /** Plain-text body (used for keyword matching and fallback rendering). */
  text?: string;
  /** HTML body; sanitized by the platform before storage, never trusted as-is. */
  html?: string;
  author?: AuthorRef;
  media?: MediaRef[];
  publishedAt?: Date;
  raw?: unknown;
}
