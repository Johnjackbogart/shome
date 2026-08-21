import { DEFAULT_POST_STYLE, POST_FONT_VALUES } from "@shome/core";
import { mediaUploads, user } from "@shome/db";
import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import {
  type PreparedPostMedia,
  persistPostMedia,
  preparePostMedia,
  removeStoredPostMedia,
} from "#/server/media-storage";
import { createPost, type NewPostMedia, postToFeedItem } from "#/server/posting";

const hexColor = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, "must be a six-digit hex color");

const postFieldsSchema = z.object({
  text: z.string().trim().max(5_000),
  borderStyle: hexColor.default(DEFAULT_POST_STYLE.borderStyle),
  backgroundColor: hexColor.default(DEFAULT_POST_STYLE.backgroundColor),
  font: z.enum(POST_FONT_VALUES).default(DEFAULT_POST_STYLE.font),
  fontColor: hexColor.default(DEFAULT_POST_STYLE.fontColor),
  blueskyConnectionId: z.string().regex(UUID_RE, "invalid Bluesky connection").optional(),
  mastodonConnectionId: z.string().regex(UUID_RE, "invalid Mastodon connection").optional(),
});

const createSchema = postFieldsSchema
  .extend({
    attachmentIds: z.array(z.string().regex(UUID_RE, "invalid attachment")).max(50).default([]),
  })
  .refine((input) => input.text.length > 0 || input.attachmentIds.length > 0, {
    message: "write something or add media before posting",
    path: ["text"],
  });

function validationMessage(error: z.ZodError): string {
  return error.issues
    .map((issue) =>
      issue.path.length ? `${issue.path.join(".")}: ${issue.message}` : issue.message,
    )
    .join("; ");
}

function formField(form: FormData, name: string): string | undefined {
  const value = form.get(name);
  return typeof value === "string" ? value : undefined;
}

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  let fields: z.infer<typeof postFieldsSchema>;
  let attachmentIds: string[] = [];
  let preparedMedia: PreparedPostMedia[] = [];
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.startsWith("multipart/form-data")) {
    const contentLength = Number(req.headers.get("content-length"));
    // This rejects obviously too-large requests before Request.formData()
    // buffers them. Per-file limits are checked below once their true type is
    // known, rather than trusting the browser-supplied MIME type.
    if (Number.isFinite(contentLength) && contentLength > 800 * 1024 * 1024) {
      return jsonError(413, "this post’s attachments are too large");
    }
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return jsonError(400, "invalid multipart form");
    }
    const parsed = postFieldsSchema.safeParse({
      text: formField(form, "text"),
      borderStyle: formField(form, "borderStyle"),
      backgroundColor: formField(form, "backgroundColor"),
      font: formField(form, "font"),
      fontColor: formField(form, "fontColor"),
      blueskyConnectionId: formField(form, "blueskyConnectionId"),
      mastodonConnectionId: formField(form, "mastodonConnectionId"),
    });
    if (!parsed.success) return jsonError(400, validationMessage(parsed.error));
    fields = parsed.data;

    const entries = form.getAll("media");
    if (entries.some((entry) => typeof entry === "string")) {
      return jsonError(400, "media attachments must be files");
    }
    try {
      preparedMedia = await preparePostMedia(entries as File[]);
    } catch (error) {
      return jsonError(400, error instanceof Error ? error.message : "could not read attachments");
    }
    if (!fields.text && preparedMedia.length === 0) {
      return jsonError(400, "write something or add media before posting");
    }
  } else {
    const body = await parseBody(req, createSchema);
    if (!body.ok) return body.res;
    fields = body.data;
    attachmentIds = body.data.attachmentIds;
  }

  const db = await getDb();
  try {
    let uploadedMedia: NewPostMedia[] = [];
    if (attachmentIds.length > 0) {
      const uploads = await db
        .select()
        .from(mediaUploads)
        .where(
          and(eq(mediaUploads.userId, session.user.id), inArray(mediaUploads.id, attachmentIds)),
        );
      if (uploads.length !== attachmentIds.length)
        return jsonError(400, "one or more uploads are unavailable");
      if (uploads.some((upload) => upload.status === "uploading")) {
        return jsonError(409, "wait for your uploads to finish first");
      }
      if (uploads.some((upload) => upload.status === "failed")) {
        return jsonError(400, "remove failed media before posting");
      }
      if (uploads.filter((upload) => upload.type === "image").length > 10) {
        return jsonError(400, "a post can include up to 10 photos");
      }
      uploadedMedia = uploads.map((upload) => ({
        id: crypto.randomUUID(),
        type: upload.type,
        contentType: upload.contentType,
        byteSize: upload.byteSize,
        durationMs: upload.durationMs,
        originalName: upload.originalName,
        provider: upload.provider,
        providerAssetId: upload.providerAssetId,
        status: upload.status,
        playbackUrl: upload.playbackUrl,
        thumbnailUrl: upload.thumbnailUrl,
      }));
    }
    await persistPostMedia(preparedMedia);
    const { post, media, deliveries } = await createPost(db, {
      userId: session.user.id,
      ...fields,
      media: [
        ...uploadedMedia,
        ...preparedMedia.map(({ bytes: _bytes, ...media }) => ({
          ...media,
          provider: "local" as const,
          providerAssetId: media.id,
          status: "ready" as const,
          playbackUrl: null,
          thumbnailUrl: null,
        })),
      ],
    });
    const [author] = await db
      .select({ name: user.name, username: user.username, image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    return NextResponse.json({
      post: postToFeedItem(post, author ?? { name: null, username: null, image: null }, media),
      deliveries,
    });
  } catch (error) {
    await removeStoredPostMedia(preparedMedia.map((media) => media.id));
    return jsonError(500, error instanceof Error ? error.message : "could not save post");
  }
}
