import { user } from "@shome/db";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/server/db";

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
      {/* Fully sandboxed (opaque origin, no scripts): the page below is user-authored HTML. */}
      <iframe
        className="w-full flex-1 border-0 bg-white"
        sandbox=""
        src={`/p/${owner.username}/content`}
        title={`@${owner.username}'s page`}
      />
    </div>
  );
}
