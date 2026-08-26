import {
  DEFAULT_POST_STYLE,
  POST_BORDER_LINE_STYLE_VALUES,
  POST_BORDER_RADIUS_VALUES,
  POST_FONT_VALUES,
  type PostStyle,
} from "@shome/core";
import { z } from "zod";

export const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, "must be a six-digit hex color");

export const postStyleSchema = z.object({
  borderStyle: hexColorSchema,
  borderRadius: z.enum(POST_BORDER_RADIUS_VALUES),
  borderLineStyle: z.enum(POST_BORDER_LINE_STYLE_VALUES),
  backgroundColor: hexColorSchema,
  font: z.enum(POST_FONT_VALUES),
  fontColor: hexColorSchema,
  secondaryTextColor: hexColorSchema,
});

/**
 * Database values still cross a trust boundary: older migrations stored the
 * defaults as free-form text/JSON, and an operator can edit the scalar columns
 * directly. Keep malformed values from reaching either client as styling data.
 */
export function postStyleOrDefault(value: unknown): PostStyle {
  const parsed = postStyleSchema.safeParse(value);
  return parsed.success ? parsed.data : { ...DEFAULT_POST_STYLE };
}
