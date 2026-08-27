import {
  APP_SPACING_VALUES,
  type AppStyle,
  DEFAULT_APP_STYLE,
  POST_BORDER_LINE_STYLE_VALUES,
  POST_BORDER_RADIUS_VALUES,
  POST_FONT_VALUES,
} from "@shome/core";
import { z } from "zod";
import { hexColorSchema } from "./post-style";

export const appStyleSchema = z.object({
  appBackgroundColor: hexColorSchema,
  appSecondaryBackgroundColor: hexColorSchema,
  appAccentBackgroundColor: hexColorSchema,
  appAccentColor: hexColorSchema,
  appSecondaryAccentColor: hexColorSchema,
  appBorderStyle: hexColorSchema,
  appBorderRadius: z.enum(POST_BORDER_RADIUS_VALUES),
  appBorderLineStyle: z.enum(POST_BORDER_LINE_STYLE_VALUES),
  appFont: z.enum(POST_FONT_VALUES),
  appFontColor: hexColorSchema,
  appAccentFontColor: hexColorSchema,
  appSecondaryTextColor: hexColorSchema,
  appSpacing: z.enum(APP_SPACING_VALUES),
  appOverridePostStyles: z.boolean(),
});

/** Keep malformed database values out of client-side style props. */
export function appStyleFromColumns(value: unknown): AppStyle {
  const parsed = appStyleSchema.safeParse(value);
  return parsed.success ? parsed.data : { ...DEFAULT_APP_STYLE };
}
