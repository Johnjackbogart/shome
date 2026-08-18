import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { VisualProfileBuilder } from "@/components/visual-profile-builder";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/config";
import { COLORS, UI } from "@/lib/ui";

type EditorMode = "visual" | "code";
type EditorPane = "content" | "styles";

type ProfileSource = {
  html: string;
  css: string;
};

const STYLE_TAG = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
const MAX_PROFILE_CHARS = 200_000;

function splitProfileSource(source: string): ProfileSource {
  const styles: string[] = [];
  const html = source.replace(STYLE_TAG, (_tag, css: string) => {
    const trimmed = css.trim();
    if (trimmed) styles.push(trimmed);
    return "";
  });
  return { html: html.trim(), css: styles.join("\n\n") };
}

function combineProfileSource({ html, css }: ProfileSource) {
  const style = css.trim() ? `<style>\n${css.trim()}\n</style>` : "";
  return [style, html.trim()].filter(Boolean).join("\n\n");
}

export default function ProfileEditorScreen() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const handle = (session?.user as { username?: string | null } | undefined)?.username ?? null;
  const [source, setSource] = useState<ProfileSource | null>(null);
  const [savedSource, setSavedSource] = useState<string | null>(null);
  const [mode, setMode] = useState<EditorMode>("visual");
  const [pane, setPane] = useState<EditorPane>("content");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const combinedSource = useMemo(() => (source ? combineProfileSource(source) : ""), [source]);
  const changed = source !== null && combinedSource !== savedSource;
  const characterCount = combinedSource.length;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const profile = await api.get<{ html: string }>("/api/profile");
      const next = splitProfileSource(profile.html);
      setSource(next);
      setSavedSource(combineProfileSource(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // This is deliberately the same preview endpoint that backs the browser
  // editor: block interactions work against the sanitized, component-rendered
  // document a visitor will see, without publishing a draft first.
  useEffect(() => {
    if (!source) return;
    if (characterCount > MAX_PROFILE_CHARS) {
      setPreviewDoc(null);
      setPreviewError("Profile pages are limited to 200,000 characters.");
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      api
        .post<{ doc: string }>("/api/profile/preview", { html: combinedSource })
        .then((response) => {
          if (cancelled) return;
          setPreviewDoc(response.doc);
          setPreviewError(null);
        })
        .catch((err) => {
          if (cancelled) return;
          setPreviewError(err instanceof Error ? err.message : String(err));
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [characterCount, combinedSource, source]);

  function updateSource(key: keyof ProfileSource, value: string) {
    setSource((current) => (current ? { ...current, [key]: value } : current));
    setNotice(null);
  }

  async function save() {
    if (!source) return;
    if (characterCount > MAX_PROFILE_CHARS) {
      setError("Profile pages are limited to 200,000 characters.");
      return;
    }
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await api.put("/api/profile", { html: combinedSource });
      setSavedSource(combinedSource);
      setNotice("Your page is live.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  async function generate() {
    const request = prompt.trim();
    if (request.length < 2) return;
    setGenerating(true);
    setError(null);
    setNotice(null);
    try {
      const response = await api.post<{ html: string }>("/api/profile/generate", {
        prompt: request,
        currentHtml: combinedSource || undefined,
      });
      setSource(splitProfileSource(response.html));
      setMode("visual");
      setNotice("Draft ready — review it, then save to publish.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setGenerating(false);
    }
  }

  function openPublicPage() {
    if (handle) void WebBrowser.openBrowserAsync(`${API_URL}/p/${handle}`);
  }

  return (
    <SafeAreaView className={UI.screen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-row items-center gap-3 px-5 pt-2 pb-3">
          <Pressable
            onPress={() => router.back()}
            className="size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Back to your profile"
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.accent} />
          </Pressable>
          <View className="flex-1">
            <Text className={UI.eyebrow}>Your public page</Text>
            <Text className="mt-1 text-2xl font-semibold text-white">Edit my page</Text>
          </View>
          <Pressable
            onPress={() => void save()}
            disabled={loading || saving || generating || !changed}
            className="rounded-xl bg-indigo-300 px-4 py-3 active:opacity-80 disabled:opacity-50"
            accessibilityRole="button"
          >
            {saving ? (
              <ActivityIndicator size="small" color={COLORS.background} />
            ) : (
              <Text className="font-semibold text-slate-950">Save</Text>
            )}
          </Pressable>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center gap-3 px-5">
            <ActivityIndicator color={COLORS.accent} />
            <Text className={UI.muted}>Loading your page…</Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-4 px-5 pb-8"
            keyboardShouldPersistTaps="handled"
          >
            <Text className="text-sm leading-5 text-slate-400">
              Build with HTML and CSS. Your page is rendered in the same safe sandbox as on the web.
            </Text>

            {error ? <Text className="text-sm text-rose-300">{error}</Text> : null}
            {notice ? <Text className="text-sm text-emerald-300">{notice}</Text> : null}

            <View className={`${UI.card} gap-3`}>
              <Text className="text-base font-semibold text-white">Vibe-code your page</Text>
              <Text className={UI.body}>
                Describe a look and a starting point. This replaces only the draft, until you save
                it.
              </Text>
              <TextInput
                className={UI.input}
                value={prompt}
                onChangeText={setPrompt}
                placeholder="e.g. warm editorial portfolio for a ceramic artist"
                placeholderTextColor="#64748b"
                maxLength={500}
                autoCorrect
                returnKeyType="go"
                onSubmitEditing={() => void generate()}
                accessibilityLabel="Describe the page you want to generate"
              />
              <Pressable
                onPress={() => void generate()}
                disabled={generating || saving || prompt.trim().length < 2}
                className={`${UI.ghostButton} self-start px-3 py-2 disabled:opacity-50`}
                accessibilityRole="button"
              >
                {generating ? (
                  <ActivityIndicator size="small" color={COLORS.accent} />
                ) : (
                  <Text className="text-sm font-medium text-indigo-200">Generate draft</Text>
                )}
              </Pressable>
            </View>

            <View className="flex-row rounded-xl border border-white/10 bg-slate-950/60 p-1">
              <PaneButton
                active={mode === "visual"}
                label="Visual"
                onPress={() => setMode("visual")}
              />
              <PaneButton active={mode === "code"} label="Code" onPress={() => setMode("code")} />
            </View>

            {mode === "visual" ? (
              <VisualProfileBuilder
                source={combinedSource}
                previewDoc={previewDoc}
                previewError={previewError}
                onChange={(nextSource) => {
                  setSource(splitProfileSource(nextSource));
                  setNotice(null);
                }}
              />
            ) : (
              <View className={`${UI.card} gap-3`}>
                <View className="flex-row items-center justify-between gap-3">
                  <Text className="text-base font-semibold text-white">Page source</Text>
                  <Text className="text-xs text-slate-500">
                    {characterCount.toLocaleString()} / {MAX_PROFILE_CHARS.toLocaleString()}
                  </Text>
                </View>

                <View className="flex-row rounded-xl border border-white/10 bg-slate-950/60 p-1">
                  <PaneButton
                    active={pane === "content"}
                    label="HTML"
                    onPress={() => setPane("content")}
                  />
                  <PaneButton
                    active={pane === "styles"}
                    label="CSS"
                    onPress={() => setPane("styles")}
                  />
                </View>

                {pane === "content" ? (
                  <>
                    <Text className={UI.body}>
                      Add the structure and copy for your page. Switch to Visual for building blocks
                      and the interactive overlay.
                    </Text>
                    <TextInput
                      className="min-h-96 rounded-xl border border-slate-200/10 bg-slate-950/80 px-4 py-3 font-mono text-sm leading-5 text-slate-100"
                      value={source?.html ?? ""}
                      onChangeText={(value) => updateSource("html", value)}
                      placeholder={"<main>\n  <h1>Hello</h1>\n</main>"}
                      placeholderTextColor="#64748b"
                      maxLength={MAX_PROFILE_CHARS}
                      multiline
                      textAlignVertical="top"
                      autoCapitalize="none"
                      autoCorrect={false}
                      spellCheck={false}
                      accessibilityLabel="Profile page HTML"
                    />
                  </>
                ) : (
                  <>
                    <Text className={UI.body}>
                      Styles are stored with your page. External scripts are never run.
                    </Text>
                    <TextInput
                      className="min-h-96 rounded-xl border border-slate-200/10 bg-slate-950/80 px-4 py-3 font-mono text-sm leading-5 text-slate-100"
                      value={source?.css ?? ""}
                      onChangeText={(value) => updateSource("css", value)}
                      placeholder={"body {\n  background: #f5f3ee;\n  color: #1f2933;\n}"}
                      placeholderTextColor="#64748b"
                      maxLength={MAX_PROFILE_CHARS}
                      multiline
                      textAlignVertical="top"
                      autoCapitalize="none"
                      autoCorrect={false}
                      spellCheck={false}
                      accessibilityLabel="Profile page CSS"
                    />
                  </>
                )}
              </View>
            )}

            {changed ? (
              <Text className="text-xs text-amber-200">You have unpublished changes.</Text>
            ) : (
              <Text className="text-xs text-slate-500">All changes are saved.</Text>
            )}

            <Pressable
              onPress={openPublicPage}
              disabled={!handle || changed}
              className={`${UI.ghostButton} disabled:opacity-50`}
              accessibilityRole="button"
            >
              <Text className="font-medium text-indigo-200">
                {changed ? "Save to view your changes" : "View public page"}
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PaneButton({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center rounded-lg px-3 py-2 ${active ? "bg-indigo-300" : ""}`}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
    >
      <Text className={`text-sm font-semibold ${active ? "text-slate-950" : "text-slate-400"}`}>
        {label}
      </Text>
    </Pressable>
  );
}
