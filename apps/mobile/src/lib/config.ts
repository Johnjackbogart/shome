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

/**
 * Absolute URL for something the API serves. First-party media and avatars are
 * server-relative paths (`/api/media/…`) because the web app is same-origin
 * with them; a native <Image> has no origin to resolve those against, so it
 * silently renders nothing. Anything already absolute is left alone — fetched
 * items carry the source platform's own URLs.
 */
export function apiUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("/") ? `${API_URL}${pathOrUrl}` : pathOrUrl;
}
