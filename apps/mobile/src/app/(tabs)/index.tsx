import { Ionicons } from "@expo/vector-icons";
import { appSpacingPixels, type FeedItemView, type SourceView } from "@shome/core";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedItemCard } from "@/components/feed-item-card";
import { PostComposer } from "@/components/post-composer";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { sourceLabel } from "@/lib/format";
import { COLORS, UI } from "@/lib/ui";

// Kept in step with the web feed's filter menu, and with the kinds the feed
// route accepts.
const KINDS = ["post", "rss", "bluesky", "mastodon", "youtube"];

export default function FeedScreen() {
  const { appStyle } = useAppStyle();
  const [items, setItems] = useState<FeedItemView[] | null>(null);
  const [sources, setSources] = useState<SourceView[]>([]);
  const [sourcesError, setSourcesError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [composerVisible, setComposerVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [q, setQ] = useState("");
  const [appliedQ, setAppliedQ] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [kind, setKind] = useState("");
  // Filters change faster than the network answers; only the newest request
  // is allowed to write to state.
  const latestRequest = useRef(0);
  const refreshedOnMount = useRef(false);

  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (appliedQ) params.set("q", appliedQ);
      if (kind) params.set("kind", kind);
      if (sourceId) params.set("sourceId", sourceId);
      const res = await api.get<{ items: FeedItemView[] }>(`/api/feed?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(res.items);
      setError(null);
    } catch (err) {
      if (requestId === latestRequest.current) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }
  }, [appliedQ, kind, sourceId]);

  useEffect(() => {
    void load();
  }, [load]);

  const loadSources = useCallback(async () => {
    try {
      const res = await api.get<{ sources: SourceView[] }>("/api/sources");
      setSources(res.sources);
      setSourcesError(null);
    } catch (err) {
      // The feed itself does not need this list, so a failure must not break
      // it — but the filter sheet says so rather than looking sourceless.
      setSourcesError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void loadSources();
  }, [loadSources]);

  // Sources are added on another tab, which leaves this screen mounted and its
  // copy of the list stale. Re-read it each time the sheet opens.
  useEffect(() => {
    if (filtersVisible) void loadSources();
  }, [filtersVisible, loadSources]);

  async function onPullRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  const fetchNew = useCallback(async () => {
    setFetching(true);
    try {
      await api.post("/api/refresh");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setFetching(false);
    }
  }, [load]);

  // Pull every source once when the screen first opens, as the web feed does.
  // The load above has already painted what is stored, so this only fills in
  // what arrived since; the ref keeps a re-render or a filter change from
  // starting it again.
  useEffect(() => {
    if (refreshedOnMount.current) return;
    refreshedOnMount.current = true;
    void fetchNew();
  }, [fetchNew]);

  function clearFilters() {
    setQ("");
    setAppliedQ("");
    setSourceId("");
    setKind("");
  }

  const filtered = Boolean(appliedQ || sourceId || kind);
  const activeCount = (sourceId ? 1 : 0) + (kind ? 1 : 0);
  const selectedSource = sources.find((source) => source.id === sourceId);
  const renderFeedSeparator = useCallback(
    () => <View style={{ height: appSpacingPixels(appStyle.appSpacing) }} />,
    [appStyle.appSpacing],
  );

  return (
    <SafeAreaView
      className={UI.screen}
      style={{ backgroundColor: appStyle.appBackgroundColor }}
      edges={["top"]}
    >
      <View className="flex-1" style={{ gap: appSpacingPixels(appStyle.appSpacing) }}>
        <View className="flex-row items-end justify-between px-5 pt-2">
          <View>
            <Text className={UI.eyebrow} style={appSecondaryText(appStyle)}>
              Your daily mix
            </Text>
            <Text
              className="mt-2 text-3xl font-semibold text-white"
              style={appPrimaryText(appStyle)}
            >
              Your feed
            </Text>
          </View>
          <Pressable
            onPress={fetchNew}
            disabled={fetching}
            className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 active:opacity-70"
          >
            {fetching ? (
              <ActivityIndicator size="small" color={appStyle.appAccentFontColor} />
            ) : (
              <Text
                className="text-sm font-medium text-indigo-200"
                style={{
                  color: appStyle.appAccentFontColor,
                  fontFamily: appStyle.appFont,
                }}
              >
                Fetch new
              </Text>
            )}
          </Pressable>
        </View>

        <View className="flex-row items-center gap-2 px-5">
          <TextInput
            className={`flex-1 ${UI.input}`}
            style={{
              backgroundColor: appStyle.appAccentBackgroundColor,
              color: appStyle.appSecondaryTextColor,
            }}
            value={q}
            onChangeText={setQ}
            placeholder="search your feed…"
            placeholderTextColor={appStyle.appSecondaryTextColor}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
            onSubmitEditing={() => setAppliedQ(q.trim())}
            accessibilityLabel="Search your feed"
          />
          <Pressable
            onPress={() => setAppliedQ(q.trim())}
            className="rounded-xl bg-indigo-300 px-4 py-3 active:opacity-80"
            style={{ backgroundColor: appStyle.appBackgroundColor }}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search" size={18} color={appStyle.appFontColor} />
          </Pressable>
          <Pressable
            onPress={() => setFiltersVisible(true)}
            className="flex-row items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Filters"
          >
            <Ionicons name="options-outline" size={18} color={appStyle.appAccentFontColor} />
            {activeCount > 0 && (
              <Text className="rounded-full bg-indigo-300 px-1.5 text-xs font-semibold text-slate-950">
                {activeCount}
              </Text>
            )}
          </Pressable>
        </View>

        {filtered && (
          <View className="flex-row items-center gap-3 px-5">
            <Text
              className="shrink text-sm text-slate-400"
              style={appSecondaryText(appStyle)}
              numberOfLines={1}
            >
              {items === null
                ? "searching"
                : `${items.length} ${items.length === 1 ? "item" : "items"}`}
              {appliedQ && ` matching “${appliedQ}”`}
              {selectedSource && ` from ${sourceLabel(selectedSource)}`}
              {kind && ` in ${kind}`}
            </Text>
            <Pressable onPress={clearFilters} accessibilityRole="button">
              <Text className="text-sm font-medium text-indigo-200">Clear</Text>
            </Pressable>
          </View>
        )}

        {error && <Text className="px-5 text-sm text-rose-300">{error}</Text>}

        {items === null ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color={COLORS.accent} />
          </View>
        ) : (
          <FlatList
            className="flex-1"
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FeedItemCard item={item} />}
            ItemSeparatorComponent={renderFeedSeparator}
            contentContainerClassName="px-5 pb-28"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onPullRefresh}
                tintColor={COLORS.accent}
              />
            }
            ListEmptyComponent={
              <View className={`${UI.card} items-center`} style={appSurfaceAppearance(appStyle)}>
                <Text className="text-base font-medium text-white" style={appPrimaryText(appStyle)}>
                  {filtered ? "No items match these filters." : "Nothing here yet."}
                </Text>
                <Text
                  className="mt-2 text-center text-sm leading-5 text-slate-400"
                  style={appSecondaryText(appStyle)}
                >
                  {filtered
                    ? "Try a different search, or clear the filters above."
                    : "Add a source in the Sources tab to make this space yours."}
                </Text>
              </View>
            }
          />
        )}
      </View>

      <Pressable
        onPress={() => setComposerVisible(true)}
        className="absolute right-5 bottom-5 flex-row items-center gap-2 rounded-full bg-indigo-300 px-5 py-4 shadow-lg shadow-black/40 active:opacity-80"
        style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
        accessibilityRole="button"
        accessibilityLabel="Create post"
      >
        <Ionicons name="add" size={22} color={appStyle.appFontColor} />
        <Text
          className="font-semibold text-slate-950"
          style={{ color: appStyle.appFontColor, fontFamily: appStyle.appFont }}
        >
          Create post
        </Text>
      </Pressable>

      <Modal
        visible={filtersVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltersVisible(false)}
      >
        {/* Tapping the dimmed area behind the sheet dismisses it, the gesture
            people expect from a bottom sheet on both platforms. */}
        <Pressable
          className="flex-1 bg-black/60"
          onPress={() => setFiltersVisible(false)}
          accessibilityLabel="Close filters"
        />
        <SafeAreaView style={{ backgroundColor: appStyle.appBackgroundColor }} edges={["bottom"]}>
          <View
            className="max-h-[70vh] rounded-t-3xl border-t px-5 pt-4 pb-2"
            style={{
              backgroundColor: appStyle.appBackgroundColor,
              borderColor: appStyle.appBorderStyle,
            }}
          >
            <View className="flex-row items-center justify-between pb-2">
              <Text className="text-lg font-semibold text-white">Filters</Text>
              <Pressable
                onPress={() => setFiltersVisible(false)}
                className="rounded-full p-2 active:bg-white/10"
                accessibilityRole="button"
                accessibilityLabel="Close filters"
              >
                <Ionicons name="close" size={22} color={COLORS.muted} />
              </Pressable>
            </View>

            <ScrollView contentContainerClassName="pb-2">
              <Text className={`pt-2 pb-1 ${UI.eyebrow}`}>Source</Text>
              <FilterOption
                label="All sources"
                selected={sourceId === ""}
                onPress={() => setSourceId("")}
              />
              {sources.map((source) => (
                <FilterOption
                  key={source.id}
                  label={sourceLabel(source)}
                  selected={sourceId === source.id}
                  onPress={() => setSourceId(source.id)}
                />
              ))}
              {sources.length === 0 && (
                <Text className="px-2 py-3 text-sm text-slate-500">
                  {sourcesError
                    ? `Could not load your sources: ${sourcesError}`
                    : "No sources yet — add one in the Sources tab."}
                </Text>
              )}

              <Text className={`pt-3 pb-1 ${UI.eyebrow}`}>Kind</Text>
              <FilterOption label="All kinds" selected={kind === ""} onPress={() => setKind("")} />
              {KINDS.map((k) => (
                <FilterOption key={k} label={k} selected={kind === k} onPress={() => setKind(k)} />
              ))}
            </ScrollView>

            <Pressable
              onPress={() => {
                clearFilters();
                setFiltersVisible(false);
              }}
              className="mt-1 border-t border-white/10 py-3 active:opacity-70"
              accessibilityRole="button"
            >
              <Text
                className="text-sm font-medium text-indigo-200"
                style={{
                  color: appStyle.appAccentFontColor,
                  fontFamily: appStyle.appFont,
                }}
              >
                Clear all filters
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={composerVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setComposerVisible(false)}
      >
        <SafeAreaView
          className={UI.screen}
          style={{ backgroundColor: appStyle.appBackgroundColor }}
          edges={["top", "bottom"]}
        >
          <View className="flex-row items-center justify-end px-5 pt-2 pb-3">
            <Pressable
              onPress={() => setComposerVisible(false)}
              className="rounded-full p-2 active:bg-white/10"
              accessibilityRole="button"
              accessibilityLabel="Close post composer"
            >
              <Ionicons name="close" size={24} color={COLORS.muted} />
            </Pressable>
          </View>
          <ScrollView contentContainerClassName="px-5 pb-8" keyboardShouldPersistTaps="handled">
            <PostComposer
              onPosted={(post) => {
                setItems((current) => [post, ...(current ?? [])]);
                // Drop the filters so the new post is not hidden by them.
                clearFilters();
              }}
              onSuccess={() => setComposerVisible(false)}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function FilterOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between gap-3 rounded-xl px-2 py-3 active:bg-white/5"
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Text
        numberOfLines={1}
        className={selected ? "shrink font-medium text-white" : "shrink text-slate-300"}
      >
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={18} color={COLORS.accent} />}
    </Pressable>
  );
}
