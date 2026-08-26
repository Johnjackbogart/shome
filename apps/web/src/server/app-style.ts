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
  backgroundColor: hexColorSchema,
  secondaryBackgroundColor: hexColorSchema,
  borderColor: hexColorSchema,
  borderRadius: z.enum(POST_BORDER_RADIUS_VALUES),
  borderLineStyle: z.enum(POST_BORDER_LINE_STYLE_VALUES),
  font: z.enum(POST_FONT_VALUES),
  fontColor: hexColorSchema,
  secondaryTextColor: hexColorSchema,
  spacing: z.enum(APP_SPACING_VALUES),
  overridePostStyles: z.boolean(),
});

/** Keep malformed database values out of client-side style props. */
export function appStyleFromColumns(value: unknown): AppStyle {
  const parsed = appStyleSchema.safeParse(value);
  return parsed.success ? parsed.data : { ...DEFAULT_APP_STYLE };
}
