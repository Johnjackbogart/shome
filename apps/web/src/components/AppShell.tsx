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
      <main className="flex min-h-dvh flex-col items-center justify-center gap-2 p-4">
        <h1 className="text-5xl font-extrabold tracking-tight">shome</h1>
        <p className="mb-6 text-zinc-400">your media, in one place</p>
        <AuthForm onAuthed={setUser} />
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
