import {
  type Connector,
  ConnectorConfigError,
  type ContentItem,
  type FetchResult,
  type MediaRef,
} from "@shome/core";

export type MastodonConfig = Record<string, unknown> & {
  /** Instance origin, e.g. https://mastodon.social */
  server: string;
  mode: "public" | "hashtag" | "home";
  hashtag?: string;
  /** Identifies whose home timeline this is, so the canonical key stays per-user. */
  account?: string;
};

interface MastodonStatus {
  id: string;
  url?: string | null;
  uri?: string;
  content?: string;
  created_at?: string;
  account?: { display_name?: string; acct?: string; avatar?: string };
  media_attachments?: {
    type?: string;
    url?: string | null;
    preview_url?: string | null;
    description?: string | null;
  }[];
  reblog?: MastodonStatus | null;
}

const USER_AGENT = "shome/0.1 (open source media engine)";

/** Rough plain-text projection of status HTML, for keyword matching and previews. */
export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function attachmentType(type: string | undefined): MediaRef["type"] {
  if (type === "video" || type === "gifv") return "video";
  if (type === "audio") return "audio";
  return "image";
}

function normalizeStatus(status: MastodonStatus): ContentItem {
  // Boosts wrap the original; show the original content attributed to its author.
  const inner = status.reblog ?? status;
  const html = inner.content ?? "";
  const media: MediaRef[] = (inner.media_attachments ?? [])
    .map((att) => ({
      type: attachmentType(att.type),
      url: att.url ?? att.preview_url ?? "",
      alt: att.description ?? undefined,
    }))
    .filter((m) => m.url.length > 0);
  return {
    externalId: status.id,
    url: inner.url ?? inner.uri ?? undefined,
    text: html ? stripHtml(html) : undefined,
    html: html || undefined,
    author: inner.account
      ? {
          name: inner.account.display_name || inner.account.acct,
          handle: inner.account.acct,
          avatarUrl: inner.account.avatar,
        }
      : undefined,
    media,
    publishedAt: inner.created_at ? new Date(inner.created_at) : undefined,
    raw: status,
  };
}

function serverOrigin(raw: unknown): string {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    throw new ConnectorConfigError("config.server is required (e.g. https://mastodon.social)");
  }
  let url: URL;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    throw new ConnectorConfigError("config.server is not a valid URL");
  }
  // https only: access tokens ride the Authorization header on every request.
  if (url.protocol !== "https:") {
    throw new ConnectorConfigError("config.server must be https");
  }
  return url.origin;
}

export const mastodonConnector: Connector<MastodonConfig> = {
  kind: "mastodon",
  displayName: "Mastodon / Fediverse",
  auth: "account",
  parseConfig(raw) {
    const server = serverOrigin(raw.server);
    if (raw.mode === "public") return { server, mode: "public" };
    if (raw.mode === "hashtag") {
      if (typeof raw.hashtag !== "string" || raw.hashtag.trim().length === 0) {
        throw new ConnectorConfigError("config.hashtag is required for hashtag mode");
      }
      return {
        server,
        mode: "hashtag",
        hashtag: raw.hashtag.trim().replace(/^#/, "").toLowerCase(),
      };
    }
    if (raw.mode === "home") {
      if (typeof raw.account !== "string" || raw.account.trim().length === 0) {
        throw new ConnectorConfigError(
          "config.account is required for home mode (e.g. you@mastodon.social)",
        );
      }
      return {
        server,
        mode: "home",
        account: raw.account.trim().replace(/^@/, "").toLowerCase(),
      };
    }
    throw new ConnectorConfigError("config.mode must be 'public', 'hashtag', or 'home'");
  },
  canonicalKey(config) {
    const host = new URL(config.server).host;
    if (config.mode === "hashtag") return `mastodon:${host}:tag:${config.hashtag}`;
    if (config.mode === "home") return `mastodon:${host}:home:${config.account}`;
    return `mastodon:${host}:public`;
  },
  async fetchLatest(config, ctx): Promise<FetchResult> {
    const path =
      config.mode === "hashtag"
        ? `/api/v1/timelines/tag/${encodeURIComponent(config.hashtag ?? "")}`
        : config.mode === "home"
          ? "/api/v1/timelines/home"
          : "/api/v1/timelines/public";

    const headers: Record<string, string> = {
      "user-agent": USER_AGENT,
      accept: "application/json",
    };
    const token = ctx.credentials?.accessToken;
    if (config.mode === "home") {
      if (typeof token !== "string" || token.length === 0) {
        throw new Error("Mastodon home timeline needs a linked connection with { accessToken }");
      }
    }
    if (typeof token === "string" && token.length > 0) headers.authorization = `Bearer ${token}`;

    const res = await fetch(`${config.server}${path}?limit=40`, {
      signal: ctx.signal ?? AbortSignal.timeout(20_000),
      headers,
    });
    if (!res.ok) throw new Error(`mastodon fetch failed: HTTP ${res.status}`);
    const statuses = (await res.json()) as MastodonStatus[];

    const host = new URL(config.server).host;
    const sourceTitle =
      config.mode === "hashtag"
        ? `#${config.hashtag} · ${host}`
        : config.mode === "home"
          ? `Home timeline (@${config.account})`
          : `Public timeline · ${host}`;
    return { items: statuses.map(normalizeStatus), sourceTitle };
  },
};
