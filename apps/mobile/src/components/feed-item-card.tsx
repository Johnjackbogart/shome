import type { FeedItemView } from "@shome/core";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { htmlToText, timeAgo } from "@/lib/format";
import { UI } from "@/lib/ui";

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
      className={`mb-3 ${UI.card} active:opacity-80`}
    >
      <View className="mb-1.5 flex-row flex-wrap items-center gap-2">
        <Text
          className={`rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase ${
            KIND_COLORS[item.sourceKind] ?? "text-slate-400"
          }`}
        >
          {item.sourceKind}
        </Text>
        {item.sourceTitle && (
          <Text className="shrink text-xs text-slate-400" numberOfLines={1}>
            {item.sourceTitle}
          </Text>
        )}
        <Text className="text-xs text-slate-500">
          {timeAgo(item.publishedAt ?? item.fetchedAt)}
        </Text>
      </View>

      {item.title && <Text className="mb-1 text-base font-semibold text-white">{item.title}</Text>}
      {author && <Text className="mb-1 text-xs text-slate-400">{author}</Text>}
      {body ? (
        <Text className="text-sm leading-5 text-slate-300" numberOfLines={8}>
          {body}
        </Text>
      ) : null}

      {image && (
        <Image
          source={{ uri: image.url }}
          contentFit="cover"
          transition={150}
          accessibilityLabel={image.alt}
          style={{ width: "100%", height: 180, borderRadius: 16, marginTop: 12 }}
        />
      )}
    </Pressable>
  );
}
