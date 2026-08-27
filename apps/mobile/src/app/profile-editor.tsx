import { Ionicons } from "@expo/vector-icons";
import {
  APP_SPACING_OPTIONS,
  type AppStyle,
  appSpacingPixels,
  DEFAULT_APP_STYLE,
  DEFAULT_POST_STYLE,
  POST_BORDER_LINE_STYLE_OPTIONS,
  POST_BORDER_RADIUS_OPTIONS,
  POST_FONT_OPTIONS,
  type PostStyle,
} from "@shome/core";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VisualProfileBuilder } from "@/components/visual-profile-builder";
import { api } from "@/lib/api";
import {
  appPrimaryText,
  appSecondaryText,
  appSurfaceAppearance,
  useAppStyle,
} from "@/lib/app-style";
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
  const { appStyle, setAppStyle } = useAppStyle();
  const { data: session } = authClient.useSession();
  const handle = (session?.user as { username?: string | null } | undefined)?.username ?? null;
  const [source, setSource] = useState<ProfileSource | null>(null);
  const [savedSource, setSavedSource] = useState<string | null>(null);
  const [defaultPostStyle, setDefaultPostStyle] = useState<PostStyle>({
    ...DEFAULT_POST_STYLE,
  });
  const [savedPostStyle, setSavedPostStyle] = useState<PostStyle | null>(null);
  const [savedAppStyle, setSavedAppStyle] = useState<AppStyle | null>(null);
  const [mode, setMode] = useState<EditorMode>("visual");
  const [pane, setPane] = useState<EditorPane>("content");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [styleSaving, setStyleSaving] = useState(false);
  const [appStyleSaving, setAppStyleSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const combinedSource = useMemo(() => (source ? combineProfileSource(source) : ""), [source]);
  const defaultStyleChanged = JSON.stringify(defaultPostStyle) !== JSON.stringify(savedPostStyle);
  const appStyleChanged = JSON.stringify(appStyle) !== JSON.stringify(savedAppStyle);
  const pageChanged = source !== null && combinedSource !== savedSource;
  const characterCount = combinedSource.length;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profile, postStyle, memberAppStyle] = await Promise.all([
        api.get<{ html: string }>("/api/profile"),
        api.get<{ defaultPostStyle: PostStyle }>("/api/post-style"),
        api.get<{ appStyle: AppStyle }>("/api/app-style"),
      ]);
      const next = splitProfileSource(profile.html);
      setSource(next);
      setSavedSource(combineProfileSource(next));
      setDefaultPostStyle(postStyle.defaultPostStyle);
      setSavedPostStyle(postStyle.defaultPostStyle);
      setAppStyle(memberAppStyle.appStyle);
      setSavedAppStyle(memberAppStyle.appStyle);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [setAppStyle]);

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

  async function saveDefaultPostStyle() {
    if (!defaultStyleChanged) return;
    setStyleSaving(true);
    setError(null);
    setNotice(null);
    try {
      await api.put("/api/post-style", { defaultPostStyle });
      setSavedPostStyle(defaultPostStyle);
      setNotice("Default post style saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setStyleSaving(false);
    }
  }

  async function saveAppStyle() {
    if (!appStyleChanged) return;
    setAppStyleSaving(true);
    setError(null);
    setNotice(null);
    try {
      await api.put("/api/app-style", { appStyle });
      setSavedAppStyle(appStyle);
      setNotice("App style saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setAppStyleSaving(false);
    }
  }

  function openPublicPage() {
    if (handle) void WebBrowser.openBrowserAsync(`${API_URL}/p/${handle}`);
  }

  return (
    <SafeAreaView
      className={UI.screen}
      style={{ backgroundColor: appStyle.appBackgroundColor }}
      edges={["top", "bottom"]}
    >
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
            <Text className={UI.eyebrow} style={appSecondaryText(appStyle)}>
              Your public page
            </Text>
            <Text
              className="mt-1 text-2xl font-semibold text-white"
              style={appPrimaryText(appStyle)}
            >
              Edit profile
            </Text>
          </View>
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
            <Text className="text-sm leading-5 text-slate-400" style={appSecondaryText(appStyle)}>
              Build with HTML and CSS. Your page is rendered in the same safe sandbox as on the web.
            </Text>

            {error ? <Text className="text-sm text-rose-300">{error}</Text> : null}
            {notice ? <Text className="text-sm text-emerald-300">{notice}</Text> : null}

            <AppStyleEditor
              value={appStyle}
              onChange={(style) => {
                setAppStyle(style);
                setNotice(null);
              }}
              onSave={() => void saveAppStyle()}
              saving={appStyleSaving}
              saved={!appStyleChanged}
            />

            <DefaultPostStyleEditor
              value={defaultPostStyle}
              onChange={(style) => {
                setDefaultPostStyle(style);
                setNotice(null);
              }}
              onSave={() => void saveDefaultPostStyle()}
              saving={styleSaving}
              saved={!defaultStyleChanged}
            />

            <View className={`${UI.card} gap-3`} style={appSurfaceAppearance(appStyle)}>
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
                style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
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
                onSave={() => void save()}
                saving={saving}
                saved={!pageChanged}
                disabled={loading || saving || generating || !pageChanged}
              />
            ) : (
              <View className={`${UI.card} gap-3`} style={appSurfaceAppearance(appStyle)}>
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-white">Page source</Text>
                    <Text className="mt-1 text-xs text-slate-500">
                      {characterCount.toLocaleString()} / {MAX_PROFILE_CHARS.toLocaleString()}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => void save()}
                    disabled={loading || saving || generating || !pageChanged}
                    className="rounded-xl bg-indigo-300 px-3 py-2 active:opacity-80 disabled:opacity-50"
                    accessibilityRole="button"
                    accessibilityLabel="Save page"
                  >
                    {saving ? (
                      <ActivityIndicator size="small" color={COLORS.background} />
                    ) : (
                      <Text className="text-sm font-semibold text-slate-950">
                        {!pageChanged ? "Saved ✓" : "Save"}
                      </Text>
                    )}
                  </Pressable>
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

            {pageChanged ? (
              <Text className="text-xs text-amber-200">You have unpublished page changes.</Text>
            ) : (
              <Text className="text-xs text-slate-500">All page changes are saved.</Text>
            )}

            <Pressable
              onPress={openPublicPage}
              disabled={!handle || pageChanged}
              className={`${UI.ghostButton} disabled:opacity-50`}
              accessibilityRole="button"
            >
              <Text className="font-medium text-indigo-200">
                {pageChanged ? "Save to view your changes" : "View public page"}
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function AppStyleEditor({
  value,
  onChange,
  onSave,
  saving,
  saved,
}: {
  value: AppStyle;
  onChange: (style: AppStyle) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  function update<K extends keyof AppStyle>(key: K, next: AppStyle[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <View
      className={`${UI.card} gap-3`}
      style={{
        backgroundColor: value.appSecondaryBackgroundColor,
        borderColor: value.appBorderStyle,
        borderRadius: Number.parseInt(value.appBorderRadius, 10),
        borderStyle: value.appBorderLineStyle,
      }}
    >
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <Text className="text-base font-semibold text-white">App style</Text>
          <Text className={`mt-1 ${UI.body}`}>
            Your colors, type, borders, and shape follow you throughout the signed-in app.
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Pressable
          onPress={() => onChange({ ...DEFAULT_APP_STYLE })}
          className={`${UI.ghostButton} px-3 py-2`}
          style={{
            borderColor: value.appBorderStyle,
            borderRadius: Number.parseInt(value.appBorderRadius, 10),
            borderStyle: value.appBorderLineStyle,
          }}
          accessibilityRole="button"
          accessibilityLabel="Reset app style"
        >
          <Text className="text-sm font-medium" style={appPrimaryText(value)}>
            Reset
          </Text>
        </Pressable>
        <Pressable
          onPress={onSave}
          disabled={saving || saved}
          className="rounded-xl bg-indigo-300 px-3 py-2 active:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: value.appAccentBackgroundColor }}
          accessibilityRole="button"
          accessibilityLabel="Save app style"
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text className="text-sm font-semibold text-slate-950">
              {saved ? "Saved ✓" : "Save app style"}
            </Text>
          )}
        </Pressable>
      </View>

      <View
        className="rounded-xl border p-3"
        style={{
          backgroundColor: value.appBackgroundColor,
          borderColor: value.appBorderStyle,
          borderRadius: Number.parseInt(value.appBorderRadius, 10),
          borderStyle: value.appBorderLineStyle,
          gap: appSpacingPixels(value.appSpacing),
        }}
      >
        <View
          className="border px-4 py-3"
          style={{
            backgroundColor: value.appAccentBackgroundColor,
            borderColor: value.appBorderStyle,
            borderRadius: Number.parseInt(value.appBorderRadius, 10),
            borderStyle: value.appBorderLineStyle,
          }}
        >
          <Text
            style={{
              color: value.appSecondaryTextColor,
              fontFamily: value.appFont,
            }}
          >
            Search your feed…
          </Text>
        </View>
        <View className="flex-row gap-2">
          {["Filters", "Fetch new"].map((label) => (
            <View
              key={label}
              className="rounded-lg border px-3 py-2"
              style={{
                backgroundColor: value.appSecondaryBackgroundColor,
                borderColor: value.appBorderStyle,
                borderRadius: Number.parseInt(value.appBorderRadius, 10),
                borderStyle: value.appBorderLineStyle,
              }}
            >
              <Text
                style={{
                  color: value.appAccentFontColor,
                  fontFamily: value.appFont,
                }}
              >
                {label}
              </Text>
            </View>
          ))}
          <View
            className="rounded-lg border px-3 py-2"
            style={{
              backgroundColor: value.appAccentBackgroundColor,
              borderColor: value.appBorderStyle,
              borderRadius: Number.parseInt(value.appBorderRadius, 10),
              borderStyle: value.appBorderLineStyle,
            }}
          >
            <Text style={{ color: value.appFontColor, fontFamily: value.appFont }}>
              Create post
            </Text>
          </View>
        </View>
        <View style={{ gap: appSpacingPixels(value.appSpacing) }}>
          {["Your shome", "Another post"].map((title) => (
            <View
              key={title}
              className="gap-2 border p-4"
              style={{
                backgroundColor: value.appSecondaryBackgroundColor,
                borderColor: value.appBorderStyle,
                borderRadius: Number.parseInt(value.appBorderRadius, 10),
                borderStyle: value.appBorderLineStyle,
              }}
            >
              <Text
                style={{
                  color: value.appFontColor,
                  fontFamily: value.appFont,
                  fontWeight: "600",
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  color: value.appSecondaryTextColor,
                  fontFamily: value.appFont,
                }}
              >
                Previewing the space between feed posts.
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text className="text-xs text-slate-400">Use six-digit hex colors, such as #070a18.</Text>
      <View className="flex-row gap-2">
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Background color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appBackgroundColor}
            onChangeText={(next) => update("appBackgroundColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App background color"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Secondary background</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appSecondaryBackgroundColor}
            onChangeText={(next) => update("appSecondaryBackgroundColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App secondary background color"
          />
        </View>
      </View>

      <View className="gap-1">
        <Text className="text-xs text-slate-400">Accent background</Text>
        <TextInput
          className={`${UI.input} py-2 text-sm`}
          style={{ borderColor: value.appBorderStyle }}
          value={value.appAccentBackgroundColor}
          onChangeText={(next) => update("appAccentBackgroundColor", next)}
          autoCapitalize="characters"
          maxLength={7}
          accessibilityLabel="App accent background color"
        />
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Accent color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appAccentColor}
            onChangeText={(next) => update("appAccentColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App accent color"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Secondary accent</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appSecondaryAccentColor}
            onChangeText={(next) => update("appSecondaryAccentColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App secondary accent color"
          />
        </View>
      </View>

      <View className="gap-1">
        <Text className="text-xs text-slate-400">Border color</Text>
        <TextInput
          className={`${UI.input} py-2 text-sm`}
          style={{ borderColor: value.appBorderStyle }}
          value={value.appBorderStyle}
          onChangeText={(next) => update("appBorderStyle", next)}
          autoCapitalize="characters"
          maxLength={7}
          accessibilityLabel="App border color"
        />
      </View>

      <Text className="text-xs text-slate-400">Border radius</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_BORDER_RADIUS_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.appBorderRadius === option.value}
            onPress={() => update("appBorderRadius", option.value)}
          />
        ))}
      </View>

      <Text className="text-xs text-slate-400">Border style</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_BORDER_LINE_STYLE_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.appBorderLineStyle === option.value}
            onPress={() => update("appBorderLineStyle", option.value)}
          />
        ))}
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Font color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appFontColor}
            onChangeText={(next) => update("appFontColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App font color"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Secondary text</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            style={{ borderColor: value.appBorderStyle }}
            value={value.appSecondaryTextColor}
            onChangeText={(next) => update("appSecondaryTextColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="App secondary text color"
          />
        </View>
      </View>

      <View className="gap-1">
        <Text className="text-xs text-slate-400">Accent font color</Text>
        <TextInput
          className={`${UI.input} py-2 text-sm`}
          style={{ borderColor: value.appBorderStyle }}
          value={value.appAccentFontColor}
          onChangeText={(next) => update("appAccentFontColor", next)}
          autoCapitalize="characters"
          maxLength={7}
          accessibilityLabel="App accent font color"
        />
      </View>

      <Text className="text-xs text-slate-400">Font</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_FONT_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.appFont === option.value}
            onPress={() => update("appFont", option.value)}
          />
        ))}
      </View>

      <Text className="text-xs text-slate-400">App spacing</Text>
      <View className="flex-row flex-wrap gap-2">
        {APP_SPACING_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.appSpacing === option.value}
            onPress={() => update("appSpacing", option.value)}
          />
        ))}
      </View>

      <View
        className="flex-row items-center gap-3 rounded-xl border p-3"
        style={{
          borderColor: value.appBorderStyle,
          borderRadius: Number.parseInt(value.appBorderRadius, 10),
          borderStyle: value.appBorderLineStyle,
        }}
      >
        <Switch
          value={value.appOverridePostStyles}
          onValueChange={(next) => update("appOverridePostStyles", next)}
          trackColor={{
            false: "#334155",
            true: value.appAccentBackgroundColor,
          }}
          thumbColor={value.appOverridePostStyles ? "#312e81" : "#cbd5e1"}
          accessibilityLabel="Override post styles"
        />
        <View className="flex-1">
          <Text className="text-sm font-medium text-slate-100">Override post styles</Text>
          <Text className="mt-0.5 text-xs leading-5 text-slate-400">
            Use this complete app style on first-party posts instead of each post’s saved look.
          </Text>
        </View>
      </View>
    </View>
  );
}

function DefaultPostStyleEditor({
  value,
  onChange,
  onSave,
  saving,
  saved,
}: {
  value: PostStyle;
  onChange: (style: PostStyle) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  const { appStyle } = useAppStyle();

  function update<K extends keyof PostStyle>(key: K, next: PostStyle[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <View className={`${UI.card} gap-3`} style={appSurfaceAppearance(appStyle)}>
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <Text className="text-base font-semibold text-white">Default post style</Text>
          <Text className={`mt-1 ${UI.body}`}>
            New posts start with this look. You can still customize each one before publishing.
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Pressable
          onPress={() => onChange({ ...DEFAULT_POST_STYLE })}
          className={`${UI.ghostButton} px-3 py-2`}
          accessibilityRole="button"
          accessibilityLabel="Reset default post style"
        >
          <Text className="text-sm font-medium" style={appPrimaryText(appStyle)}>
            Reset
          </Text>
        </Pressable>
        <Pressable
          onPress={onSave}
          disabled={saving || saved}
          className="rounded-xl bg-indigo-300 px-3 py-2 active:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
          accessibilityRole="button"
          accessibilityLabel="Save default post style"
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text className="text-sm font-semibold text-slate-950">
              {saved ? "Saved ✓" : "Save default style"}
            </Text>
          )}
        </Pressable>
      </View>

      <View
        className="gap-1 border p-4"
        style={{
          borderColor: value.postBorderStyle,
          borderRadius: Number.parseInt(value.postBorderRadius, 10),
          borderStyle: value.postBorderLineStyle,
          backgroundColor: value.postBackgroundColor,
        }}
      >
        <Text
          style={{
            color: value.postFontColor,
            fontFamily: value.postFont,
            fontWeight: "600",
          }}
        >
          Your next post
        </Text>
        <Text className="mt-1" style={{ color: value.postFontColor, fontFamily: value.postFont }}>
          This preview updates as you edit your default style.
        </Text>
        <Text
          className="mt-2 text-xs"
          style={{
            color: value.postSecondaryTextColor,
            fontFamily: value.postFont,
          }}
        >
          @you · just now
        </Text>
      </View>

      <Text className="text-xs text-slate-400">Use six-digit hex colors, such as #f8fafc.</Text>
      <View className="flex-row gap-2">
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Border color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            value={value.postBorderStyle}
            onChangeText={(next) => update("postBorderStyle", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="Default post border color"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Background color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            value={value.postBackgroundColor}
            onChangeText={(next) => update("postBackgroundColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="Default post background color"
          />
        </View>
      </View>

      <Text className="text-xs text-slate-400">Border radius</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_BORDER_RADIUS_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.postBorderRadius === option.value}
            onPress={() => update("postBorderRadius", option.value)}
          />
        ))}
      </View>

      <Text className="text-xs text-slate-400">Border style</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_BORDER_LINE_STYLE_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.postBorderLineStyle === option.value}
            onPress={() => update("postBorderLineStyle", option.value)}
          />
        ))}
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Font color</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            value={value.postFontColor}
            onChangeText={(next) => update("postFontColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="Default post font color"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-xs text-slate-400">Secondary text</Text>
          <TextInput
            className={`${UI.input} py-2 text-sm`}
            value={value.postSecondaryTextColor}
            onChangeText={(next) => update("postSecondaryTextColor", next)}
            autoCapitalize="characters"
            maxLength={7}
            accessibilityLabel="Default post secondary text color"
          />
        </View>
      </View>

      <Text className="text-xs text-slate-400">Font</Text>
      <View className="flex-row flex-wrap gap-2">
        {POST_FONT_OPTIONS.map((option) => (
          <StyleOption
            key={option.value}
            label={option.label}
            selected={value.postFont === option.value}
            onPress={() => update("postFont", option.value)}
          />
        ))}
      </View>
    </View>
  );
}

function StyleOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { appStyle } = useAppStyle();

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-lg px-3 py-2 ${selected ? "" : "border border-white/10 bg-white/5"}`}
      style={selected ? { backgroundColor: appStyle.appAccentBackgroundColor } : undefined}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
    >
      <Text className={selected ? "text-slate-950" : "text-slate-200"}>{label}</Text>
    </Pressable>
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
