import { posts, products, type Db } from "@shome/db";
import { asc, desc, eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";

type ComponentName = "posts" | "products";

const componentNames: ComponentName[] = ["posts", "products"];

// Components intentionally accept no attributes in v1. That keeps their
// server-side data contract narrow; later components can add typed attributes
// through the registry without turning page source into executable code.
function componentPattern(name: ComponentName): RegExp {
  return new RegExp(`<shome-${name}\\s*(?:><\\/shome-${name}\\s*>|\\/\\s*>)`, "gi");
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

async function renderPosts(db: Db, userId: string): Promise<string> {
  const profilePosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt))
    .limit(50);

  const content = profilePosts.length
    ? profilePosts
        .map((post) => {
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
          return `<article class="shome-post">
  <p class="shome-post__text">${escapeTextWithBreaks(post.text)}</p>
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
    .shome-post__footer { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1rem; font-size: .875rem; opacity: .72; }
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
  const visibleProducts = catalog.filter((product) => product.visible && isSafeHttpUrl(product.checkoutUrl));
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
    const markup = name === "posts" ? await renderPosts(db, userId) : await renderProducts(db, userId);
    rendered = rendered.replace(componentPattern(name), () => markup);
  }
  return rendered;
}
