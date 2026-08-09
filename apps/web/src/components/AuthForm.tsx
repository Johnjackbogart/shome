"use client";

import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { PublicUser } from "@/lib/types";

export function AuthForm({ onAuthed }: { onAuthed: (user: PublicUser) => void }) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const username = handle.trim().toLowerCase();
        const { data, error: authError } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: displayName.trim() || username,
          username,
        });
        if (authError) throw new Error(authError.message ?? "sign-up failed");
        if (!data) throw new Error("sign-up failed");
        onAuthed({
          id: data.user.id,
          email: data.user.email,
          handle: username,
          displayName: data.user.name ?? null,
        });
      } else {
        const { data, error: authError } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (authError) throw new Error(authError.message ?? "sign-in failed");
        if (!data) throw new Error("sign-in failed");
        const sessionUser = data.user as {
          id: string;
          email: string;
          name?: string | null;
          username?: string | null;
        };
        onAuthed({
          id: sessionUser.id,
          email: sessionUser.email,
          handle: sessionUser.username ?? null,
          displayName: sessionUser.name ?? null,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  const labelClass = "flex flex-col gap-1 text-sm text-zinc-400";

  return (
    <form className="card flex w-full max-w-sm flex-col gap-4" onSubmit={submit}>
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex-1 cursor-pointer border-b-2 pb-1 ${
            mode === "signup" ? "border-accent text-zinc-100" : "border-transparent text-zinc-400"
          }`}
          onClick={() => setMode("signup")}
        >
          create account
        </button>
        <button
          type="button"
          className={`flex-1 cursor-pointer border-b-2 pb-1 ${
            mode === "signin" ? "border-accent text-zinc-100" : "border-transparent text-zinc-400"
          }`}
          onClick={() => setMode("signin")}
        >
          sign in
        </button>
      </div>

      {mode === "signup" && (
        <>
          <label className={labelClass}>
            handle
            <input
              className="input"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="yourname"
              pattern="[a-zA-Z0-9_\-]{3,30}"
              title="3–30 characters: letters, digits, dashes, underscores"
              required
            />
          </label>
          <label className={labelClass}>
            display name <span className="text-zinc-500">(optional)</span>
            <input
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
            />
          </label>
        </>
      )}

      <label className={labelClass}>
        email
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className={labelClass}>
        password
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="btn" disabled={busy}>
        {busy ? "…" : mode === "signup" ? "create account" : "sign in"}
      </button>
    </form>
  );
}
