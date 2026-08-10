import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";

export default function SignInScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: authError } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: displayName.trim() || username,
          username,
        });
        if (authError) throw new Error(authError.message ?? "sign-up failed");
      } else {
        const { error: authError } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (authError) throw new Error(authError.message ?? "sign-in failed");
      }
      // Session state updates via useSession; the root layout swaps to tabs.
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center gap-3 px-6"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-center text-3xl font-bold text-zinc-100">shome</Text>
          <Text className="mb-4 text-center text-sm text-zinc-400">your feeds, your rules</Text>

          <View className="mb-2 flex-row justify-center gap-2">
            {(["signin", "signup"] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setMode(m)}
                className={`rounded-full px-4 py-1.5 ${mode === m ? "bg-accent/20" : ""}`}
              >
                <Text className={mode === m ? "font-semibold text-accent" : "text-zinc-400"}>
                  {m === "signin" ? "sign in" : "create account"}
                </Text>
              </Pressable>
            ))}
          </View>

          {mode === "signup" && (
            <>
              <TextInput
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100"
                placeholder="username"
                placeholderTextColor="#71717a"
                autoCapitalize="none"
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100"
                placeholder="display name (optional)"
                placeholderTextColor="#71717a"
                value={displayName}
                onChangeText={setDisplayName}
              />
            </>
          )}
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100"
            placeholder="email"
            placeholderTextColor="#71717a"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100"
            placeholder="password"
            placeholderTextColor="#71717a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error && <Text className="text-sm text-red-400">{error}</Text>}

          <Pressable
            onPress={submit}
            disabled={busy}
            className="mt-2 items-center rounded-xl bg-accent px-4 py-3 active:opacity-80"
          >
            {busy ? (
              <ActivityIndicator color="#09090b" />
            ) : (
              <Text className="font-semibold text-zinc-950">
                {mode === "signin" ? "sign in" : "create account"}
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
