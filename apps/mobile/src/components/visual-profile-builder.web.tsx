import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { builderDocument } from "@/components/visual-profile-builder-document";
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
  const frame = useRef<HTMLIFrameElement>(null);
  const [document] = useState(() => builderDocument({ source, previewDoc, previewError }));

  const sync = useCallback(() => {
    frame.current?.contentWindow?.postMessage(
      {
        source: "shome-native-builder-host",
        type: "update",
        input: { source, previewDoc, previewError },
      },
      "*",
    );
  }, [previewDoc, previewError, source]);

  useEffect(() => {
    sync();
  }, [sync]);

  useEffect(() => {
    function receiveMessage(event: MessageEvent<string>) {
      if (event.source !== frame.current?.contentWindow) return;
      let message: BuilderMessage | null = null;
      try {
        message = JSON.parse(event.data) as BuilderMessage;
      } catch {
        return;
      }
      if (message?.source !== "shome-native-profile-builder") return;
      // The builder asks for state once its bridge exists, so an update that
      // raced its boot is not lost for the life of the editor.
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
    }
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [onChange, source, sync]);

  return (
    <View className={`${UI.card} gap-3`}>
      <View>
        <Text className="text-base font-semibold text-white">Visual builder</Text>
        <Text className={`mt-1 ${UI.body}`}>
          Compose with blocks, or work directly on the overlaid page preview.
        </Text>
      </View>
      {previewError ? <Text className="text-sm text-rose-300">{previewError}</Text> : null}
      <iframe
        ref={frame}
        srcDoc={document}
        title="Visual profile builder"
        sandbox="allow-scripts"
        onLoad={sync}
        style={{ width: "100%", height: 720, border: 0, borderRadius: 16, background: "#0f172a" }}
      />
      <Text className={`mt-2 ${UI.body}`}>
        The visual controls update the same draft source as the iOS and Android editor.
      </Text>
    </View>
  );
}
