import "../global.css";

import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { AppStyleProvider, useAppStyle } from "@/lib/app-style";
import { authClient } from "@/lib/auth-client";
import { COLORS, UI } from "@/lib/ui";

export default function RootLayout() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <AppStyleProvider enabled={session !== null && !isPending}>
      <RootNavigator session={session} isPending={isPending} />
    </AppStyleProvider>
  );
}

function RootNavigator({
  session,
  isPending,
}: {
  session: ReturnType<typeof authClient.useSession>["data"];
  isPending: boolean;
}) {
  const { appStyle } = useAppStyle();

  if (isPending) {
    return (
      <View className={`${UI.screen} items-center justify-center`}>
        <ActivityIndicator color={COLORS.accent} />
      </View>
    );
  }

  return (
    <ThemeProvider
      value={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: appStyle.appBackgroundColor,
          border: appStyle.appBorderStyle,
          text: appStyle.appFontColor,
        },
      }}
    >
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: appStyle.appBackgroundColor },
        }}
      >
        <Stack.Protected guard={session !== null}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="profile-editor" options={{ animation: "slide_from_right" }} />
        </Stack.Protected>
        <Stack.Protected guard={session === null}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
