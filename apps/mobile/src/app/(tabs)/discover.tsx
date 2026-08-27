import {
  appSpacingPixels,
  type PopularRssFeed,
  type PopularRssResponse,
  type SourceView,
} from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeopleDiscovery } from "@/components/people-discovery";
import { RssDiscovery } from "@/components/rss-discovery";
import { api } from "@/lib/api";
import { appPrimaryText, useAppStyle } from "@/lib/app-style";
import { UI } from "@/lib/ui";

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
        contentContainerStyle={{ gap: appSpacingPixels(appStyle.appSpacing) }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={appStyle.appAccentFontColor}
          />
        }
      >
        <PeopleDiscovery />
        <View className="flex-row items-center gap-2">
          <Text
            className="rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase"
            style={{ color: appStyle.appAccentFontColor, fontFamily: appStyle.appFont }}
          >
            RSS
          </Text>
          <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
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
        {notice && <Text className="text-sm text-emerald-300">{notice}</Text>}
        {error && <Text className="text-sm text-rose-300">{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
