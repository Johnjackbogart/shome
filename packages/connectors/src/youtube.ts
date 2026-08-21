import {
  type Connector,
  ConnectorConfigError,
  type ContentItem,
  type FetchResult,
} from "@shome/core";

export type YoutubeConfig = Record<string, unknown> & {
  channelId?: string;
  handle?: string;
};

interface YoutubeChannelResponse {
  items?: { id: string; snippet?: { title?: string } }[];
}

interface YoutubePlaylistItemsResponse {
  items?: {
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelTitle?: string;
      resourceId?: { videoId?: string };
      thumbnails?: Record<string, { url?: string }>;
    };
    contentDetails?: { videoId?: string; videoPublishedAt?: string };
  }[];
}

const API = "https://www.googleapis.com/youtube/v3";

function thumbnailUrl(
  thumbnails: Record<string, { url?: string }> | undefined,
): string | undefined {
  for (const key of ["maxres", "standard", "high", "medium", "default"]) {
    const url = thumbnails?.[key]?.url;
    if (url) return url;
  }
  return undefined;
}

async function apiGet<T>(
  path: string,
  params: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> {
  const search = new URLSearchParams(params);
  const res = await fetch(`${API}/${path}?${search}`, {
    signal: signal ?? AbortSignal.timeout(20_000),
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `youtube api failed: HTTP ${res.status}${body ? ` — ${body.slice(0, 200)}` : ""}`,
    );
  }
  return (await res.json()) as T;
}

export const youtubeConnector: Connector<YoutubeConfig> = {
  kind: "youtube",
  displayName: "YouTube (Data API)",
  auth: "api-key",
  parseConfig(raw) {
    const channelId = typeof raw.channelId === "string" ? raw.channelId.trim() : "";
    const handle = typeof raw.handle === "string" ? raw.handle.trim().replace(/^@/, "") : "";
    if (channelId && handle) {
      throw new ConnectorConfigError("give either config.channelId or config.handle, not both");
    }
    if (channelId) {
      if (!/^UC[\w-]{22}$/.test(channelId)) {
        throw new ConnectorConfigError(
          "config.channelId should look like UCxxxxxxxxxxxxxxxxxxxxxx",
        );
      }
      return { channelId };
    }
    if (handle) return { handle };
    throw new ConnectorConfigError("config.channelId or config.handle is required");
  },
  canonicalKey(config) {
    return config.channelId
      ? `youtube:channel:${config.channelId}`
      : `youtube:handle:${(config.handle ?? "").toLowerCase()}`;
  },
  async fetchLatest(config, ctx): Promise<FetchResult> {
    const apiKey = ctx.credentials?.apiKey;
    if (typeof apiKey !== "string" || apiKey.length === 0) {
      throw new Error(
        "YouTube needs an API key: link a youtube connection with { apiKey } or set YOUTUBE_API_KEY on the server",
      );
    }

    const lookup: Record<string, string> = { part: "id,snippet", key: apiKey };
    if (config.channelId) lookup.id = config.channelId;
    else lookup.forHandle = `@${config.handle}`;
    const channelRes = await apiGet<YoutubeChannelResponse>("channels", lookup, ctx.signal);
    const channel = channelRes.items?.[0];
    if (!channel) throw new Error("youtube channel not found");

    // Uploads playlist id is the channel id with its UC prefix swapped for UU.
    const uploadsPlaylist = `UU${channel.id.slice(2)}`;
    const videosRes = await apiGet<YoutubePlaylistItemsResponse>(
      "playlistItems",
      {
        part: "snippet,contentDetails",
        playlistId: uploadsPlaylist,
        maxResults: "25",
        key: apiKey,
      },
      ctx.signal,
    );

    const items: ContentItem[] = [];
    for (const entry of videosRes.items ?? []) {
      const videoId = entry.contentDetails?.videoId ?? entry.snippet?.resourceId?.videoId;
      if (!videoId) continue;
      const published = entry.contentDetails?.videoPublishedAt ?? entry.snippet?.publishedAt;
      const thumb = thumbnailUrl(entry.snippet?.thumbnails);
      items.push({
        externalId: videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title: entry.snippet?.title,
        text: entry.snippet?.description || undefined,
        author: entry.snippet?.channelTitle ? { name: entry.snippet.channelTitle } : undefined,
        media: thumb ? [{ type: "image", url: thumb }] : [],
        publishedAt: published ? new Date(published) : undefined,
      });
    }
    return { items, sourceTitle: channel.snippet?.title };
  },
};
