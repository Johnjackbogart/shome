import { expoClient } from "@better-auth/expo/client";
import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "./config";

// Session cookies live in SecureStore (encrypted at rest by the OS keychain)
// and are attached to auth calls automatically; api.ts forwards them to the
// rest of the shome API.
export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    usernameClient(),
    expoClient({
      scheme: "shome",
      storagePrefix: "shome",
      storage: SecureStore,
    }),
  ],
});
