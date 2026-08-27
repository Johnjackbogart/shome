import {
  appSpacingPixels,
  type DiscoveredRssFeed,
  type PopularRssFeed,
  type PopularRssResponse,
  type SourceView,
} from "@shome/core";
import { useState } from "react";
import { ActivityIndicator, Linking, Pressable, Text, TextInput, View } from "react-native";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { UI } from "@/lib/ui";

function addedMessage(
  source: SourceView,
  fallback: string,
  fetched: number | undefined,
  refreshError: string | undefined,
): string {
  const name = source.title ?? fallback;
  return refreshError
    ? `added "${name}" — ${refreshError}`
    : `added "${name}" (${fetched ?? 0} items)`;
}

export function RssDiscovery({
  shomeFeeds,
  webFeeds,
  subscribedFeedUrls,
  onAdded,
  onError,
}: {
  shomeFeeds: PopularRssResponse["shomeFeeds"];
  webFeeds: PopularRssResponse["webFeeds"];
  subscribedFeedUrls: Set<string>;
  onAdded: (message: string) => void;
  onError: (message: string) => void;
}) {
  const { appStyle } = useAppStyle();
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
    <View
      className={UI.card}
      style={[appSurfaceAppearance(appStyle), { gap: appSpacingPixels(appStyle.appSpacing) }]}
    >
      <View>
        <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
          Discover RSS
        </Text>
        <Text className="mt-1 text-sm leading-5 text-slate-400" style={appSecondaryText(appStyle)}>
          Search by name or paste a publication, blog, or podcast website—we’ll find its public
          feeds.
        </Text>
      </View>
      <TextInput
        className={UI.input}
        style={{
          backgroundColor: appStyle.appAccentBackgroundColor,
          color: appStyle.appSecondaryTextColor,
        }}
        placeholder="Ars Technica or arstechnica.com"
        placeholderTextColor={appStyle.appSecondaryTextColor}
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
        style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
      >
        {discovering ? (
          <ActivityIndicator size="small" color={appStyle.appAccentFontColor} />
        ) : (
          <Text
            className="text-sm font-normal"
            style={{ color: appStyle.appFontColor, fontFamily: appStyle.appFont }}
          >
            Find feeds
          </Text>
        )}
      </Pressable>

      {feeds && (
        <View
          className="border-t border-white/10 pt-3"
          style={{ gap: appSpacingPixels(appStyle.appSpacing) }}
        >
          {feeds.length === 0 ? (
            <Text className="text-sm" style={appSecondaryText(appStyle)}>
              No public RSS or Atom feed found for that site.
            </Text>
          ) : (
            feeds.map((feed) => {
              const subscribed = subscribedFeedUrls.has(feed.url);
              const subscribing = subscribingUrl === feed.url;
              return (
                <View
                  key={feed.url}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"
                >
                  <Text className="font-semibold" style={appPrimaryText(appStyle)}>
                    {feed.title ?? feed.siteName ?? feed.url}
                    {feed.isPodcast ? " · podcast" : ""}
                  </Text>
                  {feed.description && (
                    <Text className="mt-1 text-sm leading-5" style={appSecondaryText(appStyle)}>
                      {feed.description}
                    </Text>
                  )}
                  <Text className="mt-1 text-xs" style={appSecondaryText(appStyle)} numberOfLines={1}>
                    {feed.url}
                  </Text>
                  <Pressable
                    onPress={() =>
                      void subscribe(feed.url, feed.title ?? feed.siteName ?? feed.url)
                    }
                    disabled={subscribed || subscribing}
                    className={`mt-3 self-start ${UI.ghostButton}`}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: appStyle.appAccentFontColor, fontFamily: appStyle.appFont }}
                    >
                      {subscribed ? "Added" : subscribing ? "Adding…" : "Add"}
                    </Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      )}

      <View className="gap-2 border-t border-white/10 pt-3">
        <Text className="font-semibold" style={appPrimaryText(appStyle)}>
          Popular on Shome
        </Text>
        <Text className="text-sm" style={appSecondaryText(appStyle)}>
          Ranked by aggregate Shome subscriptions.
        </Text>
        {shomeFeeds.length === 0 ? (
          <Text className="text-sm" style={appSecondaryText(appStyle)}>
            This community has not followed any RSS sources yet.
          </Text>
        ) : (
          <PopularFeedList
            feeds={shomeFeeds}
            subscriberLabel="Shome subscribers"
            subscribedFeedUrls={subscribedFeedUrls}
            subscribingUrl={subscribingUrl}
            onAdd={subscribe}
          />
        )}
      </View>

      <View className="gap-2 border-t border-white/10 pt-3">
        <Text className="font-semibold" style={appPrimaryText(appStyle)}>
          Popular across the web
        </Text>
        <Text className="text-sm" style={appSecondaryText(appStyle)}>
          From Feedly’s public source directory.
        </Text>
        {webFeeds.length === 0 ? (
          <Text className="text-sm" style={appSecondaryText(appStyle)}>
            Web recommendations are unavailable right now.
          </Text>
        ) : (
          <PopularFeedList
            feeds={webFeeds}
            subscriberLabel="Feedly subscribers"
            subscribedFeedUrls={subscribedFeedUrls}
            subscribingUrl={subscribingUrl}
            onAdd={subscribe}
          />
        )}
      </View>

      <Pressable onPress={() => void Linking.openURL("https://feedsearch.dev/")}>
        <Text className="text-xs underline" style={appSecondaryText(appStyle)}>
          Feed discovery: Feedsearch · Feedly supplies the Popular across the web list
        </Text>
      </Pressable>
    </View>
  );
}

function PopularFeedList({
  feeds,
  subscriberLabel,
  subscribedFeedUrls,
  subscribingUrl,
  onAdd,
}: {
  feeds: PopularRssFeed[];
  subscriberLabel: string;
  subscribedFeedUrls: Set<string>;
  subscribingUrl: string | null;
  onAdd: (url: string, fallback: string) => Promise<void>;
}) {
  const { appStyle } = useAppStyle();

  return (
    <View style={{ gap: appSpacingPixels(appStyle.appSpacing) }}>
      {feeds.map((feed) => {
        const subscribed = subscribedFeedUrls.has(feed.url);
        const subscribing = subscribingUrl === feed.url;
        return (
          <View key={feed.url} className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
            <Text className="font-semibold" style={appPrimaryText(appStyle)}>
              {feed.title ?? feed.siteName ?? feed.url}
            </Text>
            {feed.description && (
              <Text className="mt-1 text-sm leading-5" style={appSecondaryText(appStyle)}>
                {feed.description}
              </Text>
            )}
            <Text className="mt-1 text-xs" style={appSecondaryText(appStyle)}>
              {feed.subscriberCount.toLocaleString()} {subscriberLabel}
            </Text>
            <Pressable
              onPress={() => void onAdd(feed.url, feed.title ?? feed.siteName ?? feed.url)}
              disabled={subscribed || subscribing}
              className={`mt-3 self-start ${UI.ghostButton}`}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: appStyle.appAccentFontColor, fontFamily: appStyle.appFont }}
              >
                {subscribed ? "Added" : subscribing ? "Adding…" : "Add"}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
