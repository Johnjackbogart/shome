import { user } from "@shome/db";
import { eq } from "drizzle-orm";
import { appStyleFromColumns } from "./app-style";
import { getDb } from "./db";

const appStyleColumns = {
  appBackgroundColor: user.appBackgroundColor,
  appSecondaryBackgroundColor: user.appSecondaryBackgroundColor,
  appAccentBackgroundColor: user.appAccentBackgroundColor,
  appAccentColor: user.appAccentColor,
  appSecondaryAccentColor: user.appSecondaryAccentColor,
  appBorderStyle: user.appBorderStyle,
  appBorderRadius: user.appBorderRadius,
  appBorderLineStyle: user.appBorderLineStyle,
  appFont: user.appFont,
  appFontColor: user.appFontColor,
  appAccentFontColor: user.appAccentFontColor,
  appSecondaryTextColor: user.appSecondaryTextColor,
  appSpacing: user.appSpacing,
  appOverridePostStyles: user.appOverridePostStyles,
};

export async function getAppStyleForUser(userId: string) {
  const db = await getDb();
  const [owner] = await db.select(appStyleColumns).from(user).where(eq(user.id, userId)).limit(1);

  return appStyleFromColumns(owner);
}
