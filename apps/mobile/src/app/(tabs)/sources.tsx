import type { SourceView } from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/lib/api";
import { timeAgo } from "@/lib/format";

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
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api.get<{ sources: SourceView[] }>("/api/sources");
      setSources(res.sources);
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
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["top"]}>
      <FlatList
        data={sources ?? []}
        keyExtractor={(source) => source.id}
        contentContainerClassName="px-4 pb-6"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} tintColor="#7aa5ff" />
        }
        ListHeaderComponent={
          <View>
            <Text className="pb-2 pt-1 text-2xl font-bold text-zinc-100">Sources</Text>
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
            {notice && <Text className="pb-2 text-sm text-emerald-400">{notice}</Text>}
            {error && <Text className="pb-2 text-sm text-red-400">{error}</Text>}
            {sources !== null && sources.length === 0 && (
              <Text className="mt-4 text-zinc-400">No sources yet — add one above.</Text>
            )}
          </View>
        }
        renderItem={({ item: source }) => (
          <View className="mb-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <View className="flex-row flex-wrap items-center gap-2">
              <Text
                className={`text-xs font-semibold uppercase ${KIND_COLORS[source.kind] ?? "text-zinc-400"}`}
              >
                {source.kind}
              </Text>
              <Text className="shrink font-semibold text-zinc-100" numberOfLines={1}>
                {source.title ?? describeConfig(source)}
              </Text>
            </View>
            <Text className="mt-0.5 text-xs text-zinc-500">
              {source.lastFetchedAt ? `fetched ${timeAgo(source.lastFetchedAt)}` : "never fetched"}
            </Text>
            {source.lastError && (
              <Text className="mt-0.5 text-xs text-red-400">{source.lastError}</Text>
            )}
            <View className="mt-2 flex-row gap-2">
              <Pressable
                onPress={() => void refreshSource(source.id)}
                className="rounded-full border border-zinc-800 px-3 py-1 active:opacity-70"
              >
                <Text className="text-xs text-accent">refresh</Text>
              </Pressable>
              <Pressable
                onPress={() => void removeSource(source.id)}
                className="rounded-full border border-zinc-800 px-3 py-1 active:opacity-70"
              >
                <Text className="text-xs text-red-400">remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
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

  const inputClass = "rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-zinc-100";

  return (
    <View className="mb-3 gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
      <View className="flex-row flex-wrap gap-2">
        {(Object.keys(KIND_LABELS) as Kind[]).map((k) => (
          <Pressable
            key={k}
            onPress={() => setKind(k)}
            className={`rounded-full px-3 py-1.5 ${kind === k ? "bg-accent/20" : "border border-zinc-800"}`}
          >
            <Text
              className={kind === k ? "text-sm font-semibold text-accent" : "text-sm text-zinc-400"}
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
          placeholderTextColor="#71717a"
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
          placeholderTextColor="#71717a"
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
            placeholderTextColor="#71717a"
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
                className={`rounded-full px-3 py-1.5 ${mastodonMode === m ? "bg-accent/20" : "border border-zinc-800"}`}
              >
                <Text
                  className={
                    mastodonMode === m
                      ? "text-sm font-semibold text-accent"
                      : "text-sm text-zinc-400"
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
              placeholderTextColor="#71717a"
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
          placeholderTextColor="#71717a"
          autoCapitalize="none"
          autoCorrect={false}
          value={channel}
          onChangeText={setChannel}
        />
      )}

      <Pressable
        onPress={submit}
        disabled={busy}
        className="mt-1 items-center self-start rounded-full bg-accent px-4 py-2 active:opacity-80"
      >
        {busy ? (
          <ActivityIndicator size="small" color="#09090b" />
        ) : (
          <Text className="text-sm font-semibold text-zinc-950">add source</Text>
        )}
      </Pressable>

      <Text className="text-xs text-zinc-500">
        Sources that need credentials (Bluesky timeline, Mastodon home) are managed on the web app.
      </Text>
    </View>
  );
}
