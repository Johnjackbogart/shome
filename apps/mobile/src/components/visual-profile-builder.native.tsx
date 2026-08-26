import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import {
  builderDocument,
  builderNavigation,
  scriptJson,
} from "@/components/visual-profile-builder-document";
import { appSurfaceAppearance, useAppStyle } from "@/lib/app-style";
import { UI } from "@/lib/ui";

type Props = {
  source: string;
  previewDoc: string | null;
  previewError: string | null;
  onChange: (source: string) => void;
};

type BuilderMessage = {
  source?: unknown;
  type?: unknown;
  html?: unknown;
};

export function VisualProfileBuilder({ source, previewDoc, previewError, onChange }: Props) {
  const { appStyle } = useAppStyle();
  const webView = useRef<WebView>(null);
  const [document] = useState(() => builderDocument({ source, previewDoc, previewError }));

  const sync = useCallback(() => {
    const input = scriptJson({ source, previewDoc, previewError });
    webView.current?.injectJavaScript(`window.__shomeProfileBuilder?.update(${input}); true;`);
  }, [previewDoc, previewError, source]);

  useEffect(() => {
    sync();
  }, [sync]);

  return (
    <View className={`${UI.card} gap-3`} style={appSurfaceAppearance(appStyle)}>
      <View>
        <Text className="text-base font-semibold text-white">Visual builder</Text>
        <Text className={`mt-1 ${UI.body}`}>
          Compose with blocks, or work directly on the overlaid page preview.
        </Text>
      </View>
      {previewError ? <Text className="text-sm text-rose-300">{previewError}</Text> : null}
      <WebView
        ref={webView}
        source={{ html: document }}
        onLoadEnd={sync}
        onMessage={(event) => {
          let message: BuilderMessage | null = null;
          try {
            message = JSON.parse(event.nativeEvent.data) as BuilderMessage;
          } catch {
            return;
          }
          if (message?.source !== "shome-native-profile-builder") return;
          // The builder asks for state once its bridge exists, so an injection
          // that raced its boot is not lost for the life of the editor.
          if (message.type === "ready") {
            sync();
            return;
          }
          if (
            message.type === "change" &&
            typeof message.html === "string" &&
            message.html !== source
          ) {
            onChange(message.html);
          }
        }}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        // `*` hands every navigation to `builderNavigation` instead of letting
        // the library cancel the overlay's `about:srcdoc` iframe on its own.
        originWhitelist={["*"]}
        onShouldStartLoadWithRequest={(request) => {
          const decision = builderNavigation(request.url);
          if (decision === "external") void WebBrowser.openBrowserAsync(request.url);
          return decision === "allow";
        }}
        style={{
          height: 720,
          backgroundColor: appStyle.appSecondaryBackgroundColor,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
