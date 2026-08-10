import { describe, expect, it } from "vitest";
import { sanitizeItemHtml, sanitizeProfileHtml } from "../src/server/sanitize";

// Regression: transformTags-added attributes are stripped again unless they are
// also in allowedAttributes, which once silently undid the target=_blank fix.
describe("link targets", () => {
  it("profile links open in a new tab with a safe rel", () => {
    const out = sanitizeProfileHtml('<a href="https://bsky.app/">bsky</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it("author-supplied target/rel are overwritten, not honored", () => {
    const out = sanitizeProfileHtml('<a href="https://x.com/" target="_self" rel="opener">x</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
    expect(out).not.toContain("_self");
    expect(out).not.toContain('"opener"');
  });

  it("item links open in a new tab with a safe rel", () => {
    const out = sanitizeItemHtml('<a href="https://bsky.app/">bsky</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer nofollow"');
  });
});

describe("profile sanitization still blocks scripts", () => {
  it("drops script tags and event handlers, keeps style", () => {
    const out = sanitizeProfileHtml(
      '<style>h1{color:red}</style><script>alert(1)</script><img src="https://a.io/a.png" onerror="alert(1)">',
    );
    expect(out).toContain("<style>");
    expect(out).not.toContain("script");
    expect(out).not.toContain("onerror");
  });
});
