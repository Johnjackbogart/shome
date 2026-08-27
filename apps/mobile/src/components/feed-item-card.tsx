import type { FeedItemView } from "@shome/core";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { useAppStyle } from "@/lib/app-style";
import { apiUrl } from "@/lib/config";
import { timeAgo } from "@/lib/format";
import { UI } from "@/lib/ui";

const KIND_COLORS: Record<string, string> = {
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function FeedItemCard({ item }: { item: FeedItemView }) {
  const { appStyle } = useAppStyle();
  const body = item.text;
  const image = item.media.find((m) => m.type === "image");
  const video = item.media.find((m) => m.type === "video");
  const authorName = item.authorName;
  const hasCustomStyle =
    item.sourceKind === "post" &&
    Boolean(
      item.postBorderStyle ||
        item.postBorderRadius ||
        item.postBorderLineStyle ||
        item.postBackgroundColor ||
        item.postFont ||
        item.postFontColor ||
        item.postSecondaryTextColor,
    );
  const appOverridesPost = item.sourceKind === "post" && appStyle.appOverridePostStyles;
  const usesAppStyle = !hasCustomStyle || appOverridesPost;
  const postTextStyle = usesAppStyle
    ? { color: appStyle.appFontColor, fontFamily: appStyle.appFont }
    : { color: item.postFontColor ?? undefined, fontFamily: item.postFont ?? undefined };
  const postSecondaryTextStyle = usesAppStyle
    ? { color: appStyle.appSecondaryTextColor, fontFamily: appStyle.appFont }
    : {
        color: item.postSecondaryTextColor ?? item.postFontColor ?? undefined,
        fontFamily: item.postFont ?? undefined,
      };
  const postCardStyle =
    hasCustomStyle || appOverridesPost
      ? {
          borderColor: appOverridesPost
            ? appStyle.appBorderStyle
            : (item.postBorderStyle ?? undefined),
          borderRadius: appOverridesPost
            ? Number.parseInt(appStyle.appBorderRadius, 10)
            : item.postBorderRadius
              ? Number.parseInt(item.postBorderRadius, 10)
              : undefined,
          borderStyle: appOverridesPost
            ? appStyle.appBorderLineStyle
            : (item.postBorderLineStyle ?? undefined),
          backgroundColor: appOverridesPost
            ? appStyle.appSecondaryBackgroundColor
            : (item.postBackgroundColor ?? undefined),
        }
      : {
          borderColor: appStyle.appBorderStyle,
          borderRadius: Number.parseInt(appStyle.appBorderRadius, 10),
          borderStyle: appStyle.appBorderLineStyle,
          backgroundColor: appStyle.appSecondaryBackgroundColor,
        };

  return (
    <Pressable
      onPress={item.url ? () => WebBrowser.openBrowserAsync(item.url as string) : undefined}
      className={`${UI.card} active:opacity-80`}
      style={postCardStyle}
    >
      <View className="mb-1.5 flex-row flex-wrap items-center gap-2">
        <Text
          className={`rounded-full bg-indigo-300/10 px-2 py-1 text-xs font-semibold uppercase ${
            KIND_COLORS[item.sourceKind] ?? "text-slate-400"
          }`}
          style={postSecondaryTextStyle}
        >
          {item.sourceKind}
        </Text>
        {item.sourceTitle ? (
          <Text
            className="shrink text-xs text-slate-400"
            numberOfLines={1}
            style={postSecondaryTextStyle}
          >
            {item.sourceTitle}
          </Text>
        ) : null}
        <Text className="text-xs text-slate-500" style={postSecondaryTextStyle}>
          {timeAgo(item.publishedAt ?? item.fetchedAt)}
        </Text>
      </View>

      {item.title ? (
        <Text className="mb-1 text-base font-semibold text-white" style={postTextStyle}>
          {item.title}
        </Text>
      ) : null}
      {authorName || item.authorHandle ? (
        <Text className="mb-1 text-xs text-slate-400" style={postTextStyle}>
          {authorName}
          {item.authorHandle ? (
            <Text
              style={postSecondaryTextStyle}
            >{`${authorName ? " " : ""}@${item.authorHandle}`}</Text>
          ) : null}
        </Text>
      ) : null}
      {body ? (
        <Text className="text-sm leading-5 text-slate-300" numberOfLines={8} style={postTextStyle}>
          {body}
        </Text>
      ) : null}

      {image && (
        <Image
          source={{ uri: apiUrl(image.url) }}
          contentFit="cover"
          transition={150}
          accessibilityLabel={image.alt}
          style={{ width: "100%", height: 180, borderRadius: 16, marginTop: 12 }}
        />
      )}

      {video &&
        (video.status && video.status !== "ready" ? (
          <View className="mt-3 items-center justify-center rounded-2xl border border-white/10 bg-black/30 py-10">
            <Text className="text-sm text-slate-400">
              {video.status === "failed" ? "video processing failed" : "video processing…"}
            </Text>
          </View>
        ) : (
          <FeedVideo uri={apiUrl(video.url)} />
        ))}
    </Pressable>
  );
}

/**
 * Its own component so the player hook is unconditional: a card without a
 * video simply does not render one. Playback stays paused until tapped —
 * nobody wants a feed that plays itself.
 */
function FeedVideo({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri);
  return (
    <VideoView
      player={player}
      nativeControls
      contentFit="contain"
      style={{
        width: "100%",
        height: 200,
        borderRadius: 16,
        marginTop: 12,
        backgroundColor: "#000",
      }}
    />
  );
}
