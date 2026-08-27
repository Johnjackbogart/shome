"use client";

import type { AppStyle } from "@shome/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type CSSProperties, useState } from "react";
import { ComingSoonForm } from "#/components/ComingSoonForm";
import { DiscoverView } from "#/components/DiscoverView";
import { FeedView } from "#/components/feed/FeedView";
import { ProfileView } from "#/components/ProfileView";
import { SourcesView } from "#/components/SourcesView";
import { authClient } from "#/lib/auth-client";
import type { PublicUser } from "#/lib/types";

type Tab = "feed" | "discover" | "sources" | "profile";

const TABS: { id: Tab; label: string }[] = [
  { id: "feed", label: "Feed" },
  { id: "discover", label: "Discover" },
  { id: "sources", label: "Sources" },
];

export function AppShell({
  initialUser,
  initialAppStyle,
}: {
  initialUser: PublicUser | null;
  initialAppStyle: AppStyle;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("feed");
  const [avatarUrl, setAvatarUrl] = useState(initialUser?.image ?? null);
  const [appStyle, setAppStyle] = useState<AppStyle>(initialAppStyle);

  if (!initialUser) {
    return (
      <main className="relative isolate min-h-dvh overflow-hidden bg-[#070a18] text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(99,102,241,0.23),transparent_28%),radial-gradient(circle_at_91%_88%,rgba(244,114,182,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute top-[-14rem] left-[31%] -z-10 h-[33rem] w-[33rem] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[minmax(0,1.15fr)_minmax(29rem,0.85fr)]">
          <section className="relative flex min-h-[48rem] flex-col items-center border-b border-white/10 px-6 py-7 text-center sm:px-10 sm:py-9 lg:min-h-dvh lg:border-r lg:border-b-0 lg:px-14 lg:py-12 xl:px-20">
            <a
              href="/"
              className="flex w-fit items-center gap-2.5 font-semibold tracking-tight"
              aria-label="shome home"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-indigo-300 text-sm font-black text-slate-950 shadow-[0_0_32px_rgba(165,180,252,0.35)]">
                s
              </span>
              <span className="text-lg">shome</span>
            </a>
            <a
              href="/sign-in"
              className="absolute top-7 right-6 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-medium text-indigo-100 transition hover:border-indigo-200/35 hover:bg-white/[0.08] sm:top-9 sm:right-10 lg:top-12 lg:right-14 xl:right-20"
            >
              Sign in
            </a>

            <div className="my-auto w-full max-w-2xl pt-20 pb-10 lg:pt-28">
              <p className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] text-indigo-200 uppercase">
                <span className="h-px w-7 bg-indigo-300/70" />
                your media, made personal
              </p>
              <h1 className="mx-auto max-w-xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-6xl xl:text-7xl">
                A better way to <span className="text-indigo-300">keep up.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
                Bring the people and ideas you care about into one intentional space—without the
                noise.
              </p>

              <div className="mx-auto mt-12 grid max-w-xl gap-5 sm:grid-cols-3">
                <Feature
                  number="01"
                  title="One calm feed"
                  description="All the voices you follow, gathered in one place."
                />
                <Feature
                  number="02"
                  title="Your rules"
                  description="Shape a feed around your own curiosity."
                />
                <Feature
                  number="03"
                  title="A page for you"
                  description="Share your work with a profile that feels like home."
                />
              </div>
            </div>

            <div className="relative mt-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-5">
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

          <section className="flex items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-14 lg:py-16">
            <div className="w-full max-w-md">
              <div className="mb-9">
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-indigo-200 uppercase">
                  Coming soon
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  A new kind of social home.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  We’re putting the finishing touches on shome. Be first to hear when the doors
                  open.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
                <ComingSoonForm />
              </div>
              <p className="mt-6 text-center text-xs text-slate-500">
                No feeds to chase. No noise to sort through.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <div
      className="app-theme relative isolate min-h-dvh overflow-hidden text-slate-100"
      style={
        {
          "--app-background-color": appStyle.appBackgroundColor,
          "--app-secondary-background-color": appStyle.appSecondaryBackgroundColor,
          "--app-accent-color": appStyle.appAccentColor,
          "--app-secondary-accent-color": appStyle.appSecondaryAccentColor,
          "--app-border-color": appStyle.appBorderStyle,
          "--app-border-radius": appStyle.appBorderRadius,
          "--app-border-line-style": appStyle.appBorderLineStyle,
          "--app-font-family": appStyle.appFont,
          "--app-font-color": appStyle.appFontColor,
          "--app-secondary-text-color": appStyle.appSecondaryTextColor,
          "--app-spacing": appStyle.appSpacing,
        } as CSSProperties
      }
    >
      <div className="app-accent-gradient pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5 py-5 sm:px-10 sm:py-7 lg:px-14">
        <header className="app-secondary-background sticky top-4 z-10 mb-7 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-xl sm:flex-nowrap sm:px-5">
          <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="app-primary-background grid size-8 place-items-center rounded-xl text-sm font-black text-slate-100 shadow-[0_0_24px_rgba(165,180,252,0.3)]">
              s
            </span>
            <span className="text-lg">shome</span>
          </a>
          <nav className="order-3 flex w-full justify-center gap-1 rounded-xl bg-white/[0.035] p-1 sm:order-none sm:w-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition ${
                  tab === t.id
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {initialUser.handle ? (
              <Link
                href={`/p/${encodeURIComponent(initialUser.handle)}`}
                className="rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200"
                aria-label="View your public profile"
              >
                <Avatar avatarUrl={avatarUrl} initialUser={initialUser} />
              </Link>
            ) : (
              <Avatar avatarUrl={avatarUrl} initialUser={initialUser} />
            )}
            {initialUser.handle ? (
              <button
                type="button"
                className="app-secondary-text hidden cursor-pointer text-sm hover:underline sm:inline"
                onClick={() => setTab("profile")}
                aria-label="Edit your page"
              >
                @{initialUser.handle}
              </button>
            ) : (
              <span className="hidden text-sm text-slate-400 sm:inline">{initialUser.email}</span>
            )}
            <button
              type="button"
              className="btn-ghost"
              onClick={async () => {
                await authClient.signOut();
                router.replace("/sign-in");
              }}
            >
              sign out
            </button>
          </div>
        </header>
        <main className="pb-16">
          {tab === "feed" && <FeedView appStyle={appStyle} />}
          {tab === "discover" && <DiscoverView appStyle={appStyle} />}
          {tab === "sources" && <SourcesView appStyle={appStyle} />}
          {tab === "profile" && (
            <ProfileView
              handle={initialUser.handle}
              onAvatarChange={setAvatarUrl}
              appStyle={appStyle}
              onAppStyleChange={setAppStyle}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Avatar({ avatarUrl, initialUser }: { avatarUrl: string | null; initialUser: PublicUser }) {
  if (avatarUrl) {
    return <img className="size-9 rounded-full bg-slate-800 object-cover" src={avatarUrl} alt="" />;
  }

  return (
    <div
      className="grid size-9 place-items-center rounded-full bg-indigo-300 text-sm font-bold text-slate-950"
      aria-hidden="true"
    >
      {(initialUser.displayName || initialUser.handle || initialUser.email)
        .slice(0, 1)
        .toUpperCase()}
    </div>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-indigo-300/80">{number}</p>
      <h2 className="mt-2 text-sm font-medium text-slate-100">{title}</h2>
      <p className="mt-1.5 text-sm leading-5 text-slate-500">{description}</p>
    </div>
  );
}
