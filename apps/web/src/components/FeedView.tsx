"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { timeAgo, truncate } from "@/lib/format";
import type { FeedItemView } from "@/lib/types";

const KINDS = ["rss", "bluesky", "mastodon", "youtube"];

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
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
          <p className="text-zinc-400">Add sources in the Sources tab, then refresh.</p>
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

      {(other.length > 0 || item.url) && (
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
        </footer>
      )}
    </article>
  );
}
