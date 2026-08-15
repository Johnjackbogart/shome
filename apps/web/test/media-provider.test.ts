import { afterEach, describe, expect, it, vi } from "vitest";
import { createMediaUpload } from "../src/server/media-provider";

const providerBeforeTest = process.env.SHOME_MEDIA_PROVIDER;
const accountBeforeTest = process.env.CLOUDFLARE_ACCOUNT_ID;
const tokenBeforeTest = process.env.CLOUDFLARE_MEDIA_API_TOKEN;
const originsBeforeTest = process.env.CLOUDFLARE_MEDIA_ALLOWED_ORIGINS;

afterEach(() => {
  if (providerBeforeTest === undefined) delete process.env.SHOME_MEDIA_PROVIDER;
  else process.env.SHOME_MEDIA_PROVIDER = providerBeforeTest;
  if (accountBeforeTest === undefined) delete process.env.CLOUDFLARE_ACCOUNT_ID;
  else process.env.CLOUDFLARE_ACCOUNT_ID = accountBeforeTest;
  if (tokenBeforeTest === undefined) delete process.env.CLOUDFLARE_MEDIA_API_TOKEN;
  else process.env.CLOUDFLARE_MEDIA_API_TOKEN = tokenBeforeTest;
  if (originsBeforeTest === undefined) delete process.env.CLOUDFLARE_MEDIA_ALLOWED_ORIGINS;
  else process.env.CLOUDFLARE_MEDIA_ALLOWED_ORIGINS = originsBeforeTest;
  vi.unstubAllGlobals();
});

describe("media provider", () => {
  it("uses the internal direct-upload endpoint in zero-setup local development", async () => {
    process.env.SHOME_MEDIA_PROVIDER = "local";
    const target = await createMediaUpload({
      id: "8c1fc5bc-7813-46bd-b351-569abcb9950f",
      userId: "user_alice",
      type: "video",
      contentType: "video/mp4",
      byteSize: 12_345,
      originalName: "clip.mp4",
    });
    expect(target).toMatchObject({
      provider: "local",
      providerAssetId: "8c1fc5bc-7813-46bd-b351-569abcb9950f",
      uploadUrl: "/api/media/uploads/8c1fc5bc-7813-46bd-b351-569abcb9950f/content",
    });
    expect(target.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it("enforces the image size limit before issuing a provider upload URL", async () => {
    process.env.SHOME_MEDIA_PROVIDER = "local";
    await expect(
      createMediaUpload({
        id: "8c1fc5bc-7813-46bd-b351-569abcb9950f",
        userId: "user_alice",
        type: "image",
        contentType: "image/jpeg",
        byteSize: 21 * 1024 * 1024,
        originalName: "large.jpg",
      }),
    ).rejects.toThrow("each photo must be 20 MB or smaller");
  });

  it("asks Stream for a direct URL with the three-minute provider-side limit", async () => {
    process.env.SHOME_MEDIA_PROVIDER = "cloudflare";
    process.env.CLOUDFLARE_ACCOUNT_ID = "account-123";
    process.env.CLOUDFLARE_MEDIA_API_TOKEN = "token-123";
    process.env.CLOUDFLARE_MEDIA_ALLOWED_ORIGINS = "shome.example,localhost:3000";
    const fetch = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            success: true,
            result: {
              uid: "stream-video-123",
              uploadURL: "https://upload.videodelivery.net/stream-video-123",
            },
          }),
          { status: 200 },
        ),
    );
    vi.stubGlobal("fetch", fetch);

    const target = await createMediaUpload({
      id: "8c1fc5bc-7813-46bd-b351-569abcb9950f",
      userId: "user_alice",
      type: "video",
      contentType: "video/mp4",
      byteSize: 12_345,
      originalName: "clip.mp4",
    });

    expect(target).toMatchObject({
      provider: "cloudflare_stream",
      providerAssetId: "stream-video-123",
      uploadUrl: "https://upload.videodelivery.net/stream-video-123",
    });
    expect(fetch).toHaveBeenCalledOnce();
    const [url, init] = fetch.mock.calls[0] ?? [];
    expect(url).toBe(
      "https://api.cloudflare.com/client/v4/accounts/account-123/stream/direct_upload",
    );
    expect(JSON.parse(String((init as RequestInit).body))).toMatchObject({
      allowedOrigins: ["shome.example", "localhost:3000"],
      creator: "user_alice",
      maxDurationSeconds: 180,
    });
  });
});
