import type { FeedItemView } from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedItemCard } from "@/components/feed-item-card";
import { api } from "@/lib/api";

export default function FeedScreen() {
  const [items, setItems] = useState<FeedItemView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api.get<{ items: FeedItemView[] }>("/api/feed?limit=100");
      setItems(res.items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onPullRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  async function fetchNew() {
    setFetching(true);
    try {
      await api.post("/api/refresh");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setFetching(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 pb-2 pt-1">
        <Text className="text-2xl font-bold text-zinc-100">Feed</Text>
        <Pressable
          onPress={fetchNew}
          disabled={fetching}
          className="rounded-full border border-zinc-800 px-3 py-1.5 active:opacity-70"
        >
          {fetching ? (
            <ActivityIndicator size="small" color="#7aa5ff" />
          ) : (
            <Text className="text-sm text-accent">fetch new</Text>
          )}
        </Pressable>
      </View>

      {error && <Text className="px-4 pb-2 text-sm text-red-400">{error}</Text>}

      {items === null ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#7aa5ff" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedItemCard item={item} />}
          contentContainerClassName="px-4 pb-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} tintColor="#7aa5ff" />
          }
          ListEmptyComponent={
            <Text className="mt-16 text-center text-zinc-400">
              Nothing here yet — add a source in the Sources tab.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
