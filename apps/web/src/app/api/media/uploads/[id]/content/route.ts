import { mediaUploads } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { jsonError, UUID_RE } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { persistPostMedia, preparePostMedia, removeStoredPostMedia } from "@/server/media-storage";

export const runtime = "nodejs";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
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
  if (upload?.provider !== "local") return jsonError(404, "upload not found");
  if (upload.status !== "uploading")
    return jsonError(409, "this upload is no longer accepting files");
  if (upload.expiresAt && upload.expiresAt.getTime() < Date.now()) {
    return jsonError(410, "this upload URL has expired");
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return jsonError(400, "invalid multipart form");
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return jsonError(400, "a file is required");

  try {
    const [prepared] = await preparePostMedia([file], [upload.id]);
    if (!prepared) throw new Error("could not read attachment");
    if (prepared.type !== upload.type)
      throw new Error("attachment type does not match this upload");
    await persistPostMedia([prepared]);
    await db
      .update(mediaUploads)
      .set({
        contentType: prepared.contentType,
        byteSize: prepared.byteSize,
        durationMs: prepared.durationMs,
        originalName: prepared.originalName,
        status: "ready",
        updatedAt: new Date(),
      })
      .where(eq(mediaUploads.id, upload.id));
    return new Response(null, { status: 204 });
  } catch (error) {
    await removeStoredPostMedia([upload.id]);
    return jsonError(400, error instanceof Error ? error.message : "could not save attachment");
  }
}
