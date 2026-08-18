import { profiles } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { profileHtmlOrDefault } from "#/server/sanitize";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const [row] = await db
    .select({ html: profiles.html })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);
  return NextResponse.json({
    html: profileHtmlOrDefault(row?.html, session.user.username ?? session.user.name),
  });
}

const putSchema = z.object({
  // Raw user HTML — sanitized at serve time (see /p/[handle]/content).
  html: z.string().max(200_000, "profile HTML is limited to 200k characters"),
});

export async function PUT(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, putSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

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
  return NextResponse.json({ ok: true });
}
