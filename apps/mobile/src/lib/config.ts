import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Where the shome web server lives. Set EXPO_PUBLIC_API_URL for a deployed
 * server; in dev we point at the machine running `npm run dev` — reachable via
 * the Metro host for physical devices, 10.0.2.2 for the Android emulator.
 */
function guessDevServer(): string {
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host) return `http://${host}:3000`;
  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  return "http://localhost:3000";
}

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? guessDevServer();
