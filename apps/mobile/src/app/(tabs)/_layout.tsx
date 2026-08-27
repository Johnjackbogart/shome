import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import { useAppStyle } from "@/lib/app-style";
import { authClient } from "@/lib/auth-client";
import { apiUrl } from "@/lib/config";

/**
 * The tab shows who you are signed in as, so it wears your profile picture
 * when there is one and falls back to the generic person while there is not.
 */
function MeTabIcon({
  color,
  size,
  focused,
}: {
  color: ColorValue;
  size: number;
  focused: boolean;
}) {
  const { data: session } = authClient.useSession();
  const image = (session?.user as { image?: string | null } | undefined)?.image;
  if (!image) return <Ionicons name="person-circle" color={color} size={size} />;
  return (
    <Image
      source={{ uri: apiUrl(image) }}
      contentFit="cover"
      accessibilityLabel="Your profile picture"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: focused ? 2 : 1,
        borderColor: color,
      }}
    />
  );
}

export default function TabsLayout() {
  const { appStyle } = useAppStyle();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#c4b5fd",
        tabBarInactiveTintColor: appStyle.appSecondaryTextColor,
        tabBarStyle: {
          backgroundColor: appStyle.appSecondaryBackgroundColor,
          borderTopColor: appStyle.appBorderStyle,
          borderStyle: appStyle.appBorderLineStyle,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: appStyle.appFont, fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => <Ionicons name="layers" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="sources"
        options={{
          title: "Sources",
          tabBarIcon: ({ color, size }) => <Ionicons name="git-branch" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ color, size, focused }) => (
            <MeTabIcon color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
