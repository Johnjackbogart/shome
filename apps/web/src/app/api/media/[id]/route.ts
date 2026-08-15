import { postMedia } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { UUID_RE } from "@/server/api";
import { getDb } from "@/server/db";
import { readStoredPostMedia, storedPostMediaSize } from "@/server/media-storage";

export const runtime = "nodejs";

function parseRange(header: string | null, size: number): { start: number; end: number } | null {
  if (!header) return { start: 0, end: size - 1 };
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) return null;
  if (!rawStart) {
    const suffixLength = Number(rawEnd);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    return { start: Math.max(size - suffixLength, 0), end: size - 1 };
  }
  const start = Number(rawStart);
  const end = rawEnd ? Number(rawEnd) : size - 1;
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return null;
  }
  return { start, end: Math.min(end, size - 1) };
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return new Response("not found", { status: 404 });

  const db = await getDb();
  const [attachment] = await db
    .select({
      contentType: postMedia.contentType,
      playbackUrl: postMedia.playbackUrl,
      provider: postMedia.provider,
      status: postMedia.status,
    })
    .from(postMedia)
    .where(eq(postMedia.id, id))
    .limit(1);
  if (!attachment) return new Response("not found", { status: 404 });
  if (attachment.provider !== "local") {
    if (attachment.status !== "ready" || !attachment.playbackUrl) {
      return new Response("media is still processing", { status: 425 });
    }
    let playbackUrl: URL;
    try {
      playbackUrl = new URL(attachment.playbackUrl);
    } catch {
      return new Response("media is unavailable", { status: 404 });
    }
    if (playbackUrl.protocol !== "https:")
      return new Response("media is unavailable", { status: 404 });
    return NextResponse.redirect(playbackUrl);
  }

  let size: number;
  try {
    size = await storedPostMediaSize(id);
  } catch {
    return new Response("media is unavailable", { status: 404 });
  }
  if (size === 0) return new Response("media is unavailable", { status: 404 });

  const requestedRange = req.headers.get("range");
  const range = parseRange(requestedRange, size);
  if (!range) {
    return new Response("range not satisfiable", {
      status: 416,
      headers: { "content-range": `bytes */${size}` },
    });
  }
  try {
    const body = await readStoredPostMedia(id, range.start, range.end);
    const partial = requestedRange !== null;
    return new Response(new Uint8Array(body), {
      status: partial ? 206 : 200,
      headers: {
        "accept-ranges": "bytes",
        "cache-control": "public, max-age=31536000, immutable",
        "content-length": String(body.byteLength),
        "content-type": attachment.contentType,
        ...(partial
          ? { "content-range": `bytes ${range.start}-${range.start + body.byteLength - 1}/${size}` }
          : {}),
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return new Response("media is unavailable", { status: 404 });
  }
}
