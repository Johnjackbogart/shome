import { posts, user } from "@shome/db";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db";
import { crossPostLinks } from "@/server/posting";

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
  const profilePosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, owner.id))
    .orderBy(desc(posts.createdAt))
    .limit(100);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">{owner.name || `@${owner.username}`}</h1>
          <p className="text-sm text-zinc-400">@{owner.username} · lives on shome</p>
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
      <section className="mx-auto w-full max-w-3xl px-4 py-12">
        <h2 className="mb-4 text-2xl font-bold">Posts</h2>
        {profilePosts.length === 0 ? (
          <p className="text-zinc-400">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {profilePosts.map((post) => {
              const links = crossPostLinks(post);
              return (
                <article
                  key={post.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <p className="whitespace-pre-wrap [overflow-wrap:anywhere]">{post.text}</p>
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
    </div>
  );
}
