/**
 * The supported font families for authored posts. Keeping these as a small
 * allow-list means the same saved value works in the web and native clients
 * without accepting arbitrary CSS from a post request.
 */
export const POST_FONT_VALUES = ["sans-serif", "serif", "monospace"] as const;

export type PostFont = (typeof POST_FONT_VALUES)[number];

export const POST_BORDER_RADIUS_VALUES = ["0px", "8px", "16px", "24px"] as const;

export type PostBorderRadius = (typeof POST_BORDER_RADIUS_VALUES)[number];

export const POST_BORDER_LINE_STYLE_VALUES = ["solid", "dashed", "dotted"] as const;

export type PostBorderLineStyle = (typeof POST_BORDER_LINE_STYLE_VALUES)[number];

export const POST_FONT_OPTIONS: readonly { label: string; value: PostFont }[] = [
  { label: "Sans serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
];

export const POST_BORDER_RADIUS_OPTIONS: readonly {
  label: string;
  value: PostBorderRadius;
}[] = [
  { label: "Square", value: "0px" },
  { label: "Soft", value: "8px" },
  { label: "Rounded", value: "16px" },
  { label: "Extra round", value: "24px" },
];

export const POST_BORDER_LINE_STYLE_OPTIONS: readonly {
  label: string;
  value: PostBorderLineStyle;
}[] = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
];

export type PostStyle = {
  postBorderStyle: string;
  postBorderRadius: PostBorderRadius;
  postBorderLineStyle: PostBorderLineStyle;
  postBackgroundColor: string;
  postFont: PostFont;
  postFontColor: string;
  postSecondaryTextColor: string;
};

export const DEFAULT_POST_STYLE: Readonly<PostStyle> = {
  postBorderStyle: "#ffffff",
  postBorderRadius: "16px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#0f172a",
  postFont: "sans-serif",
  postFontColor: "#f8fafc",
  postSecondaryTextColor: "#94a3b8",
};

export function isPostFont(value: unknown): value is PostFont {
  return typeof value === "string" && POST_FONT_VALUES.includes(value as PostFont);
}

export function isPostBorderRadius(value: unknown): value is PostBorderRadius {
  return typeof value === "string" && POST_BORDER_RADIUS_VALUES.includes(value as PostBorderRadius);
}

export function isPostBorderLineStyle(value: unknown): value is PostBorderLineStyle {
  return (
    typeof value === "string" &&
    POST_BORDER_LINE_STYLE_VALUES.includes(value as PostBorderLineStyle)
  );
}
