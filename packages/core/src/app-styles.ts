import type { PostBorderLineStyle, PostBorderRadius, PostFont } from "./post-styles";

export const APP_SPACING_VALUES = ["0px", "4px", "8px", "12px", "20px", "32px"] as const;

export type AppSpacing = (typeof APP_SPACING_VALUES)[number];

export const APP_SPACING_OPTIONS: readonly { label: string; value: AppSpacing }[] = [
  { label: "None", value: "0px" },
  { label: "Tight", value: "4px" },
  { label: "Compact", value: "8px" },
  { label: "Default", value: "12px" },
  { label: "Roomy", value: "20px" },
  { label: "Airy", value: "32px" },
];

/**
 * A member's private application chrome. Unlike post styles, this changes the
 * signed-in experience only; it is never applied to their public profile.
 */
export type AppStyle = {
  backgroundColor: string;
  secondaryBackgroundColor: string;
  borderColor: string;
  borderRadius: PostBorderRadius;
  borderLineStyle: PostBorderLineStyle;
  font: PostFont;
  fontColor: string;
  secondaryTextColor: string;
  spacing: AppSpacing;
  overridePostStyles: boolean;
};

export const DEFAULT_APP_STYLE: Readonly<AppStyle> = {
  backgroundColor: "#070a18",
  secondaryBackgroundColor: "#0f172a",
  borderColor: "#24293a",
  borderRadius: "16px",
  borderLineStyle: "solid",
  font: "sans-serif",
  fontColor: "#f8fafc",
  secondaryTextColor: "#94a3b8",
  spacing: "12px",
  overridePostStyles: false,
};
