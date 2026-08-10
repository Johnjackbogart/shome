import type { FeedItemView } from "@shome/core";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { htmlToText, timeAgo } from "@/lib/format";

const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function FeedItemCard({ item }: { item: FeedItemView }) {
  const body = item.text ?? (item.html ? htmlToText(item.html) : null);
  const image = item.media.find((m) => m.type === "image");
  const author = item.authorName ?? item.authorHandle;

  return (
    <Pressable
      onPress={item.url ? () => WebBrowser.openBrowserAsync(item.url as string) : undefined}
      className="mb-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 active:opacity-80"
    >
      <View className="mb-1.5 flex-row flex-wrap items-center gap-2">
        <Text
          className={`text-xs font-semibold uppercase ${KIND_COLORS[item.sourceKind] ?? "text-zinc-400"}`}
        >
          {item.sourceKind}
        </Text>
        {item.sourceTitle && (
          <Text className="shrink text-xs text-zinc-400" numberOfLines={1}>
            {item.sourceTitle}
          </Text>
        )}
        <Text className="text-xs text-zinc-500">{timeAgo(item.publishedAt ?? item.fetchedAt)}</Text>
      </View>

      {item.title && (
        <Text className="mb-1 text-base font-semibold text-zinc-100">{item.title}</Text>
      )}
      {author && <Text className="mb-1 text-xs text-zinc-400">{author}</Text>}
      {body ? (
        <Text className="text-sm leading-5 text-zinc-300" numberOfLines={8}>
          {body}
        </Text>
      ) : null}

      {image && (
        <Image
          source={{ uri: image.url }}
          contentFit="cover"
          transition={150}
          accessibilityLabel={image.alt}
          style={{ width: "100%", height: 180, borderRadius: 12, marginTop: 8 }}
        />
      )}
    </Pressable>
  );
}
