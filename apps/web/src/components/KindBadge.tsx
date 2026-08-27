import type { CSSProperties } from "react";

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  post: "text-emerald-300",
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

/**
 * The pill naming where a post or source came from. `.badge` picks up the
 * member's border tokens from `.app-theme` in globals.css.
 */
export function KindBadge({ kind, style }: { kind: string; style?: CSSProperties }) {
  return (
    <span className={`badge ${KIND_COLORS[kind] ?? ""}`} style={style}>
      {kind}
    </span>
  );
}
