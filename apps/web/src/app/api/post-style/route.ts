import { user, userPostStyleColumns } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { postStyleOrDefault, postStyleSchema } from "#/server/post-style";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const [owner] = await db
    .select(userPostStyleColumns)
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return NextResponse.json({
    defaultPostStyle: postStyleOrDefault(owner),
  });
}

const putSchema = z.object({
  defaultPostStyle: postStyleSchema,
});

export async function PUT(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, putSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

  await db
    .update(user)
    .set({ ...body.data.defaultPostStyle, updatedAt: new Date() })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({
    ok: true,
    defaultPostStyle: body.data.defaultPostStyle,
  });
}
