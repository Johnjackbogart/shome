import { mediaUploads, profiles, user } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { profileAvatarUrl } from "#/server/profile-avatar";
import { profileHtmlOrDefault } from "#/server/sanitize";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const [[row], [owner]] = await Promise.all([
    db
      .select({ html: profiles.html })
      .from(profiles)
      .where(eq(profiles.userId, session.user.id))
      .limit(1),
    db.select({ image: user.image }).from(user).where(eq(user.id, session.user.id)).limit(1),
  ]);
  return NextResponse.json({
    html: profileHtmlOrDefault(row?.html, session.user.username ?? session.user.name),
    image: owner?.image ?? null,
  });
}

const putSchema = z
  .object({
    // Raw user HTML — sanitized at serve time (see /p/[handle]/content).
    html: z.string().max(200_000, "profile HTML is limited to 200k characters").optional(),
    // A temporary media record is promoted to an avatar only after its upload is
    // ready. `null` deliberately removes an existing picture.
    avatarUploadId: z.string().regex(UUID_RE, "invalid profile picture").nullable().optional(),
  })
  .refine((input) => input.html !== undefined || input.avatarUploadId !== undefined, {
    message: "provide profile content or a profile picture",
  });

export async function PUT(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, putSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

  if (body.data.html !== undefined) {
    await db
      .insert(profiles)
      .values({
        userId: session.user.id,
        html: body.data.html,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: { html: body.data.html, updatedAt: new Date() },
      });
  }

  let image: string | null | undefined;
  if (body.data.avatarUploadId !== undefined) {
    if (body.data.avatarUploadId === null) {
      image = null;
    } else {
      const [upload] = await db
        .select({ id: mediaUploads.id })
        .from(mediaUploads)
        .where(
          and(
            eq(mediaUploads.id, body.data.avatarUploadId),
            eq(mediaUploads.userId, session.user.id),
            eq(mediaUploads.type, "image"),
            eq(mediaUploads.status, "ready"),
          ),
        )
        .limit(1);
      if (!upload) return jsonError(400, "profile picture is not ready");
      image = profileAvatarUrl(upload.id);
    }
  }

  if (image !== undefined) {
    await db.update(user).set({ image, updatedAt: new Date() }).where(eq(user.id, session.user.id));
  }

  return NextResponse.json({
    ok: true,
    image: image ?? null,
  });
}
