import { describe, expect, it } from "vitest";
import {
  builderDocument,
  builderNavigation,
  scriptJson,
} from "../src/components/visual-profile-builder-document";

// Regression: react-native-webview only whitelists `about:blank`, so the
// overlay pane's `srcdoc` iframe was cancelled with `Can't open url:
// about:srcdoc` and never rendered.
describe("builder webview navigation", () => {
  it("loads the overlay iframe's srcdoc document", () => {
    expect(builderNavigation("about:srcdoc")).toBe("allow");
  });

  it("loads the builder document itself", () => {
    expect(builderNavigation("about:blank")).toBe("allow");
  });

  it("sends profile links to the browser instead of replacing the editor", () => {
    expect(builderNavigation("https://example.com/shop")).toBe("external");
    expect(builderNavigation("http://example.com/shop")).toBe("external");
  });

  it("blocks everything else", () => {
    expect(builderNavigation("file:///etc/passwd")).toBe("block");
    expect(builderNavigation("javascript:alert(1)")).toBe("block");
    expect(builderNavigation("intent://scan/#Intent;scheme=zxing;end")).toBe("block");
  });
});

describe("builder boot", () => {
  const boot = { source: "<main><h1>Hi</h1></main>", previewDoc: null, previewError: null };

  // Regression: the host pushes state with injectJavaScript/postMessage, which
  // is dropped if it lands before this document's script has run. The preview
  // is fetched on a debounce, so it loses that race routinely and the pane sat
  // on "Building your preview…" for the life of the editor.
  it("asks the host for state once its bridge exists", () => {
    expect(builderDocument(boot)).toContain('send({ type: "ready" })');
  });

  it("carries the preview error so a failed render explains itself", () => {
    const doc = builderDocument({ ...boot, previewError: "network request failed" });
    expect(doc).toContain("network request failed");
    expect(doc).toContain('state.previewError || "Building your preview…"');
  });
});

describe("boot payload escaping", () => {
  // The boot payload is user-authored HTML embedded in a <script>. A raw
  // `</script>` in a profile would end the block and break the whole builder.
  it("cannot close the enclosing script block", () => {
    const nasty = "</script><img src=x onerror=alert(1)>";
    const doc = builderDocument({ source: nasty, previewDoc: null, previewError: null });
    expect(doc).not.toContain(nasty);
    expect(scriptJson(nasty)).not.toMatch(/[<>&]/);
  });

  it("round-trips the source it escaped", () => {
    const source = '<main class="a & b">1 < 2 > 0</main>';
    expect(JSON.parse(scriptJson(source))).toBe(source);
  });
});
