import { Platform } from "react-native";
import { authClient } from "./auth-client";
import { API_URL } from "./config";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    ...((init?.headers as Record<string, string>) ?? {}),
  };
  if (init?.body !== undefined && !(init.body instanceof FormData)) {
    headers["content-type"] = "application/json";
  }
  // Better Auth's Expo client keeps the session cookie in SecureStore; native
  // fetch has no cookie jar, so forward it on every API call. On web the
  // browser has its own jar and forbids setting `cookie` by hand — the API is a
  // different origin there, so opt into sending credentials instead.
  const isWeb = Platform.OS === "web";
  if (!isWeb) {
    const cookie = authClient.getCookie();
    if (cookie) headers.cookie = cookie;
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    ...(isWeb ? { credentials: "include" as const } : {}),
  });
  const data = (await res.json().catch(() => null)) as {
    error?: string;
  } | null;
  if (!res.ok) throw new ApiError(res.status, data?.error ?? `HTTP ${res.status}`);
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  postForm: <T>(path: string, body: FormData) => request<T>(path, { method: "POST", body }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
