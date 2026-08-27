"use client";

import type { AppStyle } from "@shome/core";
import { type CSSProperties, type FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "#/lib/api";
import { originalSourceLabel, SOURCE_FETCH_ERROR, sourceLabel, timeAgo } from "#/lib/format";
import type { ConnectionView, SourceView } from "#/lib/types";

type Kind = "rss" | "bluesky" | "mastodon" | "youtube";

const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function SourcesView({ appStyle }: { appStyle: AppStyle }) {
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputStyle: CSSProperties = {
    backgroundColor: appStyle.appAccentBackgroundColor,
  };
  const pickerStyle: CSSProperties = {
    ...inputStyle,
    color: appStyle.appSecondaryTextColor,
    fontFamily: appStyle.appFont,
  };
  const primaryTextStyle: CSSProperties = {
    color: appStyle.appFontColor,
    fontFamily: appStyle.appFont,
  };

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

  async function renameSource(id: string, customTitle: string | null) {
    setError(null);
    const res = await api.patch<{ source: SourceView }>(`/api/sources/${id}`, { customTitle });
    setSources((current) =>
      (current ?? []).map((source) => (source.id === id ? res.source : source)),
    );
    setNotice(
      res.source.customTitle
        ? `renamed to "${res.source.customTitle}"`
        : `restored the original name "${originalSourceLabel(res.source)}"`,
    );
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
          inputStyle={inputStyle}
          pickerStyle={pickerStyle}
          accentBackgroundColor={appStyle.appAccentBackgroundColor}
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
              <SourceRow
                key={source.id}
                source={source}
                inputStyle={inputStyle}
                secondaryTextStyle={pickerStyle}
                primaryTextStyle={primaryTextStyle}
                primaryBackgroundColor={appStyle.appBackgroundColor}
                onRename={(title) => renameSource(source.id, title)}
                onRefresh={() => void refreshSource(source.id)}
                onRemove={() => void removeSource(source.id)}
              />
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
          inputStyle={inputStyle}
          pickerStyle={pickerStyle}
          accentBackgroundColor={appStyle.appAccentBackgroundColor}
          onAdded={(message) => {
            setError(null);
            setNotice(message);
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
                  <span className="font-semibold [overflow-wrap:anywhere]" style={primaryTextStyle}>
                    {connection.account ?? connection.label}
                  </span>
                  {connection.account && connection.label !== "default" && (
                    <span className="text-xs text-slate-400">{connection.label}</span>
                  )}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{
                      backgroundColor: appStyle.appBackgroundColor,
                      color: appStyle.appSecondaryTextColor,
                      fontFamily: appStyle.appFont,
                    }}
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

function SourceRow({
  source,
  inputStyle,
  secondaryTextStyle,
  primaryTextStyle,
  primaryBackgroundColor,
  onRename,
  onRefresh,
  onRemove,
}: {
  source: SourceView;
  inputStyle: CSSProperties;
  secondaryTextStyle: CSSProperties;
  primaryTextStyle: CSSProperties;
  primaryBackgroundColor: string;
  onRename: (customTitle: string | null) => Promise<void>;
  onRefresh: () => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const original = originalSourceLabel(source);

  function startEditing() {
    setDraft(source.customTitle ?? "");
    setError(null);
    setEditing(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      // An empty box means "go back to the name the feed gave it".
      await onRename(draft.trim() || null);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="card flex flex-wrap items-center justify-between gap-3 px-3.5 py-3">
      {editing ? (
        <form className="flex min-w-0 flex-1 flex-wrap items-center gap-2" onSubmit={save}>
          <input
            className="input min-w-40 flex-1"
            style={inputStyle}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={original}
            maxLength={200}
            aria-label={`Name for ${original}`}
            // biome-ignore lint/a11y/noAutofocus: the input replaces the button just clicked.
            autoFocus
          />
          <button type="submit" className="btn" style={secondaryTextStyle} disabled={busy}>
            {busy ? "saving…" : "save"}
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={secondaryTextStyle}
            onClick={() => setEditing(false)}
          >
            cancel
          </button>
          <p className="w-full text-xs text-slate-500">
            {source.customTitle
              ? `Clear the box to go back to "${original}".`
              : "Only you see this name."}
          </p>
          {error && <p className="w-full text-xs text-red-400">{error}</p>}
        </form>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <span className={`badge ${KIND_COLORS[source.kind] ?? ""}`}>{source.kind}</span>
            <span className="font-semibold [overflow-wrap:anywhere]" style={primaryTextStyle}>
              {sourceLabel(source)}
            </span>
            <span className="text-xs text-slate-400">
              {source.lastFetchedAt ? `fetched ${timeAgo(source.lastFetchedAt)}` : "never fetched"}
            </span>
            {source.lastError && <span className="text-xs text-red-400">{SOURCE_FETCH_ERROR}</span>}
          </div>
          {source.customTitle && (
            <span className="text-xs text-slate-500 [overflow-wrap:anywhere]">
              originally “{original}”
            </span>
          )}
        </div>
      )}
      <div className="flex shrink-0 gap-1.5">
        {!editing && (
          <button
            type="button"
            className="btn-ghost"
            style={secondaryTextStyle}
            onClick={startEditing}
          >
            rename
          </button>
        )}
        <button
          type="button"
          className="btn-ghost"
          style={secondaryTextStyle}
          onClick={onRefresh}
        >
          refresh
        </button>
        <button
          type="button"
          className="btn-ghost"
          style={{
            backgroundColor: primaryBackgroundColor,
            color: secondaryTextStyle.color,
            fontFamily: secondaryTextStyle.fontFamily,
          }}
          onClick={onRemove}
        >
          remove
        </button>
      </div>
    </li>
  );
}

function AddSourceForm({
  connections,
  inputStyle,
  pickerStyle,
  accentBackgroundColor,
  onAdded,
  onError,
}: {
  connections: ConnectionView[];
  inputStyle: CSSProperties;
  pickerStyle: CSSProperties;
  accentBackgroundColor: string;
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
      const name = sourceLabel(res.source);
      onAdded(
        res.refreshError
          ? `added "${name}" — ${res.refreshError}`
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
        <select
          className="input"
          style={pickerStyle}
          value={kind}
          onChange={(e) => setKind(e.target.value as Kind)}
        >
          <option value="rss">RSS / Atom</option>
          <option value="bluesky">Bluesky</option>
          <option value="mastodon">Mastodon</option>
          <option value="youtube">YouTube</option>
        </select>

        {kind === "rss" && (
          <input
            className="input min-w-36 flex-1"
            style={inputStyle}
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
              style={pickerStyle}
              value={blueskyMode}
              onChange={(e) => setBlueskyMode(e.target.value as "author" | "timeline")}
            >
              <option value="author">someone's posts</option>
              <option value="timeline">my timeline</option>
            </select>
            <input
              className="input min-w-36 flex-1"
              style={inputStyle}
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
              style={inputStyle}
              value={server}
              onChange={(e) => setServer(e.target.value)}
              placeholder="mastodon.social"
              required
            />
            <select
              className="input"
              style={pickerStyle}
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
                style={inputStyle}
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="photography"
                required
              />
            )}
            {mastodonMode === "home" && (
              <input
                className="input min-w-36 flex-1"
                style={inputStyle}
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
            style={pickerStyle}
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
            style={pickerStyle}
            value={connectionId}
            onChange={(e) => setConnectionId(e.target.value)}
          >
            <option value="">
              {needsConnection ? "choose a connection…" : "no connection (server key)"}
            </option>
            {eligibleConnections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.provider} · {c.account ?? c.label}
              </option>
            ))}
          </select>
          {needsConnection && eligibleConnections.length === 0 && (
            <span className="text-sm text-slate-400">add a {kind} connection first →</span>
          )}
        </div>
      )}

      <button
        type="submit"
        className="btn self-start"
        style={{
          backgroundColor: accentBackgroundColor,
          color: pickerStyle.color,
          fontFamily: pickerStyle.fontFamily,
        }}
        disabled={busy}
      >
        {busy ? "adding…" : "add source"}
      </button>
    </form>
  );
}

function AddConnectionForm({
  inputStyle,
  pickerStyle,
  accentBackgroundColor,
  onAdded,
  onError,
}: {
  inputStyle: CSSProperties;
  pickerStyle: CSSProperties;
  accentBackgroundColor: string;
  onAdded: (message: string | null) => void;
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
      const result = await api.post<{
        following?: { imported: number; alreadySubscribed: number };
        followingImportFailed: boolean;
      }>("/api/connections", {
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
      if (result.followingImportFailed) {
        onAdded("connection linked, but following could not be imported");
      } else if (result.following) {
        const { imported, alreadySubscribed } = result.following;
        onAdded(
          imported > 0
            ? `added ${imported} followed ${imported === 1 ? "account" : "accounts"} to Sources`
            : alreadySubscribed > 0
              ? "all followed accounts are already in Sources"
              : "no followed accounts to add",
        );
      } else {
        onAdded(null);
      }
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
          style={pickerStyle}
          value={provider}
          onChange={(e) => setProvider(e.target.value as "bluesky" | "mastodon" | "youtube")}
        >
          <option value="bluesky">Bluesky</option>
          <option value="mastodon">Mastodon</option>
          <option value="youtube">YouTube</option>
        </select>
        <input
          className="input min-w-36 flex-1"
          style={inputStyle}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="label (optional)"
        />
      </div>

      {provider === "bluesky" && (
        <div className="flex flex-wrap gap-2">
          <input
            className="input min-w-36 flex-1"
            style={inputStyle}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you.bsky.social"
            required
          />
          <input
            className="input min-w-36 flex-1"
            style={inputStyle}
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
            style={inputStyle}
            value={mastodonServer}
            onChange={(e) => setMastodonServer(e.target.value)}
            placeholder="https://mastodon.social"
            required
          />
          <input
            className="input min-w-36 flex-1"
            style={inputStyle}
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
          style={inputStyle}
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="YouTube Data API key"
          required
        />
      )}

      <button
        type="submit"
        className="btn self-start"
        style={{
          backgroundColor: accentBackgroundColor,
          color: pickerStyle.color,
          fontFamily: pickerStyle.fontFamily,
        }}
        disabled={busy}
      >
        {busy ? "linking…" : "link connection"}
      </button>
    </form>
  );
}
