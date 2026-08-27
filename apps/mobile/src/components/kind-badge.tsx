import { type StyleProp, Text, type TextStyle } from "react-native";
import { appBorderAppearance, useAppStyle } from "@/lib/app-style";

// Static map so NativeWind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

/**
 * The pill naming where a post or source came from. Takes its border from the
 * member's app style; `textStyle` carries the surrounding post's typography.
 */
export function KindBadge({
  kind,
  textStyle,
}: {
  kind: string;
  textStyle?: StyleProp<TextStyle>;
}) {
  const { appStyle } = useAppStyle();
  return (
    <Text
      className={`border bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase ${
        KIND_COLORS[kind] ?? "text-slate-400"
      }`}
      style={[appBorderAppearance(appStyle), textStyle]}
    >
      {kind}
    </Text>
  );
}
