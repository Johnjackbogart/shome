"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "#/lib/api";
import { timeAgo } from "#/lib/format";
import type { ConnectionView, SourceView } from "#/lib/types";

type Kind = "rss" | "bluesky" | "mastodon" | "youtube";

const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function SourcesView() {
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [sourceResult, connectionResult] = await Promise.all([
        api.get<{ sources: SourceView[] }>("/api/sources"),
        api.get<{ connections: ConnectionView[] }>("/api/connections"),
      ]);
      setSources(sourceResult.sources);
      setConnections(connectionResult.connections);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function removeSource(id: string) {
    setError(null);
    try {
      await api.del(`/api/sources/${id}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function refreshSource(id: string) {
    setError(null);
    try {
      const res = await api.post<{ fetched: number }>(`/api/sources/${id}/refresh`);
      setNotice(`fetched ${res.fetched} items`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function removeConnection(id: string) {
    setError(null);
    try {
      await api.del(`/api/connections/${id}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-[3fr_2fr]">
      <div>
        <h2 className="mb-3 text-xl font-bold">Sources</h2>
        <p className="mb-3 text-sm text-slate-400">
          Review, refresh, or remove the sources already in your feed. Find new ones in Discover.
        </p>
        <AddSourceForm
          connections={connections}
          onAdded={(msg) => {
            setNotice(msg);
            setError(null);
            void load();
          }}
          onError={(msg) => {
            setNotice(null);
            setError(msg);
          }}
        />
        {notice && <p className="mb-2 text-sm text-emerald-400">{notice}</p>}
        {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

        {sources === null ? (
          <p className="text-slate-400">loading…</p>
        ) : sources.length === 0 ? (
          <p className="text-slate-400">No sources yet — add one above.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {sources.map((source) => (
              <li
                key={source.id}
                className="card flex items-center justify-between gap-3 px-3.5 py-3"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                  <span className={`badge ${KIND_COLORS[source.kind] ?? ""}`}>{source.kind}</span>
                  <span className="font-semibold [overflow-wrap:anywhere]">
                    {source.title ?? describeConfig(source)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {source.lastFetchedAt
                      ? `fetched ${timeAgo(source.lastFetchedAt)}`
                      : "never fetched"}
                  </span>
                  {source.lastError && (
                    <span className="text-xs text-red-400">{source.lastError}</span>
                  )}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => void refreshSource(source.id)}
                  >
                    refresh
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-red-400"
                    onClick={() => void removeSource(source.id)}
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold">Connections</h2>
        <p className="mb-3 text-sm text-slate-400">
          Linked credentials, for sources that need them — and for posting to Bluesky or Mastodon.
        </p>
        <AddConnectionForm
          onAdded={() => {
            setError(null);
            void load();
          }}
          onError={setError}
        />
        {connections.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {connections.map((connection) => (
              <li
                key={connection.id}
                className="card flex items-center justify-between gap-3 px-3.5 py-3"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                  <span className={`badge ${KIND_COLORS[connection.provider] ?? ""}`}>
                    {connection.provider}
                  </span>
                  <span className="font-semibold">{connection.label}</span>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    className="btn-ghost text-red-400"
                    onClick={() => void removeConnection(connection.id)}
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function describeConfig(source: SourceView): string {
  const config = source.config;
  return (
    (typeof config.url === "string" && config.url) ||
    (typeof config.actor === "string" && `@${config.actor}`) ||
    (typeof config.account === "string" && `@${config.account}`) ||
    (typeof config.hashtag === "string" && `#${config.hashtag}`) ||
    (typeof config.handle === "string" && `@${config.handle}`) ||
    (typeof config.channelId === "string" && config.channelId) ||
    source.kind
  );
}

function AddSourceForm({
  connections,
  onAdded,
  onError,
}: {
  connections: ConnectionView[];
  onAdded: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [kind, setKind] = useState<Kind>("rss");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");
  const [blueskyMode, setBlueskyMode] = useState<"author" | "timeline">("author");
  const [actor, setActor] = useState("");
  const [server, setServer] = useState("");
  const [mastodonMode, setMastodonMode] = useState<"public" | "hashtag" | "home">("hashtag");
  const [hashtag, setHashtag] = useState("");
  const [account, setAccount] = useState("");
  const [channel, setChannel] = useState("");
  const [connectionId, setConnectionId] = useState("");

  const needsConnection =
    (kind === "bluesky" && blueskyMode === "timeline") ||
    (kind === "mastodon" && mastodonMode === "home");
  const eligibleConnections = connections.filter((c) => c.provider === kind);

  function buildConfig(): Record<string, unknown> {
    if (kind === "rss") return { url };
    if (kind === "bluesky") {
      return blueskyMode === "author"
        ? { mode: "author", actor }
        : { mode: "timeline", account: actor };
    }
    if (kind === "mastodon") {
      const config: Record<string, unknown> = { server, mode: mastodonMode };
      if (mastodonMode === "hashtag") config.hashtag = hashtag;
      if (mastodonMode === "home") config.account = account;
      return config;
    }
    const trimmed = channel.trim();
    return trimmed.startsWith("@") ? { handle: trimmed } : { channelId: trimmed };
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post<{
        source: SourceView;
        fetched?: number;
        refreshError?: string;
      }>("/api/sources", {
        kind,
        config: buildConfig(),
        connectionId: connectionId || undefined,
      });
      const name = res.source.title ?? describeConfig(res.source);
      onAdded(
        res.refreshError
          ? `added "${name}" — first fetch failed: ${res.refreshError}`
          : `added "${name}" (${res.fetched ?? 0} items)`,
      );
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card mb-3 flex flex-col gap-2.5" onSubmit={submit}>
      <div className="flex flex-wrap gap-2">
        <select className="input" value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
          <option value="rss">RSS / Atom</option>
          <option value="bluesky">Bluesky</option>
          <option value="mastodon">Mastodon</option>
          <option value="youtube">YouTube</option>
        </select>

        {kind === "rss" && (
          <input
            className="input min-w-36 flex-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/feed.xml"
            required
          />
        )}

        {kind === "bluesky" && (
          <>
            <select
              className="input"
              value={blueskyMode}
              onChange={(e) => setBlueskyMode(e.target.value as "author" | "timeline")}
            >
              <option value="author">someone's posts</option>
              <option value="timeline">my timeline</option>
            </select>
            <input
              className="input min-w-36 flex-1"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              placeholder={blueskyMode === "author" ? "alice.bsky.social" : "you.bsky.social"}
              required
            />
          </>
        )}

        {kind === "mastodon" && (
          <>
            <input
              className="input min-w-36 flex-1"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              placeholder="mastodon.social"
              required
            />
            <select
              className="input"
              value={mastodonMode}
              onChange={(e) => setMastodonMode(e.target.value as "public" | "hashtag" | "home")}
            >
              <option value="hashtag">hashtag</option>
              <option value="public">public timeline</option>
              <option value="home">my home timeline</option>
            </select>
            {mastodonMode === "hashtag" && (
              <input
                className="input min-w-36 flex-1"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="photography"
                required
              />
            )}
            {mastodonMode === "home" && (
              <input
                className="input min-w-36 flex-1"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="you@mastodon.social"
                required
              />
            )}
          </>
        )}

        {kind === "youtube" && (
          <input
            className="input min-w-36 flex-1"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="@channelhandle or UC… channel id"
            required
          />
        )}
      </div>

      {(needsConnection || (kind === "youtube" && eligibleConnections.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="input"
            value={connectionId}
            onChange={(e) => setConnectionId(e.target.value)}
          >
            <option value="">
              {needsConnection ? "choose a connection…" : "no connection (server key)"}
            </option>
            {eligibleConnections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.provider} · {c.label}
              </option>
            ))}
          </select>
          {needsConnection && eligibleConnections.length === 0 && (
            <span className="text-sm text-slate-400">add a {kind} connection first →</span>
          )}
        </div>
      )}

      <button type="submit" className="btn self-start" disabled={busy}>
        {busy ? "adding…" : "add source"}
      </button>
    </form>
  );
}

function AddConnectionForm({
  onAdded,
  onError,
}: {
  onAdded: () => void;
  onError: (message: string) => void;
}) {
  const [provider, setProvider] = useState<"bluesky" | "mastodon" | "youtube">("bluesky");
  const [label, setLabel] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [mastodonServer, setMastodonServer] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const credentials: Record<string, string> =
        provider === "bluesky"
          ? { identifier, appPassword }
          : provider === "mastodon"
            ? { server: mastodonServer, accessToken }
            : { apiKey };
      await api.post("/api/connections", {
        provider,
        label: label.trim() || undefined,
        credentials,
      });
      setLabel("");
      setIdentifier("");
      setAppPassword("");
      setMastodonServer("");
      setAccessToken("");
      setApiKey("");
      onAdded();
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card flex flex-col gap-2.5" onSubmit={submit}>
      <div className="flex flex-wrap gap-2">
        <select
          className="input"
          value={provider}
          onChange={(e) => setProvider(e.target.value as "bluesky" | "mastodon" | "youtube")}
        >
          <option value="bluesky">Bluesky</option>
          <option value="mastodon">Mastodon</option>
          <option value="youtube">YouTube</option>
        </select>
        <input
          className="input min-w-36 flex-1"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="label (optional)"
        />
      </div>

      {provider === "bluesky" && (
        <div className="flex flex-wrap gap-2">
          <input
            className="input min-w-36 flex-1"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you.bsky.social"
            required
          />
          <input
            className="input min-w-36 flex-1"
            type="password"
            value={appPassword}
            onChange={(e) => setAppPassword(e.target.value)}
            placeholder="app password (not your main one)"
            required
          />
        </div>
      )}
      {provider === "mastodon" && (
        <div className="flex flex-wrap gap-2">
          <input
            className="input min-w-36 flex-1"
            value={mastodonServer}
            onChange={(e) => setMastodonServer(e.target.value)}
            placeholder="https://mastodon.social"
            required
          />
          <input
            className="input min-w-36 flex-1"
            type="password"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="access token"
            required
          />
        </div>
      )}
      {provider === "youtube" && (
        <input
          className="input"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="YouTube Data API key"
          required
        />
      )}

      <button type="submit" className="btn self-start" disabled={busy}>
        {busy ? "linking…" : "link connection"}
      </button>
    </form>
  );
}
