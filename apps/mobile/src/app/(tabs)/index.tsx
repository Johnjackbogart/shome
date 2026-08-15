import type { FeedItemView } from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedItemCard } from "@/components/feed-item-card";
import { PostComposer } from "@/components/post-composer";
import { api } from "@/lib/api";
import { COLORS, UI } from "@/lib/ui";

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
    <SafeAreaView className={UI.screen} edges={["top"]}>
      <View className="flex-row items-end justify-between px-5 pb-5 pt-2">
        <View>
          <Text className={UI.eyebrow}>Your daily mix</Text>
          <Text className="mt-2 text-3xl font-semibold text-white">Your feed</Text>
        </View>
        <Pressable
          onPress={fetchNew}
          disabled={fetching}
          className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 active:opacity-70"
        >
          {fetching ? (
            <ActivityIndicator size="small" color={COLORS.accent} />
          ) : (
            <Text className="text-sm font-medium text-indigo-200">Fetch new</Text>
          )}
        </Pressable>
      </View>

      {error && <Text className="px-5 pb-2 text-sm text-rose-300">{error}</Text>}

      {items === null ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={COLORS.accent} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedItemCard item={item} />}
          contentContainerClassName="px-5 pb-8"
          ListHeaderComponent={
            <PostComposer
              onPosted={(post) => {
                setItems((current) => [post, ...(current ?? [])]);
              }}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onPullRefresh}
              tintColor={COLORS.accent}
            />
          }
          ListEmptyComponent={
            <View className={`${UI.card} mt-12 items-center`}>
              <Text className="text-base font-medium text-white">Nothing here yet.</Text>
              <Text className="mt-2 text-center text-sm leading-5 text-slate-400">
                Add a source in the Sources tab to make this space yours.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
