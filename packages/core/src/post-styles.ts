/**
 * The supported font families for authored posts. Keeping these as a small
 * allow-list means the same saved value works in the web and native clients
 * without accepting arbitrary CSS from a post request.
 */
export const POST_FONT_VALUES = ["sans-serif", "serif", "monospace"] as const;

export type PostFont = (typeof POST_FONT_VALUES)[number];

export const POST_FONT_OPTIONS: readonly { label: string; value: PostFont }[] = [
  { label: "Sans serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
];

export const DEFAULT_POST_STYLE: Readonly<{
  borderStyle: string;
  backgroundColor: string;
  font: PostFont;
  fontColor: string;
}> = {
  borderStyle: "#ffffff",
  backgroundColor: "#0f172a",
  font: "sans-serif",
  fontColor: "#f8fafc",
};

export function isPostFont(value: unknown): value is PostFont {
  return typeof value === "string" && POST_FONT_VALUES.includes(value as PostFont);
}
