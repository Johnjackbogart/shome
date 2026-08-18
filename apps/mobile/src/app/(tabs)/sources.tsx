import type {
  DiscoveredRssFeed,
  PopularRssFeed,
  PopularRssResponse,
  SourceView,
} from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import { COLORS, UI } from "@/lib/ui";

type Kind = "rss" | "bluesky" | "mastodon" | "youtube";

const KIND_LABELS: Record<Kind, string> = {
  rss: "RSS",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  youtube: "YouTube",
};

const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

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

export default function SourcesScreen() {
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [popularRssFeeds, setPopularRssFeeds] = useState<PopularRssFeed[]>([]);
  const [popularOrigin, setPopularOrigin] = useState<PopularRssResponse["origin"]>("feedly");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const primary = api.get<{ sources: SourceView[] }>("/api/sources");
      // Discovery is optional: a ranking error should never prevent access to
      // the user's own sources.
      const popular = api.get<PopularRssResponse>("/api/discover/rss/popular").catch(() => null);
      const [res, popularResult] = await Promise.all([primary, popular]);
      setSources(res.sources);
      setPopularRssFeeds(popularResult?.feeds ?? []);
      setPopularOrigin(popularResult?.origin ?? "feedly");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onPullRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
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

  async function removeSource(id: string) {
    setError(null);
    try {
      await api.del(`/api/sources/${id}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <SafeAreaView className={UI.screen} edges={["top"]}>
      <FlatList
        data={sources ?? []}
        keyExtractor={(source) => source.id}
        contentContainerClassName="px-5 pb-8"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onPullRefresh}
            tintColor={COLORS.accent}
          />
        }
        ListHeaderComponent={
          <View>
            <Text className={`pb-2 pt-2 ${UI.eyebrow}`}>Shape your feed</Text>
            <Text className="pb-5 text-3xl font-semibold text-white">Sources</Text>
            <RssDiscovery
              popularFeeds={popularRssFeeds}
              popularOrigin={popularOrigin}
              subscribedFeedUrls={
                new Set(
                  (sources ?? []).flatMap((source) =>
                    typeof source.config.url === "string" ? [source.config.url] : [],
                  ),
                )
              }
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
            <AddSourceForm
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
            {notice && <Text className="pb-2 text-sm text-emerald-300">{notice}</Text>}
            {error && <Text className="pb-2 text-sm text-rose-300">{error}</Text>}
            {sources !== null && sources.length === 0 && (
              <Text className="mt-4 text-slate-400">No sources yet — add one above.</Text>
            )}
          </View>
        }
        renderItem={({ item: source }) => (
          <View className={`mb-3 px-4 py-4 ${UI.card}`}>
            <View className="flex-row flex-wrap items-center gap-2">
              <Text
                className={`rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase ${
                  KIND_COLORS[source.kind] ?? "text-slate-400"
                }`}
              >
                {source.kind}
              </Text>
              <Text className="shrink font-semibold text-white" numberOfLines={1}>
                {source.title ?? describeConfig(source)}
              </Text>
            </View>
            <Text className="mt-1 text-xs text-slate-500">
              {source.lastFetchedAt ? `fetched ${timeAgo(source.lastFetchedAt)}` : "never fetched"}
            </Text>
            {source.lastError && (
              <Text className="mt-1 text-xs text-rose-300">{source.lastError}</Text>
            )}
            <View className="mt-3 flex-row gap-2">
              <Pressable
                onPress={() => void refreshSource(source.id)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 active:opacity-70"
              >
                <Text className="text-xs font-medium text-indigo-200">Refresh</Text>
              </Pressable>
              <Pressable
                onPress={() => void removeSource(source.id)}
                className="rounded-xl border border-rose-300/15 bg-rose-300/5 px-3 py-2 active:opacity-70"
              >
                <Text className="text-xs font-medium text-rose-300">Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function addedMessage(
  source: SourceView,
  fallback: string,
  fetched: number | undefined,
  refreshError: string | undefined,
): string {
  const name = source.title ?? fallback;
  return refreshError
    ? `added "${name}" — first fetch failed: ${refreshError}`
    : `added "${name}" (${fetched ?? 0} items)`;
}

function RssDiscovery({
  popularFeeds,
  popularOrigin,
  subscribedFeedUrls,
  onAdded,
  onError,
}: {
  popularFeeds: PopularRssFeed[];
  popularOrigin: PopularRssResponse["origin"];
  subscribedFeedUrls: Set<string>;
  onAdded: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [website, setWebsite] = useState("");
  const [feeds, setFeeds] = useState<DiscoveredRssFeed[] | null>(null);
  const [discovering, setDiscovering] = useState(false);
  const [subscribingUrl, setSubscribingUrl] = useState<string | null>(null);
  async function discover() {
    setDiscovering(true);
    try {
      const result = await api.get<{ feeds: DiscoveredRssFeed[] }>(
        `/api/discover/rss?q=${encodeURIComponent(website)}`,
      );
      setFeeds(result.feeds);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setDiscovering(false);
    }
  }

  async function subscribe(url: string, fallback: string) {
    setSubscribingUrl(url);
    try {
      const result = await api.post<{
        source: SourceView;
        fetched?: number;
        refreshError?: string;
      }>("/api/sources", { kind: "rss", config: { url } });
      onAdded(addedMessage(result.source, fallback, result.fetched, result.refreshError));
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubscribingUrl(null);
    }
  }

  return (
    <View className={`mb-4 gap-3 ${UI.card}`}>
      <View>
        <Text className="text-lg font-semibold text-white">Discover RSS</Text>
        <Text className="mt-1 text-sm leading-5 text-slate-400">
          Search by name or paste a publication, blog, or podcast website—we’ll find its public
          feeds.
        </Text>
      </View>
      <TextInput
        className={UI.input}
        placeholder="Ars Technica or arstechnica.com"
        placeholderTextColor="#64748b"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        value={website}
        onChangeText={setWebsite}
        onSubmitEditing={() => void discover()}
      />
      <Pressable
        onPress={() => void discover()}
        disabled={discovering}
        className={`self-start ${UI.primaryButton}`}
      >
        {discovering ? (
          <ActivityIndicator size="small" color={COLORS.background} />
        ) : (
          <Text className="text-sm font-semibold text-slate-950">Find feeds</Text>
        )}
      </Pressable>

      {feeds && (
        <View className="gap-2 border-t border-white/10 pt-3">
          {feeds.length === 0 ? (
            <Text className="text-sm text-slate-400">
              No public RSS or Atom feed found for that site.
            </Text>
          ) : (
            feeds.map((feed) => (
              <View
                key={feed.url}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"
              >
                <Text className="font-semibold text-white">
                  {feed.title ?? feed.siteName ?? feed.url}
                  {feed.isPodcast ? " · podcast" : ""}
                </Text>
                {feed.description && (
                  <Text className="mt-1 text-sm leading-5 text-slate-400">{feed.description}</Text>
                )}
                <Text className="mt-1 text-xs text-slate-500" numberOfLines={1}>
                  {feed.url}
                </Text>
                <Pressable
                  onPress={() => void subscribe(feed.url, feed.title ?? feed.siteName ?? feed.url)}
                  disabled={subscribingUrl === feed.url}
                  className={`mt-3 self-start ${UI.ghostButton}`}
                >
                  <Text className="text-xs font-semibold text-indigo-200">
                    {subscribingUrl === feed.url ? "Adding…" : "Add"}
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      )}

      {popularFeeds.length > 0 && (
        <View className="gap-2 border-t border-white/10 pt-3">
          <Text className="font-semibold text-white">Popular RSS</Text>
          <Text className="text-sm text-slate-400">
            Ranked by {popularOrigin === "shome" ? "Shome" : "Feedly"} subscriber count.
          </Text>
          {popularFeeds.map((feed) => {
            const subscribed = subscribedFeedUrls.has(feed.url);
            return (
              <View
                key={feed.url}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"
              >
                <Text className="font-semibold text-white">
                  {feed.title ?? feed.siteName ?? feed.url}
                </Text>
                {feed.description && (
                  <Text className="mt-1 text-sm leading-5 text-slate-400">{feed.description}</Text>
                )}
                <Text className="mt-1 text-xs text-slate-500">
                  {feed.subscriberCount.toLocaleString()} {popularOrigin} subscribers
                </Text>
                <Pressable
                  onPress={() => void subscribe(feed.url, feed.title ?? feed.siteName ?? feed.url)}
                  disabled={subscribed || subscribingUrl === feed.url}
                  className={`mt-3 self-start ${UI.ghostButton}`}
                >
                  <Text className="text-xs font-semibold text-indigo-200">
                    {subscribed ? "Added" : subscribingUrl === feed.url ? "Adding…" : "Add"}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      <Pressable onPress={() => void Linking.openURL("https://feedsearch.dev/")}>
        <Text className="text-xs text-slate-500 underline">
          Feed discovery: Feedsearch · Feedly only fills an empty popular list
        </Text>
      </Pressable>
    </View>
  );
}

function AddSourceForm({
  onAdded,
  onError,
}: {
  onAdded: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [kind, setKind] = useState<Kind>("rss");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");
  const [actor, setActor] = useState("");
  const [server, setServer] = useState("");
  const [mastodonMode, setMastodonMode] = useState<"public" | "hashtag">("hashtag");
  const [hashtag, setHashtag] = useState("");
  const [channel, setChannel] = useState("");

  function buildConfig(): Record<string, unknown> {
    if (kind === "rss") return { url };
    if (kind === "bluesky") return { mode: "author", actor };
    if (kind === "mastodon") {
      const config: Record<string, unknown> = { server, mode: mastodonMode };
      if (mastodonMode === "hashtag") config.hashtag = hashtag;
      return config;
    }
    const trimmed = channel.trim();
    return trimmed.startsWith("@") ? { handle: trimmed } : { channelId: trimmed };
  }

  async function submit() {
    setBusy(true);
    try {
      const res = await api.post<{
        source: SourceView;
        fetched?: number;
        refreshError?: string;
      }>("/api/sources", { kind, config: buildConfig() });
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

  const inputClass = UI.input;

  return (
    <View className={`mb-4 gap-3 ${UI.card}`}>
      <View className="flex-row flex-wrap gap-2">
        {(Object.keys(KIND_LABELS) as Kind[]).map((k) => (
          <Pressable
            key={k}
            onPress={() => setKind(k)}
            className={`rounded-xl px-3 py-2 ${
              kind === k ? "bg-white" : "border border-white/10 bg-white/5"
            }`}
          >
            <Text
              className={
                kind === k ? "text-sm font-semibold text-slate-950" : "text-sm text-slate-400"
              }
            >
              {KIND_LABELS[k]}
            </Text>
          </Pressable>
        ))}
      </View>

      {kind === "rss" && (
        <TextInput
          className={inputClass}
          placeholder="https://example.com/feed.xml"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          value={url}
          onChangeText={setUrl}
        />
      )}

      {kind === "bluesky" && (
        <TextInput
          className={inputClass}
          placeholder="alice.bsky.social"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          autoCorrect={false}
          value={actor}
          onChangeText={setActor}
        />
      )}

      {kind === "mastodon" && (
        <>
          <TextInput
            className={inputClass}
            placeholder="mastodon.social"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            autoCorrect={false}
            value={server}
            onChangeText={setServer}
          />
          <View className="flex-row gap-2">
            {(["hashtag", "public"] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setMastodonMode(m)}
                className={`rounded-xl px-3 py-2 ${
                  mastodonMode === m ? "bg-white" : "border border-white/10 bg-white/5"
                }`}
              >
                <Text
                  className={
                    mastodonMode === m
                      ? "text-sm font-semibold text-slate-950"
                      : "text-sm text-slate-400"
                  }
                >
                  {m === "hashtag" ? "hashtag" : "public timeline"}
                </Text>
              </Pressable>
            ))}
          </View>
          {mastodonMode === "hashtag" && (
            <TextInput
              className={inputClass}
              placeholder="photography"
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoCorrect={false}
              value={hashtag}
              onChangeText={setHashtag}
            />
          )}
        </>
      )}

      {kind === "youtube" && (
        <TextInput
          className={inputClass}
          placeholder="@channelhandle or UC… channel id"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          autoCorrect={false}
          value={channel}
          onChangeText={setChannel}
        />
      )}

      <Pressable onPress={submit} disabled={busy} className={`mt-1 self-start ${UI.primaryButton}`}>
        {busy ? (
          <ActivityIndicator size="small" color={COLORS.background} />
        ) : (
          <Text className="text-sm font-semibold text-slate-950">Add source</Text>
        )}
      </Pressable>

      <Text className="text-xs leading-5 text-slate-500">
        Sources that need credentials (Bluesky timeline, Mastodon home) are managed on the web app.
      </Text>
    </View>
  );
}
