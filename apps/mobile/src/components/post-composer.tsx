import {
  type ConnectionView,
  DEFAULT_POST_STYLE,
  type FeedItemView,
  POST_BORDER_LINE_STYLE_OPTIONS,
  POST_BORDER_RADIUS_OPTIONS,
  POST_FONT_OPTIONS,
  type PostBorderLineStyle,
  type PostBorderRadius,
  type PostFont,
  type PostStyle,
} from "@shome/core";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, TextInput, View } from "react-native";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { COLORS, UI } from "@/lib/ui";

const MAX_PHOTOS_PER_POST = 10;
const MAX_VIDEO_DURATION_MS = 3 * 60 * 1_000;
let nextMediaId = 0;

type SelectedMedia = {
  id: string;
  uri: string;
  name: string;
  type: string;
  durationMs: number | null;
  file?: File;
};

type Delivery = {
  provider: "bluesky" | "mastodon";
  ok: boolean;
  url?: string;
  error?: string;
};

function mediaType(asset: ImagePicker.ImagePickerAsset): string {
  if (asset.mimeType) return asset.mimeType;
  return asset.type === "video" ? "video/mp4" : "image/jpeg";
}

function mediaName(asset: ImagePicker.ImagePickerAsset, type: string): string {
  if (asset.fileName) return asset.fileName;
  const extension = type === "video/quicktime" ? "mov" : type === "video/webm" ? "webm" : "mp4";
  return `capture-${Date.now()}.${type.startsWith("video/") ? extension : "jpg"}`;
}

function toSelectedMedia(asset: ImagePicker.ImagePickerAsset): SelectedMedia {
  const type = mediaType(asset);
  return {
    id: `${Date.now()}-${nextMediaId++}`,
    uri: asset.uri,
    name: mediaName(asset, type),
    type,
    durationMs: asset.duration ?? null,
    file: asset.file,
  };
}

type PostComposerProps = {
  onPosted: (post: FeedItemView) => void;
  onSuccess?: () => void;
};

export function PostComposer({ onPosted, onSuccess }: PostComposerProps) {
  const { appStyle } = useAppStyle();
  const [text, setText] = useState("");
  const [borderStyle, setBorderStyle] = useState(DEFAULT_POST_STYLE.borderStyle);
  const [borderRadius, setBorderRadius] = useState<PostBorderRadius>(
    DEFAULT_POST_STYLE.borderRadius,
  );
  const [borderLineStyle, setBorderLineStyle] = useState<PostBorderLineStyle>(
    DEFAULT_POST_STYLE.borderLineStyle,
  );
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_POST_STYLE.backgroundColor);
  const [font, setFont] = useState<PostFont>(DEFAULT_POST_STYLE.font);
  const [fontColor, setFontColor] = useState(DEFAULT_POST_STYLE.fontColor);
  const [secondaryTextColor, setSecondaryTextColor] = useState(
    DEFAULT_POST_STYLE.secondaryTextColor,
  );
  const [profilePostStyle, setProfilePostStyle] = useState<PostStyle>({
    ...DEFAULT_POST_STYLE,
  });
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [blueskyConnectionId, setBlueskyConnectionId] = useState("");
  const [mastodonConnectionId, setMastodonConnectionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const blueskyConnections = connections.filter((connection) => connection.provider === "bluesky");
  const mastodonConnections = connections.filter(
    (connection) => connection.provider === "mastodon",
  );
  const blueskyLength = [...text].length;
  const blueskyTooLong = Boolean(blueskyConnectionId) && blueskyLength > 300;

  function addAssets(assets: ImagePicker.ImagePickerAsset[]) {
    const media = assets.map(toSelectedMedia);
    if (
      media.some((asset) => !asset.type.startsWith("image/") && !asset.type.startsWith("video/"))
    ) {
      setError("choose photo or video files only");
      return;
    }
    if (
      media.some((asset) => asset.durationMs !== null && asset.durationMs > MAX_VIDEO_DURATION_MS)
    ) {
      setError("videos must be 3 minutes or shorter");
      return;
    }
    const next = [...selectedMedia, ...media];
    if (next.filter((asset) => asset.type.startsWith("image/")).length > MAX_PHOTOS_PER_POST) {
      setError(`a post can include up to ${MAX_PHOTOS_PER_POST} photos`);
      return;
    }
    setSelectedMedia(next);
    setError(null);
  }

  useEffect(() => {
    if (Platform.OS !== "android") return;
    void ImagePicker.getPendingResultAsync()
      .then((result) => {
        if (result && "canceled" in result && !result.canceled) {
          setSelectedMedia(result.assets.map(toSelectedMedia));
          setError(null);
        }
      })
      .catch(() => setError("could not recover the captured media"));
  }, []);

  useEffect(() => {
    void Promise.all([
      api.get<{ connections: ConnectionView[] }>("/api/connections"),
      api.get<{ defaultPostStyle: PostStyle }>("/api/post-style"),
    ])
      .then(([connectionResult, profile]) => {
        setConnections(connectionResult.connections);
        setProfilePostStyle(profile.defaultPostStyle);
        setBorderStyle(profile.defaultPostStyle.borderStyle);
        setBorderRadius(profile.defaultPostStyle.borderRadius);
        setBorderLineStyle(profile.defaultPostStyle.borderLineStyle);
        setBackgroundColor(profile.defaultPostStyle.backgroundColor);
        setFont(profile.defaultPostStyle.font);
        setFontColor(profile.defaultPostStyle.fontColor);
        setSecondaryTextColor(profile.defaultPostStyle.secondaryTextColor);
      })
      .catch((connectionError) =>
        setError(
          connectionError instanceof Error ? connectionError.message : String(connectionError),
        ),
      );
  }, []);

  async function chooseMedia() {
    setError(null);
    setNotice(null);
    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setError("allow photo library access to attach existing photos or videos");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
    });
    if (!result.canceled) addAssets(result.assets);
  }

  async function capture(mediaTypes: ImagePicker.MediaType[]) {
    setError(null);
    setNotice(null);
    // On web the picker must open synchronously from the press event. Native
    // platforms require an explicit permission request before opening it.
    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        setError("allow camera access to take photos or record videos");
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      mediaTypes,
      ...(mediaTypes.includes("videos") ? { videoMaxDuration: 180 } : {}),
    });
    if (!result.canceled) addAssets(result.assets);
  }

  async function submit() {
    if (busy || blueskyTooLong || (text.trim().length === 0 && selectedMedia.length === 0)) {
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const form = new FormData();
      form.set("text", text);
      form.set("borderStyle", borderStyle);
      form.set("borderRadius", borderRadius);
      form.set("borderLineStyle", borderLineStyle);
      form.set("backgroundColor", backgroundColor);
      form.set("font", font);
      form.set("fontColor", fontColor);
      form.set("secondaryTextColor", secondaryTextColor);
      if (blueskyConnectionId) form.set("blueskyConnectionId", blueskyConnectionId);
      if (mastodonConnectionId) form.set("mastodonConnectionId", mastodonConnectionId);
      for (const media of selectedMedia) {
        if (Platform.OS === "web") {
          if (!media.file) throw new Error(`could not read ${media.name}`);
          form.append("media", media.file);
        } else {
          // React Native's FormData accepts this native file descriptor. The
          // DOM declaration that TypeScript selects in Expo only exposes Blob.
          form.append("media", {
            uri: media.uri,
            name: media.name,
            type: media.type,
          } as unknown as Blob);
        }
      }
      const result = await api.postForm<{ post: FeedItemView; deliveries: Delivery[] }>(
        "/api/posts",
        form,
      );
      setText("");
      setSelectedMedia([]);
      setBorderStyle(profilePostStyle.borderStyle);
      setBorderRadius(profilePostStyle.borderRadius);
      setBorderLineStyle(profilePostStyle.borderLineStyle);
      setBackgroundColor(profilePostStyle.backgroundColor);
      setFont(profilePostStyle.font);
      setFontColor(profilePostStyle.fontColor);
      setSecondaryTextColor(profilePostStyle.secondaryTextColor);
      onPosted(result.post);
      if (onSuccess) {
        onSuccess();
      } else {
        const succeeded = result.deliveries
          .filter((delivery) => delivery.ok)
          .map((delivery) => delivery.provider);
        const failed = result.deliveries.filter((delivery) => !delivery.ok);
        setNotice(
          [
            "posted to your shome feed",
            succeeded.length > 0 ? `shared to ${succeeded.join(" + ")}` : null,
            ...failed.map(
              (delivery) => `${delivery.provider}: ${delivery.error ?? "could not post"}`,
            ),
          ]
            .filter(Boolean)
            .join(" · "),
        );
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "could not post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View className={`${UI.card} mb-5 gap-3`} style={appSurfaceAppearance(appStyle)}>
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-lg font-bold text-white" style={appPrimaryText(appStyle)}>
          Write a post
        </Text>
        <Text className="text-xs text-slate-500" style={appSecondaryText(appStyle)}>
          shows on your public profile
        </Text>
      </View>
      <TextInput
        className={`${UI.input} min-h-28 text-base`}
        value={text}
        onChangeText={setText}
        maxLength={5_000}
        multiline
        textAlignVertical="top"
        placeholder="What’s on your mind?"
        placeholderTextColor="#64748b"
        accessibilityLabel="Post text"
      />
      <View
        className="gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
        style={appSurfaceAppearance(appStyle)}
      >
        <Text className="text-sm font-medium text-white" style={appPrimaryText(appStyle)}>
          Post style
        </Text>
        <Text className="text-xs text-slate-400">Use six-digit hex colors, such as #f8fafc.</Text>
        <View className="flex-row gap-2">
          <TextInput
            className={`${UI.input} flex-1 py-2 text-sm`}
            value={borderStyle}
            onChangeText={setBorderStyle}
            autoCapitalize="characters"
            maxLength={7}
            placeholder="#ffffff"
            placeholderTextColor="#64748b"
            accessibilityLabel="Border color"
          />
          <TextInput
            className={`${UI.input} flex-1 py-2 text-sm`}
            value={backgroundColor}
            onChangeText={setBackgroundColor}
            autoCapitalize="characters"
            maxLength={7}
            placeholder="#0f172a"
            placeholderTextColor="#64748b"
            accessibilityLabel="Background color"
          />
        </View>
        <Text className="text-xs text-slate-400">Border radius</Text>
        <View className="flex-row flex-wrap gap-2">
          {POST_BORDER_RADIUS_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setBorderRadius(option.value)}
              className={`rounded-lg px-3 py-2 ${
                borderRadius === option.value
                  ? "bg-indigo-300"
                  : "border border-white/10 bg-white/5"
              }`}
              accessibilityRole="radio"
              accessibilityLabel={`${option.label} border radius`}
              accessibilityState={{ selected: borderRadius === option.value }}
            >
              <Text className={borderRadius === option.value ? "text-slate-950" : "text-slate-200"}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text className="text-xs text-slate-400">Border style</Text>
        <View className="flex-row flex-wrap gap-2">
          {POST_BORDER_LINE_STYLE_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setBorderLineStyle(option.value)}
              className={`rounded-lg px-3 py-2 ${
                borderLineStyle === option.value
                  ? "bg-indigo-300"
                  : "border border-white/10 bg-white/5"
              }`}
              accessibilityRole="radio"
              accessibilityLabel={`${option.label} border style`}
              accessibilityState={{ selected: borderLineStyle === option.value }}
            >
              <Text
                className={borderLineStyle === option.value ? "text-slate-950" : "text-slate-200"}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          className={`${UI.input} py-2 text-sm`}
          value={fontColor}
          onChangeText={setFontColor}
          autoCapitalize="characters"
          maxLength={7}
          placeholder="#f8fafc"
          placeholderTextColor="#64748b"
          accessibilityLabel="Font color"
        />
        <TextInput
          className={`${UI.input} py-2 text-sm`}
          value={secondaryTextColor}
          onChangeText={setSecondaryTextColor}
          autoCapitalize="characters"
          maxLength={7}
          placeholder="#94a3b8"
          placeholderTextColor="#64748b"
          accessibilityLabel="Secondary text color"
        />
        <View className="flex-row flex-wrap gap-2">
          {POST_FONT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setFont(option.value)}
              className={`rounded-lg px-3 py-2 ${
                font === option.value ? "bg-indigo-300" : "border border-white/10 bg-white/5"
              }`}
              accessibilityRole="radio"
              accessibilityLabel={`${option.label} font`}
              accessibilityState={{ selected: font === option.value }}
            >
              <Text className={font === option.value ? "text-slate-950" : "text-slate-200"}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Pressable onPress={() => void chooseMedia()} className={`${UI.ghostButton} px-3 py-2`}>
          <Text className="text-sm font-medium text-indigo-200">Choose media</Text>
        </Pressable>
        <Pressable
          onPress={() => void capture(["images"])}
          className={`${UI.ghostButton} px-3 py-2`}
        >
          <Text className="text-sm font-medium text-indigo-200">Take photo</Text>
        </Pressable>
        <Pressable
          onPress={() => void capture(["videos"])}
          className={`${UI.ghostButton} px-3 py-2`}
        >
          <Text className="text-sm font-medium text-indigo-200">Record video</Text>
        </Pressable>
      </View>
      <Text className="text-xs text-slate-500">
        Up to 10 photos · MP4/WebM/MOV videos up to 3 min
      </Text>
      <View
        className="gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
        style={appSurfaceAppearance(appStyle)}
      >
        <Text className="text-sm font-medium text-white" style={appPrimaryText(appStyle)}>
          Cross-post
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <Pressable
            onPress={() =>
              setBlueskyConnectionId((current) =>
                current ? "" : (blueskyConnections[0]?.id ?? ""),
              )
            }
            disabled={blueskyConnections.length === 0}
            className={`rounded-xl px-3 py-2 disabled:opacity-50 ${
              blueskyConnectionId ? "bg-indigo-300" : "border border-white/10 bg-white/5"
            }`}
            accessibilityRole="checkbox"
            accessibilityLabel="Post to Bluesky"
            accessibilityState={{
              checked: Boolean(blueskyConnectionId),
              disabled: blueskyConnections.length === 0,
            }}
          >
            <Text
              className={
                blueskyConnectionId
                  ? "text-sm font-semibold text-slate-950"
                  : "text-sm text-indigo-200"
              }
            >
              Post to Bluesky
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setMastodonConnectionId((current) =>
                current ? "" : (mastodonConnections[0]?.id ?? ""),
              )
            }
            disabled={mastodonConnections.length === 0}
            className={`rounded-xl px-3 py-2 disabled:opacity-50 ${
              mastodonConnectionId ? "bg-indigo-300" : "border border-white/10 bg-white/5"
            }`}
            accessibilityRole="checkbox"
            accessibilityLabel="Post to Mastodon"
            accessibilityState={{
              checked: Boolean(mastodonConnectionId),
              disabled: mastodonConnections.length === 0,
            }}
          >
            <Text
              className={
                mastodonConnectionId
                  ? "text-sm font-semibold text-slate-950"
                  : "text-sm text-indigo-200"
              }
            >
              Post to Mastodon
            </Text>
          </Pressable>
        </View>
        {Boolean(blueskyConnectionId) && blueskyConnections.length > 1 && (
          <View className="gap-1">
            <Text className="text-xs text-slate-500">Bluesky account</Text>
            <View className="flex-row flex-wrap gap-2">
              {blueskyConnections.map((connection) => (
                <Pressable
                  key={connection.id}
                  onPress={() => setBlueskyConnectionId(connection.id)}
                  className={`rounded-lg px-2.5 py-1.5 ${
                    blueskyConnectionId === connection.id
                      ? "bg-indigo-300"
                      : "border border-white/10 bg-white/5"
                  }`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: blueskyConnectionId === connection.id }}
                >
                  <Text
                    className={
                      blueskyConnectionId === connection.id
                        ? "text-xs font-semibold text-slate-950"
                        : "text-xs text-slate-300"
                    }
                  >
                    {connection.account ?? connection.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        {Boolean(mastodonConnectionId) && mastodonConnections.length > 1 && (
          <View className="gap-1">
            <Text className="text-xs text-slate-500">Mastodon account</Text>
            <View className="flex-row flex-wrap gap-2">
              {mastodonConnections.map((connection) => (
                <Pressable
                  key={connection.id}
                  onPress={() => setMastodonConnectionId(connection.id)}
                  className={`rounded-lg px-2.5 py-1.5 ${
                    mastodonConnectionId === connection.id
                      ? "bg-indigo-300"
                      : "border border-white/10 bg-white/5"
                  }`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: mastodonConnectionId === connection.id }}
                >
                  <Text
                    className={
                      mastodonConnectionId === connection.id
                        ? "text-xs font-semibold text-slate-950"
                        : "text-xs text-slate-300"
                    }
                  >
                    {connection.account ?? connection.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        {(blueskyConnections.length === 0 || mastodonConnections.length === 0) && (
          <Text className="text-xs leading-5 text-slate-500">
            Connect accounts in the web app’s Sources tab to cross-post from mobile.
          </Text>
        )}
      </View>
      {Boolean(blueskyConnectionId) && (
        <Text className={blueskyTooLong ? "text-xs text-rose-300" : "text-xs text-slate-500"}>
          Bluesky: {blueskyLength}/300 characters
        </Text>
      )}
      {selectedMedia.length > 0 && Boolean(blueskyConnectionId || mastodonConnectionId) && (
        <Text className="text-xs leading-5 text-slate-500">
          Attachments publish to shome. Connected platforms currently receive text only.
        </Text>
      )}
      {selectedMedia.length > 0 && (
        <View className="gap-2">
          {selectedMedia.map((media) => (
            <View
              key={media.id}
              className="flex-row items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 py-2 pr-2 pl-3"
            >
              <Text className="min-w-0 flex-1 text-sm text-slate-300" numberOfLines={1}>
                {media.name}
              </Text>
              <Pressable
                onPress={() =>
                  setSelectedMedia((current) => current.filter((item) => item.id !== media.id))
                }
                className="rounded-lg px-2 py-1 active:bg-white/10"
                accessibilityLabel={`Remove ${media.name}`}
              >
                <Text className="text-sm font-medium text-slate-400">Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={() => void submit()}
          disabled={
            busy || blueskyTooLong || (text.trim().length === 0 && selectedMedia.length === 0)
          }
          className={`${UI.primaryButton} min-w-20 disabled:opacity-50`}
        >
          {busy ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text className="font-semibold text-slate-950">Post</Text>
          )}
        </Pressable>
        {notice && <Text className="text-sm text-emerald-300">{notice}</Text>}
      </View>
      {error && <Text className="text-sm text-rose-300">{error}</Text>}
    </View>
  );
}
