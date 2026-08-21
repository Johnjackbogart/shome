import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { API_URL, apiUrl } from "@/lib/config";
import { COLORS, UI } from "@/lib/ui";

const MAX_AVATAR_BYTES = 20 * 1024 * 1024;

/**
 * The upload API needs a declared size before it will hand back a target, and
 * it re-derives the real one from the bytes it receives. Not every picker
 * reports a size, so fall back to reading the file the picker returned.
 */
async function measureBytes(asset: ImagePicker.ImagePickerAsset): Promise<number> {
  if (asset.fileSize) return asset.fileSize;
  if (asset.file?.size) return asset.file.size;
  const blob = await fetch(asset.uri).then((res) => res.blob());
  if (!blob.size) throw new Error("could not read that photo");
  return blob.size;
}

export default function MeScreen() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user as
    | { name?: string; email?: string; username?: string | null; image?: string | null }
    | undefined;
  const handle = user?.username ?? null;

  // The session's copy of the picture is only refreshed when Better Auth
  // refetches, so hold what the profile API last told us and follow the
  // session whenever it does change.
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImage(user?.image ?? null);
  }, [user?.image]);

  const avatarUrl = image ? apiUrl(image) : null;

  async function pickAvatar() {
    setError(null);
    setNotice(null);
    // On web the picker must open synchronously from the press; native asks
    // for library access first, as the post composer does.
    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setError("allow photo library access to choose a profile picture");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] });
    if (result.canceled) return;
    const asset = result.assets[0];
    if (asset) await uploadAvatar(asset);
  }

  async function uploadAvatar(asset: ImagePicker.ImagePickerAsset) {
    const contentType = asset.mimeType ?? "image/jpeg";
    if (!contentType.startsWith("image/")) {
      setError("choose an image file for your profile picture");
      return;
    }
    const name = asset.fileName ?? `avatar-${Date.now()}.jpg`;

    setBusy(true);
    try {
      const byteSize = await measureBytes(asset);
      if (byteSize > MAX_AVATAR_BYTES) {
        throw new Error("profile pictures must be 20 MB or smaller");
      }

      const created = await api.post<{ uploads: { id: string; uploadUrl: string }[] }>(
        "/api/media/uploads",
        { uploads: [{ name, type: "image", contentType, byteSize }] },
      );
      const upload = created.uploads[0];
      if (!upload) throw new Error("could not start the upload");

      const form = new FormData();
      if (Platform.OS === "web") {
        if (!asset.file) throw new Error(`could not read ${name}`);
        form.append("file", asset.file);
      } else {
        // React Native's FormData accepts this native file descriptor; the DOM
        // declaration TypeScript picks in Expo only admits a Blob.
        form.append("file", { uri: asset.uri, name, type: contentType } as unknown as Blob);
      }
      if (upload.uploadUrl.startsWith("/")) {
        // A local upload lands on our own API and needs the session; a media
        // provider hands back an absolute URL that carries its own credentials.
        await api.postForm(upload.uploadUrl, form);
      } else {
        const res = await fetch(upload.uploadUrl, { method: "POST", body: form });
        if (!res.ok) throw new Error("could not upload your profile picture");
      }

      const completed = await api.post<{ status: string }>(
        `/api/media/uploads/${upload.id}/complete`,
      );
      if (completed.status === "failed") {
        throw new Error("your profile picture could not be processed");
      }
      if (completed.status !== "ready") {
        setNotice("Your profile picture is still processing — try again in a moment.");
        return;
      }

      const saved = await api.put<{ image: string | null }>("/api/profile", {
        avatarUploadId: upload.id,
      });
      setImage(saved.image);
      setNotice("Profile picture saved.");
      // The tab bar reads the picture from the session, not from here.
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function removeAvatar() {
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      const saved = await api.put<{ image: string | null }>("/api/profile", {
        avatarUploadId: null,
      });
      setImage(saved.image);
      setNotice("Profile picture removed.");
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className={UI.screen} edges={["top"]}>
      <View className={UI.screenContent}>
        <Text className={`pb-2 pt-2 ${UI.eyebrow}`}>Your corner of the web</Text>
        <Text className="pb-5 text-3xl font-semibold text-white">Me</Text>

        <View className={`${UI.card} gap-1`}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              contentFit="cover"
              accessibilityLabel="Your profile picture"
              style={{ width: 44, height: 44, borderRadius: 22, marginBottom: 8 }}
            />
          ) : (
            <View className="mb-2 size-11 items-center justify-center rounded-full bg-indigo-300">
              <Text className="text-base font-bold text-slate-950">
                {(user?.name ?? user?.email ?? "s").slice(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
          <Text className="text-lg font-semibold text-white">{user?.name ?? "…"}</Text>
          {handle ? <Text className="text-sm font-medium text-indigo-200">@{handle}</Text> : null}
          <Text className="text-sm text-slate-400">{user?.email}</Text>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              onPress={() => void pickAvatar()}
              disabled={busy}
              className={`${UI.ghostButton} px-3 py-2 disabled:opacity-50`}
              accessibilityRole="button"
            >
              {busy ? (
                <ActivityIndicator size="small" color={COLORS.accent} />
              ) : (
                <Text className="text-sm font-medium text-indigo-200">
                  {avatarUrl ? "Change photo" : "Add photo"}
                </Text>
              )}
            </Pressable>
            {avatarUrl ? (
              <Pressable
                onPress={() => void removeAvatar()}
                disabled={busy}
                className="rounded-xl px-3 py-2 active:bg-white/10 disabled:opacity-50"
                accessibilityRole="button"
              >
                <Text className="text-sm font-medium text-slate-400">Remove</Text>
              </Pressable>
            ) : null}
          </View>
          {notice ? <Text className="mt-2 text-sm text-emerald-300">{notice}</Text> : null}
          {error ? <Text className="mt-2 text-sm text-rose-300">{error}</Text> : null}
        </View>

        {handle ? (
          <View className="mt-3 gap-2">
            <Pressable
              onPress={() => router.push("/profile-editor")}
              className={UI.primaryButton}
              accessibilityRole="button"
            >
              <Text className="font-medium text-slate-950">Edit page &amp; post style</Text>
            </Pressable>
            <Pressable
              onPress={() => WebBrowser.openBrowserAsync(`${API_URL}/p/${handle}`)}
              className={UI.ghostButton}
              accessibilityRole="button"
            >
              <Text className="font-medium text-indigo-200">View my page</Text>
            </Pressable>
          </View>
        ) : null}

        <Pressable
          onPress={() => void authClient.signOut()}
          className="mt-3 items-center rounded-xl border border-rose-300/15 bg-rose-300/5 px-4 py-3 active:opacity-70"
        >
          <Text className="font-medium text-rose-300">Sign out</Text>
        </Pressable>

        <Text className="mt-6 text-xs text-slate-500">server: {API_URL}</Text>
      </View>
    </SafeAreaView>
  );
}
