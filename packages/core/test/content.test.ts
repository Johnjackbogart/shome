import { describe, expect, it } from "vitest";
import { htmlToPlainText } from "../src/content";

describe("htmlToPlainText", () => {
  it("keeps readable text while removing markup and non-content elements", () => {
    expect(
      htmlToPlainText(
        '<p>Hello <a href="https://example.com">world</a> &amp; friends.</p><script>alert("xss")</script><p>Second&nbsp;paragraph.</p>',
      ),
    ).toBe("Hello world & friends.\n\nSecond paragraph.");
  });

  it("decodes numeric entities without treating them as markup", () => {
    expect(htmlToPlainText("<p>Price: &#36;10 &#x26; tax</p>")).toBe("Price: $10 & tax");
  });
});
