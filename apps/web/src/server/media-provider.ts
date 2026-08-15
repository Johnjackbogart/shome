import type { MediaProvider, MediaStatus } from "@shome/db";
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, MAX_VIDEO_DURATION_MS } from "./media-storage";

const CLOUDFLARE_API_ORIGIN = "https://api.cloudflare.com/client/v4";

export type UploadRequest = {
  id: string;
  userId: string;
  type: "image" | "video";
  contentType: string;
  byteSize: number;
  originalName: string;
};

export type UploadTarget = {
  provider: MediaProvider;
  providerAssetId: string;
  uploadUrl: string;
  expiresAt: Date;
};

export type ProviderAsset = {
  status: MediaStatus;
  playbackUrl: string | null;
  thumbnailUrl: string | null;
  durationMs: number | null;
};

type CloudflareResult<T> = {
  success: boolean;
  result?: T;
  errors?: { message?: string }[];
};

type CloudflareConfig = {
  accountId: string;
  apiToken: string;
  allowedOrigins: string[];
};

function configuredProvider(): "local" | "cloudflare" {
  const value = (process.env.SHOME_MEDIA_PROVIDER ?? "local").toLowerCase();
  if (value === "local" || value === "cloudflare") return value;
  throw new Error("SHOME_MEDIA_PROVIDER must be 'local' or 'cloudflare'");
}

function cloudflareConfig(): CloudflareConfig {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const apiToken = process.env.CLOUDFLARE_MEDIA_API_TOKEN?.trim();
  if (!accountId || !apiToken) {
    throw new Error("Cloudflare media needs CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_MEDIA_API_TOKEN");
  }
  const allowedOrigins = (process.env.CLOUDFLARE_MEDIA_ALLOWED_ORIGINS ?? "localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (allowedOrigins.length === 0) {
    throw new Error("CLOUDFLARE_MEDIA_ALLOWED_ORIGINS must include at least one origin");
  }
  return { accountId, apiToken, allowedOrigins };
}

function uploadExpiry(): Date {
  return new Date(Date.now() + 30 * 60 * 1000);
}

function validateUploadRequest(input: UploadRequest): void {
  const maxBytes = input.type === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (input.byteSize > maxBytes) {
    throw new Error(
      input.type === "image"
        ? "each photo must be 20 MB or smaller"
        : "each video must be 512 MB or smaller",
    );
  }
  if (input.byteSize < 1) throw new Error("attachments cannot be empty");
  if (
    (input.type === "image" && !input.contentType.startsWith("image/")) ||
    (input.type === "video" && !input.contentType.startsWith("video/"))
  ) {
    throw new Error("attachment type does not match its content type");
  }
}

async function cloudflareRequest<T>(path: string, init: RequestInit): Promise<T> {
  const config = cloudflareConfig();
  const response = await fetch(`${CLOUDFLARE_API_ORIGIN}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${config.apiToken}`,
      ...(init.headers ?? {}),
    },
  });
  const payload = (await response.json().catch(() => null)) as CloudflareResult<T> | null;
  if (!response.ok || !payload?.success || !payload.result) {
    const message = payload?.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join("; ");
    throw new Error(message || `Cloudflare media request failed (HTTP ${response.status})`);
  }
  return payload.result;
}

async function createCloudflareImageUpload(input: UploadRequest): Promise<UploadTarget> {
  const config = cloudflareConfig();
  const expiresAt = uploadExpiry();
  const form = new FormData();
  form.set("creator", input.userId);
  form.set("expiry", expiresAt.toISOString());
  form.set("metadata", JSON.stringify({ shomeUploadId: input.id, name: input.originalName }));
  form.set("requireSignedURLs", "false");
  const result = await cloudflareRequest<{ id?: string; uploadURL?: string }>(
    `/accounts/${config.accountId}/images/v2/direct_upload`,
    { method: "POST", body: form },
  );
  if (!result.id || !result.uploadURL)
    throw new Error("Cloudflare did not return an image upload URL");
  return {
    provider: "cloudflare_images",
    providerAssetId: result.id,
    uploadUrl: result.uploadURL,
    expiresAt,
  };
}

async function createCloudflareVideoUpload(input: UploadRequest): Promise<UploadTarget> {
  const config = cloudflareConfig();
  const expiresAt = uploadExpiry();
  const result = await cloudflareRequest<{ uid?: string; uploadURL?: string }>(
    `/accounts/${config.accountId}/stream/direct_upload`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        allowedOrigins: config.allowedOrigins,
        creator: input.userId,
        expiry: expiresAt.toISOString(),
        maxDurationSeconds: MAX_VIDEO_DURATION_MS / 1000,
        meta: { shomeUploadId: input.id, name: input.originalName },
        requireSignedURLs: false,
      }),
    },
  );
  if (!result.uid || !result.uploadURL)
    throw new Error("Cloudflare did not return a video upload URL");
  return {
    provider: "cloudflare_stream",
    providerAssetId: result.uid,
    uploadUrl: result.uploadURL,
    expiresAt,
  };
}

/** Creates a short-lived destination; file bytes never pass through this server in Cloudflare mode. */
export async function createMediaUpload(input: UploadRequest): Promise<UploadTarget> {
  validateUploadRequest(input);
  if (configuredProvider() === "local") {
    return {
      provider: "local",
      providerAssetId: input.id,
      uploadUrl: `/api/media/uploads/${input.id}/content`,
      expiresAt: uploadExpiry(),
    };
  }
  return input.type === "image"
    ? createCloudflareImageUpload(input)
    : createCloudflareVideoUpload(input);
}

export function cloudflareStreamPlaybackUrls(uid: string): {
  playbackUrl: string;
  thumbnailUrl: string;
} {
  return {
    playbackUrl: `https://videodelivery.net/${encodeURIComponent(uid)}/manifest/video.m3u8`,
    thumbnailUrl: `https://videodelivery.net/${encodeURIComponent(uid)}/thumbnails/thumbnail.jpg`,
  };
}

export function cloudflareStreamEmbedUrl(uid: string): string {
  return `https://iframe.videodelivery.net/${encodeURIComponent(uid)}`;
}

export async function readProviderAsset(input: {
  provider: MediaProvider;
  providerAssetId: string;
}): Promise<ProviderAsset> {
  if (input.provider === "local") {
    return { status: "ready", playbackUrl: null, thumbnailUrl: null, durationMs: null };
  }
  const config = cloudflareConfig();
  if (input.provider === "cloudflare_images") {
    const result = await cloudflareRequest<{
      draft?: boolean;
      variants?: string[];
    }>(`/accounts/${config.accountId}/images/v1/${encodeURIComponent(input.providerAssetId)}`, {
      method: "GET",
    });
    if (result.draft) {
      return { status: "uploading", playbackUrl: null, thumbnailUrl: null, durationMs: null };
    }
    const variants = result.variants ?? [];
    return {
      status: "ready",
      playbackUrl: variants.find((url) => /\/public(?:$|\?)/.test(url)) ?? variants[0] ?? null,
      thumbnailUrl: variants.find((url) => /\/thumbnail(?:$|\?)/.test(url)) ?? null,
      durationMs: null,
    };
  }

  const result = await cloudflareRequest<{
    duration?: number;
    readyToStream?: boolean;
    status?: { state?: string };
  }>(`/accounts/${config.accountId}/stream/${encodeURIComponent(input.providerAssetId)}`, {
    method: "GET",
  });
  if (result.status?.state === "error") {
    return { status: "failed", playbackUrl: null, thumbnailUrl: null, durationMs: null };
  }
  if (!result.readyToStream) {
    return { status: "processing", playbackUrl: null, thumbnailUrl: null, durationMs: null };
  }
  const urls = cloudflareStreamPlaybackUrls(input.providerAssetId);
  return {
    status: "ready",
    ...urls,
    durationMs: typeof result.duration === "number" ? Math.ceil(result.duration * 1000) : null,
  };
}
