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
  "video",
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
  "time",
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
      video: ["src", "controls", "playsinline", "preload", "class", "id", "style"],
      td: ["colspan", "rowspan", "class", "id", "style"],
      th: ["colspan", "rowspan", "class", "id", "style"],
      time: ["datetime", "class", "id", "style"],
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
  const safeHandle = sanitizeHtml(handle, { allowedTags: [] });
  return `<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    min-width: 320px;
    background: #f5f3ee;
    color: #1f2933;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .profile {
    width: min(100%, 72rem);
    margin: 0 auto;
    padding: clamp(1rem, 4vw, 3rem);
  }
  .profile__topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #d9d6cf;
    color: #5a6270;
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .profile__mark { color: #df5b2c; }
  .profile__hero {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(12rem, .65fr);
    gap: clamp(2rem, 7vw, 6rem);
    align-items: end;
    padding: clamp(3.5rem, 10vw, 7.5rem) 0 clamp(3.5rem, 8vw, 5.5rem);
  }
  .profile__eyebrow {
    margin: 0 0 1rem;
    color: #df5b2c;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .profile__title {
    max-width: 12ch;
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.25rem, 9vw, 7.5rem);
    font-weight: 400;
    letter-spacing: -.07em;
    line-height: .88;
  }
  .profile__intro {
    margin: 0;
    padding-bottom: .45rem;
    color: #505966;
    font-size: clamp(1rem, 2vw, 1.28rem);
    line-height: 1.65;
  }
  .profile__divider { border: 0; border-top: 1px solid #d9d6cf; margin: 0; }
  .profile__section { padding: clamp(2.75rem, 6vw, 5rem) 0; }
  .profile__section-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin: 0 0 1.5rem;
  }
  .profile__section-heading h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 400;
    letter-spacing: -.04em;
  }
  .profile__section-heading span {
    color: #747d89;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .profile__about {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
  .profile__about-card {
    min-height: 13rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: 1rem;
    background: #e5ebe6;
  }
  .profile__about-card--accent { background: #1f2933; color: #f8f7f2; }
  .profile__about-card p { max-width: 34rem; margin: 0; font-size: 1.05rem; line-height: 1.65; }
  .profile__about-card small { display: block; margin-bottom: 1rem; color: #657069; font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
  .profile__about-card--accent small { color: #f4a88e; }
  .profile__posts .shome-post { border-color: #d9d6cf; border-radius: 1rem; background: #fffefa; }
  .profile__posts .shome-post__footer { color: #68717d; }
  .profile__posts .shome-post__link { color: #c54b23; font-weight: 700; }
  .profile__empty { padding: 1.5rem; border: 1px dashed #bdb9af; border-radius: 1rem; color: #68717d; }
  .profile__footer { padding: 2rem 0 .5rem; color: #747d89; font-size: .9rem; }
  @media (max-width: 640px) {
    .profile__hero, .profile__about { grid-template-columns: 1fr; }
    .profile__hero { gap: 1.5rem; }
    .profile__title { max-width: 10ch; }
  }
</style>
<main class="profile">
  <header class="profile__topline">
    <span><span class="profile__mark">●</span> shome / personal page</span>
    <span>@${safeHandle}</span>
  </header>

  <section class="profile__hero">
    <div>
      <p class="profile__eyebrow">Welcome in</p>
      <h1 class="profile__title">A little more about me.</h1>
    </div>
    <p class="profile__intro">This is my own corner of the internet: a place for the things I’m making, noticing, and thinking about.</p>
  </section>

  <hr class="profile__divider">

  <section class="profile__section">
    <div class="profile__section-heading">
      <h2>Right now</h2>
      <span>About this space</span>
    </div>
    <div class="profile__about">
      <article class="profile__about-card">
        <small>Making</small>
        <p>Small projects, good conversations, and a collection of work that is still taking shape.</p>
      </article>
      <article class="profile__about-card profile__about-card--accent">
        <small>Keeping</small>
        <p>A running record of what matters to me, shared on my own terms.</p>
      </article>
    </div>
  </section>

  <hr class="profile__divider">

  <section class="profile__section profile__posts">
    <div class="profile__section-heading">
      <h2>From the notebook</h2>
      <span>Latest posts</span>
    </div>
    <shome-posts />
  </section>

  <footer class="profile__footer">Made with care on shome.</footer>
</main>`;
}

export function profileHtmlOrDefault(html: string | null | undefined, handle: string): string {
  return html?.trim() ? html : defaultProfileHtml(handle);
}
