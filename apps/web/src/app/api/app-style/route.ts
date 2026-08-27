import { user } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { appStyleFromColumns, appStyleSchema } from "#/server/app-style";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  const [owner] = await db
    .select({
      appBackgroundColor: user.appBackgroundColor,
      appSecondaryBackgroundColor: user.appSecondaryBackgroundColor,
      appBorderStyle: user.appBorderStyle,
      appBorderRadius: user.appBorderRadius,
      appBorderLineStyle: user.appBorderLineStyle,
      appFont: user.appFont,
      appFontColor: user.appFontColor,
      appSecondaryTextColor: user.appSecondaryTextColor,
      appSpacing: user.appSpacing,
      appOverridePostStyles: user.appOverridePostStyles,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return NextResponse.json({ appStyle: appStyleFromColumns(owner) });
}

const putSchema = z.object({ appStyle: appStyleSchema });

export async function PUT(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, putSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

  await db
    .update(user)
    .set({
      appBackgroundColor: body.data.appStyle.appBackgroundColor,
      appSecondaryBackgroundColor: body.data.appStyle.appSecondaryBackgroundColor,
      appBorderStyle: body.data.appStyle.appBorderStyle,
      appBorderRadius: body.data.appStyle.appBorderRadius,
      appBorderLineStyle: body.data.appStyle.appBorderLineStyle,
      appFont: body.data.appStyle.appFont,
      appFontColor: body.data.appStyle.appFontColor,
      appSecondaryTextColor: body.data.appStyle.appSecondaryTextColor,
      appSpacing: body.data.appStyle.appSpacing,
      appOverridePostStyles: body.data.appStyle.appOverridePostStyles,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ ok: true, appStyle: body.data.appStyle });
}
