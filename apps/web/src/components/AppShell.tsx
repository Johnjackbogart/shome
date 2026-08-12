"use client";

import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { FeedView } from "@/components/FeedView";
import { ProfileView } from "@/components/ProfileView";
import { SourcesView } from "@/components/SourcesView";
import { authClient } from "@/lib/auth-client";
import type { PublicUser } from "@/lib/types";

type Tab = "feed" | "sources" | "profile";

const TABS: { id: Tab; label: string }[] = [
  { id: "feed", label: "Feed" },
  { id: "sources", label: "Sources" },
  { id: "profile", label: "My page" },
];

export function AppShell({ initialUser }: { initialUser: PublicUser | null }) {
  const [user, setUser] = useState(initialUser);
  const [tab, setTab] = useState<Tab>("feed");

  if (!user) {
    return (
      <main className="relative isolate min-h-dvh overflow-hidden bg-[#070a18] text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(99,102,241,0.23),transparent_28%),radial-gradient(circle_at_91%_88%,rgba(244,114,182,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute top-[-14rem] left-[31%] -z-10 h-[33rem] w-[33rem] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[minmax(0,1.15fr)_minmax(29rem,0.85fr)]">
          <section className="relative flex min-h-[48rem] flex-col border-b border-white/10 px-6 py-7 sm:px-10 sm:py-9 lg:min-h-dvh lg:border-r lg:border-b-0 lg:px-14 lg:py-12 xl:px-20">
            <a href="/" className="flex w-fit items-center gap-2.5 font-semibold tracking-tight" aria-label="shome home">
              <span className="grid size-8 place-items-center rounded-xl bg-indigo-300 text-sm font-black text-slate-950 shadow-[0_0_32px_rgba(165,180,252,0.35)]">
                s
              </span>
              <span className="text-lg">shome</span>
            </a>

            <div className="my-auto max-w-2xl pt-20 pb-10 lg:pt-28">
              <p className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-indigo-200 uppercase">
                <span className="h-px w-7 bg-indigo-300/70" />
                your media, made personal
              </p>
              <h1 className="max-w-xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-6xl xl:text-7xl">
                A better way to <span className="text-indigo-300">keep up.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
                Bring the people and ideas you care about into one intentional space—without the noise.
              </p>

              <div className="mt-12 grid max-w-xl gap-5 sm:grid-cols-3">
                <Feature number="01" title="One calm feed" description="All the voices you follow, gathered in one place." />
                <Feature number="02" title="Your rules" description="Shape a feed around your own curiosity." />
                <Feature number="03" title="A page for you" description="Share your work with a profile that feels like home." />
              </div>
            </div>

            <div className="relative mt-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-5">
              <div className="absolute -top-14 right-3 size-32 rounded-full bg-indigo-400/15 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-indigo-300 to-violet-500 text-xs font-bold text-slate-950">
                    M
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">Your daily mix</p>
                    <p className="text-xs text-slate-500">12 fresh pieces from your sources</p>
                  </div>
                </div>
                <span className="rounded-full bg-indigo-300/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-indigo-200 uppercase">
                  live
                </span>
              </div>
              <div className="relative mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 text-xs">
                <span className="mt-1 size-2 rounded-full bg-rose-300" />
                <span className="h-2.5 w-4/5 rounded-full bg-white/15" />
                <span className="mt-1 size-2 rounded-full bg-indigo-300" />
                <span className="h-2.5 w-3/5 rounded-full bg-white/10" />
                <span className="mt-1 size-2 rounded-full bg-sky-300" />
                <span className="h-2.5 w-2/3 rounded-full bg-white/10" />
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="w-full max-w-md">
              <div className="mb-9">
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-indigo-200 uppercase">Welcome in</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Make yourself at home.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">Sign in to tune into the feed you made for yourself.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
                <AuthForm onAuthed={setUser} />
              </div>
              <p className="mt-6 text-center text-xs text-slate-500">Your sources stay yours. Always.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <header className="sticky top-0 z-10 mb-6 flex items-center gap-6 border-b border-zinc-800 bg-zinc-950/90 py-3 backdrop-blur">
        <span className="text-lg font-extrabold tracking-tight">shome</span>
        <nav className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`cursor-pointer rounded-full px-3 py-1 ${
                tab === t.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-100"
              }`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {user.handle ? (
            <a
              className="text-accent hover:underline"
              href={`/p/${user.handle}`}
              target="_blank"
              rel="noreferrer"
            >
              @{user.handle}
            </a>
          ) : (
            <span className="text-zinc-400">{user.email}</span>
          )}
          <button
            type="button"
            className="btn-ghost"
            onClick={async () => {
              await authClient.signOut();
              setUser(null);
            }}
          >
            sign out
          </button>
        </div>
      </header>
      <main>
        {tab === "feed" && <FeedView />}
        {tab === "sources" && <SourcesView />}
        {tab === "profile" && <ProfileView handle={user.handle} />}
      </main>
    </div>
  );
}

function Feature({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-indigo-300/80">{number}</p>
      <h2 className="mt-2 text-sm font-medium text-slate-100">{title}</h2>
      <p className="mt-1.5 text-sm leading-5 text-slate-500">{description}</p>
    </div>
  );
}
