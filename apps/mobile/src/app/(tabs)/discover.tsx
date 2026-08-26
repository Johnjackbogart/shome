import type { PopularRssFeed, PopularRssResponse, SourceView } from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RssDiscovery } from "@/components/rss-discovery";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { COLORS, UI } from "@/lib/ui";

export default function DiscoverScreen() {
  const { appStyle } = useAppStyle();
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [shomeFeeds, setShomeFeeds] = useState<PopularRssFeed[]>([]);
  const [webFeeds, setWebFeeds] = useState<PopularRssFeed[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const [sourceResult, popularResult] = await Promise.all([
        api.get<{ sources: SourceView[] }>("/api/sources"),
        api.get<PopularRssResponse>("/api/discover/rss/popular").catch(() => null),
      ]);
      setSources(sourceResult.sources);
      setShomeFeeds(popularResult?.shomeFeeds ?? []);
      setWebFeeds(popularResult?.webFeeds ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  const subscribedFeedUrls = new Set(
    (sources ?? []).flatMap((source) =>
      typeof source.config.url === "string" ? [source.config.url] : [],
    ),
  );

  return (
    <SafeAreaView
      className={UI.screen}
      style={{ backgroundColor: appStyle.appBackgroundColor }}
      edges={["top"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
        }
      >
        <Text className={`pb-2 pt-2 ${UI.eyebrow}`} style={appSecondaryText(appStyle)}>
          Find your next source
        </Text>
        <Text className="pb-2 text-3xl font-semibold text-white" style={appPrimaryText(appStyle)}>
          Discover
        </Text>
        <Text
          className="pb-5 text-base leading-6 text-slate-400"
          style={appSecondaryText(appStyle)}
        >
          Search for worthwhile publications and add the ones you want to keep up with.
        </Text>

        <View className="mb-3 flex-row items-center gap-2">
          <Text className="rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase text-orange-300">
            RSS
          </Text>
          <Text className="text-lg font-semibold text-white">
            Publications, blogs, and podcasts
          </Text>
        </View>
        <RssDiscovery
          shomeFeeds={shomeFeeds}
          webFeeds={webFeeds}
          subscribedFeedUrls={subscribedFeedUrls}
          onAdded={(message) => {
            setNotice(message);
            setError(null);
            void load();
          }}
          onError={(message) => {
            setNotice(null);
            setError(message);
          }}
        />
        {notice && <Text className="pb-3 text-sm text-emerald-300">{notice}</Text>}
        {error && <Text className="pb-3 text-sm text-rose-300">{error}</Text>}

        <View className={`mb-3 gap-2 ${UI.card}`} style={appSurfaceAppearance(appStyle)}>
          <Text className="self-start rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase text-sky-300">
            Bluesky
          </Text>
          <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
            People search is next
          </Text>
          <Text className="text-sm leading-5 text-slate-400" style={appSecondaryText(appStyle)}>
            Search public profiles by handle or display name, then follow an author in your feed.
          </Text>
        </View>
        <View className={`gap-2 ${UI.card}`} style={appSurfaceAppearance(appStyle)}>
          <Text className="self-start rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase text-violet-300">
            Mastodon
          </Text>
          <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
            Search within an instance
          </Text>
          <Text className="text-sm leading-5 text-slate-400" style={appSecondaryText(appStyle)}>
            Mastodon discovery will begin with an instance, so results always make their local scope
            clear.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
