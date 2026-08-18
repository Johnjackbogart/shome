import { mediaUploads, postMedia } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { readProviderAsset } from "#/server/media-provider";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "upload not found");

  const db = await getDb();
  const [upload] = await db
    .select()
    .from(mediaUploads)
    .where(and(eq(mediaUploads.id, id), eq(mediaUploads.userId, session.user.id)))
    .limit(1);
  if (!upload) return jsonError(404, "upload not found");

  // Local uploads are written by the companion `/content` endpoint, which
  // validates the actual file bytes before marking the upload ready. Do not
  // let a caller skip that validation by completing a local upload directly.
  if (upload.provider === "local" && upload.status === "uploading") {
    return jsonError(409, "wait for the local upload to finish first");
  }

  try {
    const asset = await readProviderAsset(upload);
    const values = {
      status: asset.status,
      playbackUrl: asset.playbackUrl,
      thumbnailUrl: asset.thumbnailUrl,
      durationMs: asset.durationMs ?? upload.durationMs,
      updatedAt: new Date(),
    } as const;
    await db.update(mediaUploads).set(values).where(eq(mediaUploads.id, upload.id));
    await db
      .update(postMedia)
      .set({
        status: values.status,
        playbackUrl: values.playbackUrl,
        thumbnailUrl: values.thumbnailUrl,
        durationMs: values.durationMs,
      })
      .where(
        and(
          eq(postMedia.provider, upload.provider),
          eq(postMedia.providerAssetId, upload.providerAssetId),
        ),
      );
    return NextResponse.json({
      id: upload.id,
      status: asset.status,
      durationMs: values.durationMs,
    });
  } catch (error) {
    return jsonError(502, error instanceof Error ? error.message : "could not check upload status");
  }
}
