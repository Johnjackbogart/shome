import { mediaUploads } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { UUID_RE } from "#/server/api";
import { getDb } from "#/server/db";
import { readStoredPostMedia, storedPostMediaSize } from "#/server/media-storage";

export const runtime = "nodejs";

/**
 * Serves a ready image from the generic upload staging area. Profile photos
 * intentionally keep their own upload record instead of becoming post media,
 * because an avatar is not attached to a post. The account's `image` field
 * only points here after ownership, type, and readiness are checked by the
 * profile update route.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return new Response("not found", { status: 404 });

  const db = await getDb();
  const [upload] = await db
    .select({
      type: mediaUploads.type,
      contentType: mediaUploads.contentType,
      provider: mediaUploads.provider,
      providerAssetId: mediaUploads.providerAssetId,
      status: mediaUploads.status,
      playbackUrl: mediaUploads.playbackUrl,
    })
    .from(mediaUploads)
    .where(eq(mediaUploads.id, id))
    .limit(1);
  if (upload?.type !== "image" || upload.status !== "ready") {
    return new Response("not found", { status: 404 });
  }

  if (upload.provider !== "local") {
    if (!upload.playbackUrl) return new Response("not found", { status: 404 });
    let imageUrl: URL;
    try {
      imageUrl = new URL(upload.playbackUrl);
    } catch {
      return new Response("not found", { status: 404 });
    }
    if (imageUrl.protocol !== "https:") return new Response("not found", { status: 404 });
    return NextResponse.redirect(imageUrl);
  }

  const storageId = upload.providerAssetId;
  if (!UUID_RE.test(storageId)) return new Response("not found", { status: 404 });
  try {
    const size = await storedPostMediaSize(storageId);
    if (size === 0) return new Response("not found", { status: 404 });
    const bytes = await readStoredPostMedia(storageId, 0, size - 1);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
        "content-length": String(bytes.byteLength),
        "content-type": upload.contentType,
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return new Response("not found", { status: 404 });
  }
}
