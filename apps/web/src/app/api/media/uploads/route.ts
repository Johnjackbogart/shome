import { randomUUID } from "node:crypto";
import { mediaUploads } from "@shome/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { createMediaUpload } from "#/server/media-provider";
import {
  MAX_IMAGE_BYTES,
  MAX_PHOTOS_PER_POST,
  MAX_VIDEO_BYTES,
  sanitizeMediaName,
} from "#/server/media-storage";

const uploadSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["image", "video"]),
  contentType: z.string().min(1).max(100),
  byteSize: z.number().int().positive().max(MAX_VIDEO_BYTES),
});

const createSchema = z
  .object({ uploads: z.array(uploadSchema).min(1).max(50) })
  .superRefine(({ uploads }, ctx) => {
    const photos = uploads.filter((upload) => upload.type === "image");
    if (photos.length > MAX_PHOTOS_PER_POST) {
      ctx.addIssue({
        code: "custom",
        message: `a post can include up to ${MAX_PHOTOS_PER_POST} photos`,
        path: ["uploads"],
      });
    }
    for (const [index, upload] of uploads.entries()) {
      const maxBytes = upload.type === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
      if (upload.byteSize > maxBytes) {
        ctx.addIssue({
          code: "custom",
          message:
            upload.type === "image"
              ? "each photo must be 20 MB or smaller"
              : "each video must be 512 MB or smaller",
          path: ["uploads", index, "byteSize"],
        });
      }
    }
  });

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, createSchema);
  if (!body.ok) return body.res;

  try {
    const requests = body.data.uploads.map((upload) => ({
      ...upload,
      id: randomUUID(),
      originalName: sanitizeMediaName(upload.name),
      userId: session.user.id,
    }));
    const targets = await Promise.all(requests.map(createMediaUpload));
    const db = await getDb();
    await db.insert(mediaUploads).values(
      requests.map((request, index) => {
        const target = targets[index];
        if (!target) throw new Error("could not create upload target");
        return {
          id: request.id,
          userId: request.userId,
          type: request.type,
          contentType: request.contentType,
          byteSize: request.byteSize,
          originalName: request.originalName,
          provider: target.provider,
          providerAssetId: target.providerAssetId,
          expiresAt: target.expiresAt,
        };
      }),
    );
    return NextResponse.json({
      uploads: requests.map((request, index) => {
        const target = targets[index];
        if (!target) throw new Error("could not create upload target");
        return { id: request.id, type: request.type, uploadUrl: target.uploadUrl };
      }),
    });
  } catch (error) {
    return jsonError(
      502,
      error instanceof Error ? error.message : "could not create upload targets",
    );
  }
}
