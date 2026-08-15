import type { FeedItemView } from "@shome/core";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, TextInput, View } from "react-native";
import { api } from "@/lib/api";
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

export function PostComposer({ onPosted }: { onPosted: (post: FeedItemView) => void }) {
  const [text, setText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
    if (busy || (text.trim().length === 0 && selectedMedia.length === 0)) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const form = new FormData();
      form.set("text", text);
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
      const result = await api.postForm<{ post: FeedItemView }>("/api/posts", form);
      setText("");
      setSelectedMedia([]);
      onPosted(result.post);
      setNotice("posted to your shome feed");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "could not post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View className={`${UI.card} mb-5 gap-3`}>
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-lg font-bold text-white">Write a post</Text>
        <Text className="text-xs text-slate-500">shows on your public profile</Text>
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
          disabled={busy || (text.trim().length === 0 && selectedMedia.length === 0)}
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
