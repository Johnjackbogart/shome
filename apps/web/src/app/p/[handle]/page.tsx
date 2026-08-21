import { isPostFont } from "@shome/core";
import { postMedia, posts, profiles, user } from "@shome/db";
import { asc, desc, eq, inArray } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "#/server/db";
import { crossPostLinks, postMediaUrl } from "#/server/posting";
import { hasProfileComponent } from "#/server/profile-components";
import { profileHtmlOrDefault } from "#/server/sanitize";

export const dynamic = "force-dynamic";

export async function generateMetadata(ctx: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await ctx.params;
  return { title: `@${handle} · shome` };
}

export default async function ProfilePage(ctx: { params: Promise<{ handle: string }> }) {
  const { handle } = await ctx.params;
  const db = await getDb();
  const [owner] = await db
    .select()
    .from(user)
    .where(eq(user.username, handle.toLowerCase()))
    .limit(1);
  if (!owner) notFound();
  const [profile] = await db
    .select({ html: profiles.html })
    .from(profiles)
    .where(eq(profiles.userId, owner.id))
    .limit(1);
  const pageEmbedsPosts = hasProfileComponent(
    profileHtmlOrDefault(profile?.html, owner.username ?? handle),
    "posts",
  );
  const profilePosts = pageEmbedsPosts
    ? []
    : await db
        .select()
        .from(posts)
        .where(eq(posts.userId, owner.id))
        .orderBy(desc(posts.createdAt))
        .limit(100);
  const media = profilePosts.length
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
  const mediaByPost = new Map<string, typeof media>();
  for (const attachment of media) {
    const current = mediaByPost.get(attachment.postId) ?? [];
    current.push(attachment);
    mediaByPost.set(attachment.postId, current);
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          {owner.image ? (
            // biome-ignore lint/performance/noImgElement: profile pictures are dynamic user uploads.
            <img
              className="size-11 shrink-0 rounded-full bg-zinc-800 object-cover"
              src={owner.image}
              alt=""
            />
          ) : (
            <div
              className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo-300 font-semibold text-slate-950"
              aria-hidden="true"
            >
              {(owner.name || owner.username || "s").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">{owner.name || `@${owner.username}`}</h1>
            <p className="truncate text-sm text-zinc-400">@{owner.username} · lives on shome</p>
          </div>
        </div>
        <a className="text-lg font-extrabold tracking-tight text-zinc-100" href="/">
          shome
        </a>
      </header>
      {/* Sandboxed (opaque origin, no scripts): the page below is user-authored HTML.
          allow-popups lets its links (forced to target=_blank at sanitize time) open in
          a real tab — escaping the sandbox, since framed/sandboxed navigation is refused
          by most sites via X-Frame-Options. */}
      <iframe
        className="min-h-[72vh] w-full border-0 bg-white"
        sandbox="allow-popups allow-popups-to-escape-sandbox"
        src={`/p/${owner.username}/content`}
        title={`@${owner.username}'s page`}
      />
      {!pageEmbedsPosts && (
        <section className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="mb-4 text-2xl font-bold">Posts</h2>
          {profilePosts.length === 0 ? (
            <p className="text-zinc-400">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {profilePosts.map((post) => {
                const links = crossPostLinks(post);
                const attachments = mediaByPost.get(post.id) ?? [];
                const hasCustomStyle = Boolean(
                  post.borderStyle || post.backgroundColor || post.font || post.fontColor,
                );
                const style = hasCustomStyle
                  ? {
                      borderColor: post.borderStyle ?? undefined,
                      backgroundColor: post.backgroundColor ?? undefined,
                      color: post.fontColor ?? undefined,
                      fontFamily: isPostFont(post.font) ? post.font : undefined,
                    }
                  : undefined;
                return (
                  <article
                    key={post.id}
                    className={`rounded-xl border border-zinc-800 bg-zinc-900 p-4${
                      hasCustomStyle ? " post--custom" : ""
                    }`}
                    style={style}
                  >
                    <p className="whitespace-pre-wrap [overflow-wrap:anywhere]">{post.text}</p>
                    {attachments.length > 0 && (
                      <div className="mt-3 grid gap-2">
                        {attachments.map((attachment) =>
                          attachment.type === "image" ? (
                            // biome-ignore lint/performance/noImgElement: post photos use a dynamic app route without fixed dimensions.
                            <img
                              key={attachment.id}
                              className="max-h-[70vh] w-full rounded-lg object-cover"
                              src={postMediaUrl(attachment.id)}
                              alt=""
                              loading="lazy"
                            />
                          ) : attachment.provider === "cloudflare_stream" &&
                            attachment.providerAssetId ? (
                            <iframe
                              key={attachment.id}
                              className="aspect-video w-full rounded-lg border-0 bg-black"
                              src={`https://iframe.videodelivery.net/${encodeURIComponent(attachment.providerAssetId)}`}
                              title="Post video"
                              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            // biome-ignore lint/a11y/useMediaCaption: caption uploads are not part of the current media contract.
                            <video
                              key={attachment.id}
                              className="max-h-[70vh] w-full rounded-lg bg-black object-contain"
                              controls
                              playsInline
                              preload="metadata"
                            >
                              <source src={postMediaUrl(attachment.id)} />
                              Your browser does not support this video.
                            </video>
                          ),
                        )}
                      </div>
                    )}
                    <footer className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                      <time dateTime={post.createdAt.toISOString()}>
                        {post.createdAt.toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      {links.map((link) => (
                        <a
                          key={link.provider}
                          className="hover:text-zinc-100"
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.provider} ↗
                        </a>
                      ))}
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
