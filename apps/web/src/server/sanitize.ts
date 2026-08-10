import sanitizeHtml from "sanitize-html";

/**
 * Two trust boundaries, two policies:
 *
 * - Item HTML (from connectors) renders inline in people's feeds on the app
 *   origin → tightest allowlist, no styling hooks, applied once at ingest.
 * - Profile HTML (user-authored) renders ONLY inside a fully sandboxed iframe
 *   (opaque origin, no scripts) behind a strict CSP → structural tags plus CSS
 *   are allowed, scripts never; applied at serve time so sanitizer fixes reach
 *   existing profiles.
 */

export function sanitizeItemHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "a",
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "blockquote",
      "code",
      "pre",
      "ul",
      "ol",
      "li",
      "h3",
      "h4",
      "img",
      "figure",
      "figcaption",
      "span",
      "hr",
    ],
    allowedAttributes: {
      // target/rel must be allowlisted or the transformTags additions below are
      // stripped again; the transform overwrites any author-supplied values.
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      }),
    },
    disallowedTagsMode: "discard",
  });
}

const PROFILE_TAGS = [
  "div",
  "section",
  "article",
  "aside",
  "header",
  "footer",
  "nav",
  "main",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "a",
  "img",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "hr",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "span",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "details",
  "summary",
  "mark",
  "small",
  "sub",
  "sup",
  "style",
];

export function sanitizeProfileHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: PROFILE_TAGS,
    // Required by sanitize-html to permit <style>; acceptable because profiles
    // only ever render inside the sandboxed iframe described above.
    allowVulnerableTags: true,
    allowedAttributes: {
      "*": ["class", "id", "style", "title"],
      // target/rel allowlisted so the transformTags additions survive filtering.
      a: ["href", "title", "class", "id", "style", "target", "rel"],
      img: ["src", "alt", "width", "height", "class", "id", "style"],
      td: ["colspan", "rowspan", "class", "id", "style"],
      th: ["colspan", "rowspan", "class", "id", "style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    transformTags: {
      // Links must escape the sandboxed iframe: framed navigation is blocked by
      // most sites' X-Frame-Options, so force a new top-level tab instead.
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
    disallowedTagsMode: "discard",
  });
}

export function defaultProfileHtml(handle: string): string {
  return `<div style="font-family: system-ui, sans-serif; color: #888; padding: 3rem 1rem; text-align: center;">
  <p>@${sanitizeHtml(handle, { allowedTags: [] })} hasn't built their page yet.</p>
</div>`;
}
