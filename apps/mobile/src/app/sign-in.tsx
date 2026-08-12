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
import { COLORS, UI } from "@/lib/ui";

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
    <SafeAreaView className={UI.screen}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center">
            <View className="mb-12 flex-row items-center gap-2.5">
              <View className="size-9 items-center justify-center rounded-xl bg-indigo-300">
                <Text className="text-base font-black text-slate-950">s</Text>
              </View>
              <Text className="text-xl font-semibold tracking-tight text-white">shome</Text>
            </View>

            <Text className={UI.eyebrow}>Welcome back</Text>
            <Text className={`mt-3 text-center ${UI.heading}`}>Make yourself at home.</Text>
            <Text className="mt-3 max-w-sm text-center text-sm leading-6 text-slate-400">
              Sign in to tune into the feed you made for yourself.
            </Text>
          </View>

          <View className={`mt-9 gap-5 ${UI.card}`}>
            <View className="flex-row rounded-xl bg-slate-950/70 p-1">
              {(["signin", "signup"] as const).map((m) => (
                <Pressable
                  key={m}
                  onPress={() => setMode(m)}
                  className={`flex-1 items-center rounded-lg px-3 py-2.5 ${
                    mode === m ? "bg-white" : ""
                  }`}
                >
                  <Text
                    className={
                      mode === m ? "font-semibold text-slate-950" : "font-medium text-slate-400"
                    }
                  >
                    {m === "signin" ? "Sign in" : "Create account"}
                  </Text>
                </Pressable>
              ))}
            </View>

            {mode === "signup" && (
              <>
                <TextInput
                  className={UI.input}
                  placeholder="username"
                  placeholderTextColor="#64748b"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={username}
                  onChangeText={setUsername}
                />
                <TextInput
                  className={UI.input}
                  placeholder="display name (optional)"
                  placeholderTextColor="#64748b"
                  value={displayName}
                  onChangeText={setDisplayName}
                />
              </>
            )}
            <TextInput
              className={UI.input}
              placeholder="email address"
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              className={UI.input}
              placeholder="password"
              placeholderTextColor="#64748b"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {error && (
              <Text className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200">
                {error}
              </Text>
            )}

            <Pressable onPress={submit} disabled={busy} className={UI.primaryButton}>
              {busy ? (
                <ActivityIndicator color={COLORS.background} />
              ) : (
                <Text className="font-semibold text-slate-950">
                  {mode === "signin" ? "Continue to shome" : "Create your shome"}
                </Text>
              )}
            </Pressable>
          </View>
          <Text className="mt-6 text-center text-xs text-slate-500">
            Your sources stay yours. Always.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
