import { isPostFont } from "@shome/core";
import { type Db, type Post, postMedia, posts, products } from "@shome/db";
import { asc, desc, eq, inArray } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";
import { postMediaUrl } from "./posting";

type ComponentName = "posts" | "products";

const componentNames: ComponentName[] = ["posts", "products"];

// Components intentionally accept no attributes in v1. That keeps their
// server-side data contract narrow; later components can add typed attributes
// through the registry without turning page source into executable code.
function componentPattern(name: ComponentName): RegExp {
  return new RegExp(
    `<shome-${name}\\s*>(?:\\s*)<\\/shome-${name}\\s*>|<shome-${name}\\s*\\/\\s*>`,
    "gi",
  );
}

export function hasProfileComponent(html: string, name: ComponentName): boolean {
  return componentPattern(name).test(html);
}

function escapeHtml(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
}

function escapeTextWithBreaks(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function isSafeHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isHexColor(value: string | null): value is string {
  // Earlier posts stored the browser's short `#fff` default. Continue to
  // render that safe legacy form after the column rename, while new requests
  // use the normalized six-digit form enforced by the API.
  return Boolean(value && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value));
}

function postStyleAttribute(
  post: Pick<Post, "borderStyle" | "backgroundColor" | "font" | "fontColor">,
): string {
  const declarations = [
    isHexColor(post.borderStyle) ? `border-color: ${post.borderStyle}` : null,
    isHexColor(post.backgroundColor) ? `background-color: ${post.backgroundColor}` : null,
    isPostFont(post.font) ? `font-family: ${post.font}` : null,
    isHexColor(post.fontColor) ? `color: ${post.fontColor}` : null,
  ].filter((declaration): declaration is string => Boolean(declaration));
  return declarations.length ? ` style="${declarations.join("; ")}"` : "";
}

async function renderPosts(db: Db, userId: string): Promise<string> {
  const profilePosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt))
    .limit(50);
  const attachments = profilePosts.length
    ? await db
        .select()
        .from(postMedia)
        .where(
          inArray(
            postMedia.postId,
            profilePosts.map((post) => post.id),
          ),
        )
        .orderBy(asc(postMedia.createdAt))
    : [];
  const mediaByPost = new Map<string, typeof attachments>();
  for (const attachment of attachments) {
    const current = mediaByPost.get(attachment.postId) ?? [];
    current.push(attachment);
    mediaByPost.set(attachment.postId, current);
  }

  const content = profilePosts.length
    ? profilePosts
        .map((post) => {
          const media = (mediaByPost.get(post.id) ?? [])
            .map((attachment) => {
              const url = escapeHtml(postMediaUrl(attachment.id));
              const cloudflareEmbedUrl =
                attachment.provider === "cloudflare_stream" && attachment.providerAssetId
                  ? `https://iframe.videodelivery.net/${encodeURIComponent(attachment.providerAssetId)}`
                  : null;
              return attachment.type === "image"
                ? `<img class="shome-post__image" src="${url}" alt="">`
                : cloudflareEmbedUrl
                  ? `<a class="shome-post__video-link" href="${escapeHtml(cloudflareEmbedUrl)}">Watch video ↗</a>`
                  : `<video class="shome-post__video" controls playsinline preload="metadata" src="${url}">Your browser does not support this video.</video>`;
            })
            .join("");
          const links = [
            post.blueskyUrl ? { label: "Bluesky", url: post.blueskyUrl } : null,
            post.mastodonUrl ? { label: "Mastodon", url: post.mastodonUrl } : null,
          ]
            .filter((link): link is { label: string; url: string } => Boolean(link))
            .filter((link) => isSafeHttpUrl(link.url))
            .map(
              (link) =>
                `<a class="shome-post__link" href="${escapeHtml(link.url)}">${link.label} ↗</a>`,
            )
            .join("");
          const hasCustomFontColor = isHexColor(post.fontColor);
          return `<article class="shome-post${hasCustomFontColor ? " shome-post--custom-font-color" : ""}"${postStyleAttribute(post)}>
  <p class="shome-post__text">${escapeTextWithBreaks(post.text)}</p>
  ${media ? `<div class="shome-post__media">${media}</div>` : ""}
  <footer class="shome-post__footer"><time datetime="${post.createdAt.toISOString()}">${post.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</time>${links}</footer>
</article>`;
        })
        .join("\n")
    : '<p class="shome-component__empty">No posts yet.</p>';

  return `<section class="shome-component shome-posts" data-shome-component="posts">
  <style>
    .shome-posts { display: grid; gap: 1rem; }
    .shome-post { padding: 1.25rem; border: 1px solid currentColor; border-radius: .75rem; }
    .shome-post__text { margin: 0; white-space: normal; overflow-wrap: anywhere; }
    .shome-post__media { display: grid; gap: .75rem; margin-top: 1rem; }
    .shome-post__image, .shome-post__video { display: block; max-width: 100%; max-height: 70vh; border-radius: .5rem; background: #000; }
    .shome-post__image { width: 100%; object-fit: cover; }
    .shome-post__video { width: 100%; object-fit: contain; }
    .shome-post__video-link { display: inline-block; }
    .shome-post__footer { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1rem; font-size: .875rem; opacity: .72; }
    .shome-post.shome-post--custom-font-color .shome-post__link { color: inherit; }
  </style>
  ${content}
</section>`;
}

async function renderProducts(db: Db, userId: string): Promise<string> {
  const catalog = await db
    .select()
    .from(products)
    .where(eq(products.userId, userId))
    .orderBy(asc(products.sortOrder), desc(products.createdAt));
  const visibleProducts = catalog.filter(
    (product) => product.visible && isSafeHttpUrl(product.checkoutUrl),
  );
  const content = visibleProducts.length
    ? visibleProducts
        .map((product) => {
          const image = isSafeHttpUrl(product.imageUrl)
            ? `<img class="shome-product__image" src="${escapeHtml(product.imageUrl)}" alt="">`
            : "";
          const description = product.description
            ? `<p class="shome-product__description">${escapeTextWithBreaks(product.description)}</p>`
            : "";
          const price = product.price
            ? `<p class="shome-product__price">${escapeHtml(product.price)}</p>`
            : "";
          return `<article class="shome-product">
  ${image}
  <div class="shome-product__body">
    <h3 class="shome-product__title">${escapeHtml(product.title)}</h3>
    ${description}
    ${price}
    <a class="shome-product__buy" href="${escapeHtml(product.checkoutUrl)}">Buy now ↗</a>
  </div>
</article>`;
        })
        .join("\n")
    : '<p class="shome-component__empty">Nothing in the shop yet.</p>';

  return `<section class="shome-component shome-products" data-shome-component="products">
  <style>
    .shome-products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1.25rem; }
    .shome-product { overflow: hidden; border: 1px solid currentColor; border-radius: .75rem; }
    .shome-product__image { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
    .shome-product__body { padding: 1.1rem; }
    .shome-product__title, .shome-product__description, .shome-product__price { margin: 0 0 .6rem; }
    .shome-product__price { font-weight: 700; }
    .shome-product__buy { display: inline-block; margin-top: .25rem; }
  </style>
  ${content}
</section>`;
}

export async function renderProfileComponents({
  db,
  userId,
  html,
}: {
  db: Db;
  userId: string;
  html: string;
}): Promise<string> {
  let rendered = html;
  for (const name of componentNames) {
    if (!hasProfileComponent(rendered, name)) continue;
    const markup =
      name === "posts" ? await renderPosts(db, userId) : await renderProducts(db, userId);
    rendered = rendered.replace(componentPattern(name), () => markup);
  }
  return rendered;
}
