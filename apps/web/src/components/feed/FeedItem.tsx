import { timeAgo, truncate } from "#/lib/format";
import type { FeedItemView } from "#/lib/types";

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  post: "text-emerald-300",
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

function MediaState({ status, type }: { status: string; type: "photo" | "video" }) {
  const message =
    status === "failed"
      ? `${type} processing failed`
      : status === "uploading"
        ? `${type} uploading…`
        : `${type} processing…`;
  return (
    <div className="grid min-h-32 place-items-center rounded-lg border border-white/10 bg-black/30 px-4 text-sm text-slate-400">
      {message}
    </div>
  );
}

export default function FeedItem({ item }: { item: FeedItemView }) {
  const images = item.media.filter((m) => m.type === "image");
  const videos = item.media.filter((m) => m.type === "video");
  const other = item.media.filter((m) => m.type !== "image" && m.type !== "video");
  const crossPosts = item.crossPosts ?? [];
  const hasCustomStyle =
    item.sourceKind === "post" &&
    Boolean(
      item.borderStyle ||
        item.borderRadius ||
        item.borderLineStyle ||
        item.backgroundColor ||
        item.font ||
        item.fontColor ||
        item.secondaryTextColor,
    );
  const articleStyle = hasCustomStyle
    ? {
        borderColor: item.borderStyle ?? undefined,
        borderRadius: item.borderRadius ?? undefined,
        borderStyle: item.borderLineStyle ?? undefined,
        backgroundColor: item.backgroundColor ?? undefined,
        color: item.fontColor ?? undefined,
        fontFamily: item.font ?? undefined,
      }
    : undefined;
  const primaryTextStyle = hasCustomStyle ? { color: item.fontColor ?? undefined } : undefined;
  const secondaryTextStyle = hasCustomStyle
    ? { color: item.secondaryTextColor ?? item.fontColor ?? undefined }
    : undefined;

  return (
    <article className="card" style={articleStyle}>
      <header className="mb-2 flex items-center gap-2.5">
        {item.authorAvatarUrl && (
          <img
            className="h-9 w-9 rounded-full bg-slate-800 object-cover"
            src={item.authorAvatarUrl}
            alt=""
            loading="lazy"
          />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="font-semibold" style={primaryTextStyle}>
            {item.authorName ?? item.sourceTitle ?? item.sourceKind}
            {item.authorHandle && (
              <span className="font-normal text-slate-400" style={secondaryTextStyle}>
                @{item.authorHandle}
              </span>
            )}
          </span>
          <span className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span
              className={`badge ${KIND_COLORS[item.sourceKind] ?? ""}`}
              style={secondaryTextStyle}
            >
              {item.sourceKind}
            </span>
            {item.sourceTitle ? <span style={secondaryTextStyle}>{item.sourceTitle} ·</span> : null}
            <span style={secondaryTextStyle}>{timeAgo(item.publishedAt ?? item.fetchedAt)}</span>
          </span>
        </div>
      </header>

      {item.title && (
        <h3 className="mt-0.5 mb-1 text-[1.05rem] font-semibold" style={primaryTextStyle}>
          {item.url ? (
            <a
              className="text-slate-100 hover:text-indigo-100 hover:underline"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={primaryTextStyle}
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
      )}

      {item.text ? (
        <p className="[overflow-wrap:anywhere]" style={primaryTextStyle}>
          {truncate(item.text, 500)}
        </p>
      ) : null}

      {images.length > 0 && (
        <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
          {images.map((media) =>
            media.status && media.status !== "ready" ? (
              <MediaState key={media.url} status={media.status} type="photo" />
            ) : (
              <img
                key={media.url}
                className="max-h-80 w-full rounded-lg object-cover"
                src={media.url}
                alt={media.alt ?? ""}
                loading="lazy"
              />
            ),
          )}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-2.5 grid gap-2">
          {videos.map((media) => {
            if (media.status && media.status !== "ready") {
              return <MediaState key={media.url} status={media.status} type="video" />;
            }
            if (media.embedUrl) {
              return (
                <iframe
                  key={media.url}
                  className="aspect-video w-full rounded-lg border-0 bg-black"
                  src={media.embedUrl}
                  title="Post video"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              );
            }
            return (
              // biome-ignore lint/a11y/useMediaCaption: caption uploads are not part of the current media contract.
              <video
                key={media.url}
                className="max-h-[70vh] w-full rounded-lg bg-black object-contain"
                controls
                playsInline
                preload="metadata"
              >
                <source src={media.url} />
                Your browser does not support this video.
              </video>
            );
          })}
        </div>
      )}

      {(other.length > 0 || item.url || crossPosts.length > 0) && (
        <footer className="mt-2.5 flex items-center gap-3 text-sm">
          {other.map((m) => (
            <a
              key={m.url}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-slate-100"
              href={m.url}
              target="_blank"
              rel="noreferrer"
              style={secondaryTextStyle}
            >
              ▶ {m.type}
            </a>
          ))}
          {item.url && (
            <a
              className="text-slate-400 hover:text-indigo-100"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={secondaryTextStyle}
            >
              open ↗
            </a>
          )}
          {crossPosts.map((crossPost) => (
            <a
              key={crossPost.provider}
              className="text-slate-400 hover:text-indigo-100"
              href={crossPost.url}
              target="_blank"
              rel="noreferrer"
              style={secondaryTextStyle}
            >
              {crossPost.provider} ↗
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}
