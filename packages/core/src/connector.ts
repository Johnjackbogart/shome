import type { ContentItem, SourceKind } from "./types";

export type ConnectorAuth = "none" | "api-key" | "account";

export interface FetchContext {
  /** Credentials from the subscribing user's linked connection, if any. */
  credentials?: Record<string, unknown>;
  /** Watermark from the previous successful fetch; connectors may ignore it (items dedupe on upsert). */
  since?: Date;
  signal?: AbortSignal;
}

export interface FetchResult {
  items: ContentItem[];
  /** Human-readable name of the source (feed title, channel name…) for labeling in UIs. */
  sourceTitle?: string;
}

/** Thrown by `parseConfig` when user-supplied config is invalid; safe to show to the user. */
export class ConnectorConfigError extends Error {}

export interface Connector<C extends Record<string, unknown> = Record<string, unknown>> {
  kind: SourceKind;
  displayName: string;
  auth: ConnectorAuth;
  /** Validate and normalize raw user-supplied config. Throws ConnectorConfigError. */
  parseConfig(raw: Record<string, unknown>): C;
  /**
   * Stable identity for a source, so the same source is stored once no matter
   * how many users subscribe. Must include the owning account for per-user
   * sources (e.g. a home timeline) so two users never share one.
   */
  canonicalKey(config: C): string;
  fetchLatest(config: C, ctx: FetchContext): Promise<FetchResult>;
}
