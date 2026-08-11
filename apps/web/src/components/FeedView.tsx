"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { timeAgo, truncate } from "@/lib/format";
import type { ConnectionView, FeedItemView } from "@/lib/types";

const KINDS = ["post", "rss", "bluesky", "mastodon", "youtube"];

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  post: "text-emerald-300",
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function FeedView() {
  const [items, setItems] = useState<FeedItemView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [appliedQ, setAppliedQ] = useState("");
  const [kind, setKind] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (appliedQ) params.set("q", appliedQ);
      if (kind) params.set("kind", kind);
      const res = await api.get<{ items: FeedItemView[] }>(`/api/feed?${params}`);
      setItems(res.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [appliedQ, kind]);

  useEffect(() => {
    void load();
  }, [load]);

  async function refreshAll() {
    setBusy(true);
    setError(null);
    try {
      await api.post("/api/refresh");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  function search(e: FormEvent) {
    e.preventDefault();
    setAppliedQ(q.trim());
  }

  return (
    <section>
      <PostComposer
        onPosted={(post) => {
          setItems((current) => [post, ...(current ?? [])]);
          setKind("");
          setQ("");
          setAppliedQ("");
        }}
      />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <form className="min-w-48 flex-1" onSubmit={search}>
          <input
            className="input w-full"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search your feed…"
          />
        </form>
        <select className="input" value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="">all kinds</option>
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <button type="button" className="btn" onClick={refreshAll} disabled={busy}>
          {busy ? "refreshing…" : "refresh"}
        </button>
      </div>

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      {items === null ? (
        <p className="text-zinc-400">loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-12 text-center">
          <p>Nothing here yet.</p>
          <p className="text-zinc-400">
            Write your first post above, or add a source in the Sources tab.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function FeedItem({ item }: { item: FeedItemView }) {
  const images = item.media.filter((m) => m.type === "image");
  const other = item.media.filter((m) => m.type !== "image");
  const crossPosts = item.crossPosts ?? [];
  return (
    <article className="card">
      <header className="mb-2 flex items-center gap-2.5">
        {item.authorAvatarUrl && (
          <img
            className="h-9 w-9 rounded-full bg-zinc-800 object-cover"
            src={item.authorAvatarUrl}
            alt=""
            loading="lazy"
          />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="font-semibold">
            {item.authorName ?? item.sourceTitle ?? item.sourceKind}
            {item.authorHandle && (
              <span className="font-normal text-zinc-400"> @{item.authorHandle}</span>
            )}
          </span>
          <span className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
            <span className={`badge ${KIND_COLORS[item.sourceKind] ?? ""}`}>{item.sourceKind}</span>
            {item.sourceTitle ? <span>{item.sourceTitle} ·</span> : null}
            <span>{timeAgo(item.publishedAt ?? item.fetchedAt)}</span>
          </span>
        </div>
      </header>

      {item.title && (
        <h3 className="mt-0.5 mb-1 text-[1.05rem] font-semibold">
          {item.url ? (
            <a
              className="text-zinc-100 hover:underline"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
      )}

      {item.html ? (
        // Sanitized server-side at ingest (tight allowlist, no styles/scripts).
        <div
          className="prose prose-sm prose-invert max-w-none [overflow-wrap:anywhere]"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      ) : item.text ? (
        <p className="[overflow-wrap:anywhere]">{truncate(item.text, 500)}</p>
      ) : null}

      {images.length > 0 && (
        <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
          {images.slice(0, 4).map((m) => (
            <img
              key={m.url}
              className="max-h-80 w-full rounded-lg object-cover"
              src={m.url}
              alt={m.alt ?? ""}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {(other.length > 0 || item.url || crossPosts.length > 0) && (
        <footer className="mt-2.5 flex items-center gap-3 text-sm">
          {other.map((m) => (
            <a
              key={m.url}
              className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-zinc-100"
              href={m.url}
              target="_blank"
              rel="noreferrer"
            >
              ▶ {m.type}
            </a>
          ))}
          {item.url && (
            <a
              className="text-zinc-400 hover:text-zinc-100"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              open ↗
            </a>
          )}
          {crossPosts.map((crossPost) => (
            <a
              key={crossPost.provider}
              className="text-zinc-400 hover:text-zinc-100"
              href={crossPost.url}
              target="_blank"
              rel="noreferrer"
            >
              {crossPost.provider} ↗
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}

type Delivery = {
  provider: "bluesky" | "mastodon";
  ok: boolean;
  url?: string;
  error?: string;
};

function PostComposer({ onPosted }: { onPosted: (post: FeedItemView) => void }) {
  const [text, setText] = useState("");
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [blueskyConnectionId, setBlueskyConnectionId] = useState("");
  const [mastodonConnectionId, setMastodonConnectionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ connections: ConnectionView[] }>("/api/connections")
      .then((res) => setConnections(res.connections))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  const blueskyConnections = connections.filter((connection) => connection.provider === "bluesky");
  const mastodonConnections = connections.filter(
    (connection) => connection.provider === "mastodon",
  );
  const blueskyLength = [...text].length;
  const blueskyTooLong = Boolean(blueskyConnectionId) && blueskyLength > 300;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await api.post<{ post: FeedItemView; deliveries: Delivery[] }>("/api/posts", {
        text,
        blueskyConnectionId: blueskyConnectionId || undefined,
        mastodonConnectionId: mastodonConnectionId || undefined,
      });
      setText("");
      onPosted(res.post);
      if (res.deliveries.length === 0) {
        setNotice("posted to your shome feed");
      } else {
        const succeeded = res.deliveries
          .filter((delivery) => delivery.ok)
          .map((delivery) => delivery.provider);
        const failed = res.deliveries.filter((delivery) => !delivery.ok);
        setNotice(
          [
            "posted to your shome feed",
            succeeded.length > 0 ? `shared to ${succeeded.join(" + ")}` : null,
            ...failed.map(
              (delivery) => `${delivery.provider}: ${delivery.error ?? "could not post"}`,
            ),
          ]
            .filter(Boolean)
            .join(" · "),
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card mb-5 flex flex-col gap-3" onSubmit={submit}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Write a post</h2>
        <span className="text-xs text-zinc-500">shows on your public profile</span>
      </div>
      <textarea
        className="input min-h-28 w-full resize-y"
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={5_000}
        placeholder="What’s on your mind?"
        aria-label="Post text"
      />

      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex items-center gap-2 text-zinc-200">
          <input
            type="checkbox"
            checked={Boolean(blueskyConnectionId)}
            disabled={blueskyConnections.length === 0}
            onChange={(event) =>
              setBlueskyConnectionId(event.target.checked ? (blueskyConnections[0]?.id ?? "") : "")
            }
          />
          Post to Bluesky
        </label>
        {blueskyConnectionId && blueskyConnections.length > 1 && (
          <select
            className="input py-1 text-sm"
            value={blueskyConnectionId}
            onChange={(event) => setBlueskyConnectionId(event.target.value)}
            aria-label="Bluesky connection"
          >
            {blueskyConnections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.label}
              </option>
            ))}
          </select>
        )}
        <label className="flex items-center gap-2 text-zinc-200">
          <input
            type="checkbox"
            checked={Boolean(mastodonConnectionId)}
            disabled={mastodonConnections.length === 0}
            onChange={(event) =>
              setMastodonConnectionId(
                event.target.checked ? (mastodonConnections[0]?.id ?? "") : "",
              )
            }
          />
          Post to Mastodon
        </label>
        {mastodonConnectionId && mastodonConnections.length > 1 && (
          <select
            className="input py-1 text-sm"
            value={mastodonConnectionId}
            onChange={(event) => setMastodonConnectionId(event.target.value)}
            aria-label="Mastodon connection"
          >
            {mastodonConnections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.label}
              </option>
            ))}
          </select>
        )}
        {(blueskyConnections.length === 0 || mastodonConnections.length === 0) && (
          <span className="text-xs text-zinc-500">Link accounts in Sources to cross-post.</span>
        )}
      </div>
      {blueskyConnectionId && (
        <p className={blueskyTooLong ? "text-xs text-red-400" : "text-xs text-zinc-500"}>
          Bluesky: {blueskyLength}/300 characters
        </p>
      )}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="btn"
          disabled={busy || text.trim().length === 0 || blueskyTooLong}
        >
          {busy ? "posting…" : "post"}
        </button>
        {notice && <p className="text-sm text-emerald-400">{notice}</p>}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
