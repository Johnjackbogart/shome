import type { PeopleSearchResult, SocialUserView } from "@shome/core";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Linking, Pressable, Text, TextInput, View } from "react-native";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
import { API_URL, apiUrl } from "@/lib/config";
import { UI } from "@/lib/ui";

export function PeopleDiscovery() {
  const { appStyle } = useAppStyle();
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<PeopleSearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [updatingPersonId, setUpdatingPersonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function findPeople() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setPeople(null);
      setError("Enter a name or handle to search shome.");
      return;
    }

    setSearching(true);
    setError(null);
    try {
      const result = await api.get<{ people: PeopleSearchResult[] }>(
        `/api/discover/people?q=${encodeURIComponent(trimmedQuery)}`,
      );
      setPeople(result.people);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSearching(false);
    }
  }

  async function toggleFollow(person: PeopleSearchResult) {
    setUpdatingPersonId(person.id);
    setError(null);
    try {
      if (person.isFollowing) {
        await api.del(`/api/follows/${encodeURIComponent(person.id)}`);
      } else {
        await api.post<{ person: SocialUserView; created: boolean }>("/api/follows", {
          userId: person.id,
        });
      }
      setPeople(
        (current) =>
          current?.map((candidate) =>
            candidate.id === person.id
              ? { ...candidate, isFollowing: !person.isFollowing }
              : candidate,
          ) ?? null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUpdatingPersonId(null);
    }
  }

  return (
    <View className={UI.card} style={[appSurfaceAppearance(appStyle), { gap: 12 }]}>
      <View>
        <Text className="text-lg font-semibold text-white" style={appPrimaryText(appStyle)}>
          Find your people on shome
        </Text>
        <Text className="mt-1 text-sm leading-5" style={appSecondaryText(appStyle)}>
          Search a name or @handle, visit their page, then decide whether to follow.
        </Text>
      </View>

      <TextInput
        className={UI.input}
        style={{
          backgroundColor: appStyle.appAccentBackgroundColor,
          color: appStyle.appSecondaryTextColor,
        }}
        placeholder="Name or @handle"
        placeholderTextColor={appStyle.appSecondaryTextColor}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => void findPeople()}
        accessibilityLabel="Search shome users"
      />
      <Pressable
        onPress={() => void findPeople()}
        disabled={searching}
        className={`self-start ${UI.primaryButton}`}
        style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
      >
        {searching ? (
          <ActivityIndicator size="small" color={appStyle.appAccentFontColor} />
        ) : (
          <Text
            className="text-sm font-normal"
            style={{ color: appStyle.appFontColor, fontFamily: appStyle.appFont }}
          >
            Find people
          </Text>
        )}
      </Pressable>

      {people && (
        <View className="gap-3 border-t border-white/10 pt-3" accessibilityLiveRegion="polite">
          {people.length === 0 ? (
            <Text className="text-sm" style={appSecondaryText(appStyle)}>
              No shome members match that search yet.
            </Text>
          ) : (
            people.map((person) => {
              const updating = updatingPersonId === person.id;
              return (
                <View key={person.id} className="flex-row items-center gap-3">
                  <Pressable
                    className="min-w-0 flex-1 flex-row items-center gap-3"
                    onPress={() =>
                      void Linking.openURL(`${API_URL}/p/${encodeURIComponent(person.handle)}`)
                    }
                    accessibilityRole="link"
                    accessibilityLabel={`Open @${person.handle}'s profile`}
                  >
                    {person.image ? (
                      <Image
                        source={{ uri: apiUrl(person.image) }}
                        contentFit="cover"
                        accessibilityLabel={`${person.displayName ?? person.handle}'s profile picture`}
                        style={{ width: 44, height: 44, borderRadius: 22 }}
                      />
                    ) : (
                      <View className="size-11 items-center justify-center rounded-full bg-indigo-300">
                        <Text className="font-bold text-slate-950">
                          {(person.displayName ?? person.handle).charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <View className="min-w-0 flex-1">
                      <Text
                        className="font-medium"
                        style={appPrimaryText(appStyle)}
                        numberOfLines={1}
                      >
                        {person.displayName || `@${person.handle}`}
                      </Text>
                      <Text
                        className="text-sm"
                        style={appSecondaryText(appStyle)}
                        numberOfLines={1}
                      >
                        @{person.handle}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => void toggleFollow(person)}
                    disabled={updating}
                    className={person.isFollowing ? UI.ghostButton : UI.primaryButton}
                    style={
                      person.isFollowing
                        ? undefined
                        : { backgroundColor: appStyle.appAccentBackgroundColor }
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`${person.isFollowing ? "Unfollow" : "Follow"} @${person.handle}`}
                  >
                    {updating ? (
                      <ActivityIndicator size="small" color={appStyle.appAccentFontColor} />
                    ) : (
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: appStyle.appAccentFontColor, fontFamily: appStyle.appFont }}
                      >
                        {person.isFollowing ? "Following" : "Follow"}
                      </Text>
                    )}
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      )}
      {error && <Text className="text-sm text-rose-300">{error}</Text>}
    </View>
  );
}
