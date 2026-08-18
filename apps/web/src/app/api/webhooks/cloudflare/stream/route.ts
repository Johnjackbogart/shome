import { createHmac, timingSafeEqual } from "node:crypto";
import { mediaUploads, postMedia } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "#/server/db";
import { cloudflareStreamPlaybackUrls } from "#/server/media-provider";

const eventSchema = z.object({
  uid: z.string().min(1),
  readyToStream: z.boolean().optional(),
  duration: z.number().nonnegative().optional(),
  status: z.object({ state: z.string().optional() }).optional(),
});

function signatureParts(value: string): { timestamp: string; signature: string } | null {
  const values = new Map(
    value.split(",").map((part) => {
      const [key, content] = part.split("=", 2);
      return [key?.trim(), content?.trim()];
    }),
  );
  const timestamp = values.get("time");
  const signature = values.get("sig1");
  return timestamp && signature ? { timestamp, signature } : null;
}

function hasValidSignature(body: string, header: string, secret: string): boolean {
  const parts = signatureParts(header);
  if (!parts || !/^\d+$/.test(parts.timestamp) || !/^[a-f\d]{64}$/i.test(parts.signature)) {
    return false;
  }
  const timestamp = Number(parts.timestamp);
  if (!Number.isSafeInteger(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 5 * 60) {
    return false;
  }
  const expected = createHmac("sha256", secret).update(`${parts.timestamp}.${body}`).digest();
  const received = Buffer.from(parts.signature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function POST(req: Request) {
  const secret = process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET;
  const signature = req.headers.get("webhook-signature");
  if (!secret) return new Response("webhook secret is not configured", { status: 503 });
  if (!signature) return new Response("missing webhook signature", { status: 403 });

  const body = await req.text();
  if (!hasValidSignature(body, signature, secret)) {
    return new Response("invalid webhook signature", { status: 403 });
  }
  let event: z.infer<typeof eventSchema>;
  try {
    event = eventSchema.parse(JSON.parse(body));
  } catch {
    return new Response("invalid webhook payload", { status: 400 });
  }

  const failed = event.status?.state === "error";
  const status: "failed" | "ready" | "processing" = failed
    ? "failed"
    : event.readyToStream
      ? "ready"
      : "processing";
  const playback = status === "ready" ? cloudflareStreamPlaybackUrls(event.uid) : null;
  const durationMs = typeof event.duration === "number" ? Math.ceil(event.duration * 1000) : null;
  const db = await getDb();
  const values = {
    status,
    playbackUrl: playback?.playbackUrl ?? null,
    thumbnailUrl: playback?.thumbnailUrl ?? null,
    ...(durationMs === null ? {} : { durationMs }),
  };
  await db
    .update(mediaUploads)
    .set({ ...values, updatedAt: new Date() })
    .where(
      and(
        eq(mediaUploads.provider, "cloudflare_stream"),
        eq(mediaUploads.providerAssetId, event.uid),
      ),
    );
  await db
    .update(postMedia)
    .set(values)
    .where(
      and(eq(postMedia.provider, "cloudflare_stream"), eq(postMedia.providerAssetId, event.uid)),
    );
  return new Response("ok");
}
