import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/config";
import { UI } from "@/lib/ui";

export default function MeScreen() {
  const { data: session } = authClient.useSession();
  const user = session?.user as
    | { name?: string; email?: string; username?: string | null }
    | undefined;
  const handle = user?.username ?? null;

  return (
    <SafeAreaView className={UI.screen} edges={["top"]}>
      <View className={UI.screenContent}>
        <Text className={`pb-2 pt-2 ${UI.eyebrow}`}>Your corner of the web</Text>
        <Text className="pb-5 text-3xl font-semibold text-white">Me</Text>

        <View className={`${UI.card} gap-1`}>
          <View className="mb-2 size-11 items-center justify-center rounded-full bg-indigo-300">
            <Text className="text-base font-bold text-slate-950">
              {(user?.name ?? user?.email ?? "s").slice(0, 1).toUpperCase()}
            </Text>
          </View>
          <Text className="text-lg font-semibold text-white">{user?.name ?? "…"}</Text>
          {handle && <Text className="text-sm font-medium text-indigo-200">@{handle}</Text>}
          <Text className="text-sm text-slate-400">{user?.email}</Text>
        </View>

        {handle && (
          <Pressable
            onPress={() => WebBrowser.openBrowserAsync(`${API_URL}/p/${handle}`)}
            className={`mt-3 ${UI.ghostButton}`}
          >
            <Text className="font-medium text-indigo-200">View my page</Text>
          </Pressable>
        )}

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
