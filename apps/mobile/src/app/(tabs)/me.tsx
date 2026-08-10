import * as WebBrowser from "expo-web-browser";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/config";

export default function MeScreen() {
  const { data: session } = authClient.useSession();
  const user = session?.user as
    | { name?: string; email?: string; username?: string | null }
    | undefined;
  const handle = user?.username ?? null;

  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["top"]}>
      <View className="flex-1 px-4">
        <Text className="pb-4 pt-1 text-2xl font-bold text-zinc-100">Me</Text>

        <View className="gap-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <Text className="text-lg font-semibold text-zinc-100">{user?.name ?? "…"}</Text>
          {handle && <Text className="text-sm text-accent">@{handle}</Text>}
          <Text className="text-sm text-zinc-400">{user?.email}</Text>
        </View>

        {handle && (
          <Pressable
            onPress={() => WebBrowser.openBrowserAsync(`${API_URL}/p/${handle}`)}
            className="mt-3 items-center rounded-xl border border-zinc-800 px-4 py-3 active:opacity-70"
          >
            <Text className="text-accent">view my page</Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => void authClient.signOut()}
          className="mt-3 items-center rounded-xl border border-zinc-800 px-4 py-3 active:opacity-70"
        >
          <Text className="text-red-400">sign out</Text>
        </Pressable>

        <Text className="mt-6 text-xs text-zinc-500">server: {API_URL}</Text>
      </View>
    </SafeAreaView>
  );
}
