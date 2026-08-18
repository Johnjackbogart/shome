import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { builderDocument, scriptJson } from "@/components/visual-profile-builder-document";
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
  const webView = useRef<WebView>(null);
  const [document] = useState(() => builderDocument({ source, previewDoc }));

  const sync = useCallback(() => {
    const input = scriptJson({ source, previewDoc });
    webView.current?.injectJavaScript(`window.__shomeProfileBuilder?.update(${input}); true;`);
  }, [previewDoc, source]);

  useEffect(() => {
    sync();
  }, [sync]);

  return (
    <View className={`${UI.card} gap-3`}>
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
          if (
            message?.source === "shome-native-profile-builder" &&
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
        style={{ height: 720, backgroundColor: "#0f172a", borderRadius: 16 }}
      />
    </View>
  );
}
