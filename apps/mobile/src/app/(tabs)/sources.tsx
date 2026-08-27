import { appSpacingPixels, type SourceView } from "@shome/core";
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
import { KindBadge } from "@/components/kind-badge";
import { api } from "@/lib/api";
import {
  appBorderAppearance,
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { originalSourceLabel, SOURCE_FETCH_ERROR, sourceLabel, timeAgo } from "@/lib/format";
import { COLORS, UI } from "@/lib/ui";

type Kind = "rss" | "bluesky" | "mastodon" | "youtube";

const KIND_LABELS: Record<Kind, string> = {
  rss: "RSS",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  youtube: "YouTube",
};

export default function SourcesScreen() {
  const { appStyle } = useAppStyle();
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

  return (
    <SafeAreaView
      className={UI.screen}
      style={{ backgroundColor: appStyle.appBackgroundColor }}
      edges={["top"]}
    >
      <FlatList
        data={sources ?? []}
        keyExtractor={(source) => source.id}
        contentContainerClassName="px-5 pb-8"
        contentContainerStyle={{ gap: appSpacingPixels(appStyle.appSpacing) }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onPullRefresh}
            tintColor={COLORS.accent}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: appSpacingPixels(appStyle.appSpacing) }}>
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
            {notice && <Text className="text-sm text-emerald-300">{notice}</Text>}
            {error && <Text className="text-sm text-rose-300">{error}</Text>}
            {sources !== null && sources.length === 0 && (
              <Text className="text-slate-400">No sources yet — add one above.</Text>
            )}
          </View>
        }
        renderItem={({ item: source }) => (
          <SourceRow
            source={source}
            onRename={(title) => renameSource(source.id, title)}
            onRefresh={() => void refreshSource(source.id)}
            onRemove={() => void removeSource(source.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

function SourceRow({
  source,
  onRename,
  onRefresh,
  onRemove,
}: {
  source: SourceView;
  onRename: (customTitle: string | null) => Promise<void>;
  onRefresh: () => void;
  onRemove: () => void;
}) {
  const { appStyle } = useAppStyle();
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

  async function save() {
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

  if (editing) {
    return (
      <View className={`gap-3 px-4 py-4 ${UI.card}`} style={appSurfaceAppearance(appStyle)}>
        <TextInput
          className={UI.input}
          style={[
            appBorderAppearance(appStyle),
            {
              backgroundColor: appStyle.appAccentBackgroundColor,
              color: appStyle.appSecondaryTextColor,
            },
          ]}
          value={draft}
          onChangeText={setDraft}
          placeholder={original}
          placeholderTextColor={appStyle.appSecondaryTextColor}
          maxLength={200}
          autoFocus
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => void save()}
          accessibilityLabel={`Name for ${original}`}
        />
        <Text className="text-xs leading-5 text-slate-500">
          {source.customTitle
            ? `Clear the box to go back to "${original}".`
            : "Only you see this name."}
        </Text>
        {error && <Text className="text-xs text-rose-300">{error}</Text>}
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => void save()}
            disabled={busy}
            className="border bg-indigo-300 px-3 py-2 active:opacity-80"
            style={appBorderAppearance(appStyle)}
          >
            {busy ? (
              <ActivityIndicator size="small" color={COLORS.background} />
            ) : (
              <Text className="text-xs font-semibold text-slate-950">Save</Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => setEditing(false)}
            className="border border-white/10 bg-white/5 px-3 py-2 active:opacity-70"
            style={appBorderAppearance(appStyle)}
          >
            <Text className="text-xs font-medium text-slate-300">Cancel</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className={`px-4 py-4 ${UI.card}`} style={appSurfaceAppearance(appStyle)}>
      <View className="flex-row flex-wrap items-center gap-2">
        <KindBadge kind={source.kind} />
        <Text className="shrink font-semibold" style={appPrimaryText(appStyle)} numberOfLines={1}>
          {sourceLabel(source)}
        </Text>
      </View>
      {source.customTitle && (
        <Text className="mt-1 text-xs text-slate-500" numberOfLines={1}>
          originally “{original}”
        </Text>
      )}
      <Text className="mt-1 text-xs text-slate-500">
        {source.lastFetchedAt ? `fetched ${timeAgo(source.lastFetchedAt)}` : "never fetched"}
      </Text>
      {source.lastError ? (
        <Text className="mt-1 text-xs text-rose-300">{SOURCE_FETCH_ERROR}</Text>
      ) : null}
      <View className="mt-3 flex-row gap-2">
        <Pressable
          onPress={startEditing}
          className="border border-white/10 bg-white/5 px-3 py-2 active:opacity-70"
          style={appBorderAppearance(appStyle)}
        >
          <Text className="text-xs font-medium" style={appSecondaryText(appStyle)}>
            Rename
          </Text>
        </Pressable>
        <Pressable
          onPress={onRefresh}
          className="border border-white/10 bg-white/5 px-3 py-2 active:opacity-70"
          style={appBorderAppearance(appStyle)}
        >
          <Text className="text-xs font-medium" style={appSecondaryText(appStyle)}>
            Refresh
          </Text>
        </Pressable>
        <Pressable
          onPress={onRemove}
          className="border border-rose-300/15 px-3 py-2 active:opacity-70"
          style={[appBorderAppearance(appStyle), { backgroundColor: appStyle.appBackgroundColor }]}
        >
          <Text className="text-xs font-medium" style={appSecondaryText(appStyle)}>
            Remove
          </Text>
        </Pressable>
      </View>
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
  const { appStyle } = useAppStyle();
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

  const inputClass = UI.input;
  const inputStyle = [
    appBorderAppearance(appStyle),
    {
      backgroundColor: appStyle.appAccentBackgroundColor,
      color: appStyle.appSecondaryTextColor,
    },
  ];

  return (
    <View className={`gap-3 ${UI.card}`} style={appSurfaceAppearance(appStyle)}>
      <View className="flex-row flex-wrap gap-2">
        {(Object.keys(KIND_LABELS) as Kind[]).map((k) => (
          <Pressable
            key={k}
            onPress={() => setKind(k)}
            className={`border px-3 py-2 ${kind === k ? "" : "border-white/10 bg-white/5"}`}
            style={[
              appBorderAppearance(appStyle),
              kind === k ? { backgroundColor: appStyle.appAccentBackgroundColor } : null,
            ]}
          >
            <Text
              className="text-sm font-semibold"
              style={appSecondaryText(appStyle)}
            >
              {KIND_LABELS[k]}
            </Text>
          </Pressable>
        ))}
      </View>

      {kind === "rss" && (
        <TextInput
          className={inputClass}
          style={inputStyle}
          placeholder="https://example.com/feed.xml"
          placeholderTextColor={appStyle.appSecondaryTextColor}
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
          style={inputStyle}
          placeholder="alice.bsky.social"
          placeholderTextColor={appStyle.appSecondaryTextColor}
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
            style={inputStyle}
            placeholder="mastodon.social"
            placeholderTextColor={appStyle.appSecondaryTextColor}
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
                className={`border px-3 py-2 ${
                  mastodonMode === m ? "" : "border-white/10 bg-white/5"
                }`}
                style={[
                  appBorderAppearance(appStyle),
                  mastodonMode === m
                    ? { backgroundColor: appStyle.appAccentBackgroundColor }
                    : null,
                ]}
              >
                <Text
                  className="text-sm font-semibold"
                  style={appSecondaryText(appStyle)}
                >
                  {m === "hashtag" ? "hashtag" : "public timeline"}
                </Text>
              </Pressable>
            ))}
          </View>
          {mastodonMode === "hashtag" && (
            <TextInput
              className={inputClass}
              style={inputStyle}
              placeholder="photography"
              placeholderTextColor={appStyle.appSecondaryTextColor}
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
          style={inputStyle}
          placeholder="@channelhandle or UC… channel id"
          placeholderTextColor={appStyle.appSecondaryTextColor}
          autoCapitalize="none"
          autoCorrect={false}
          value={channel}
          onChangeText={setChannel}
        />
      )}

      <Pressable
        onPress={submit}
        disabled={busy}
        className={`mt-1 self-start border ${UI.primaryButton}`}
        style={[
          appBorderAppearance(appStyle),
          { backgroundColor: appStyle.appAccentBackgroundColor },
        ]}
      >
        {busy ? (
          <ActivityIndicator size="small" color={COLORS.background} />
        ) : (
          <Text className="text-sm font-semibold" style={appSecondaryText(appStyle)}>
            Add source
          </Text>
        )}
      </Pressable>

      <Text className="text-xs leading-5 text-slate-500">
        Sources that need credentials (Bluesky timeline, Mastodon home) are managed on the web app.
      </Text>
    </View>
  );
}
