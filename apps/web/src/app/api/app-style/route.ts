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
      backgroundColor: user.appBackgroundColor,
      secondaryBackgroundColor: user.appSecondaryBackgroundColor,
      borderColor: user.appBorderColor,
      borderRadius: user.appBorderRadius,
      borderLineStyle: user.appBorderLineStyle,
      font: user.appFont,
      fontColor: user.appFontColor,
      secondaryTextColor: user.appSecondaryTextColor,
      spacing: user.appSpacing,
      overridePostStyles: user.appOverridePostStyles,
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
      appBackgroundColor: body.data.appStyle.backgroundColor,
      appSecondaryBackgroundColor: body.data.appStyle.secondaryBackgroundColor,
      appBorderColor: body.data.appStyle.borderColor,
      appBorderRadius: body.data.appStyle.borderRadius,
      appBorderLineStyle: body.data.appStyle.borderLineStyle,
      appFont: body.data.appStyle.font,
      appFontColor: body.data.appStyle.fontColor,
      appSecondaryTextColor: body.data.appStyle.secondaryTextColor,
      appSpacing: body.data.appStyle.spacing,
      appOverridePostStyles: body.data.appStyle.overridePostStyles,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ ok: true, appStyle: body.data.appStyle });
}
