"use client";

import { type FormEvent, useState } from "react";
import { authClient } from "#/lib/auth-client";
import type { PublicUser } from "#/lib/types";

export function AuthForm({ onAuthed }: { onAuthed: (user: PublicUser) => void }) {
  const [mode, setMode] = useState<"signup" | "signin">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          image: (data.user as { image?: string | null }).image ?? null,
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
          image?: string | null;
        };
        onAuthed({
          id: sessionUser.id,
          email: sessionUser.email,
          handle: sessionUser.username ?? null,
          displayName: sessionUser.name ?? null,
          image: sessionUser.image ?? null,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  const labelClass = "block space-y-2";
  const fieldClass =
    "w-full rounded-xl border border-slate-200/10 bg-slate-950/65 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-300/70 focus:bg-slate-950 focus:ring-4 focus:ring-indigo-400/10";

  return (
    <form className="flex w-full flex-col gap-5" onSubmit={submit}>
      <div
        className="grid grid-cols-2 rounded-xl bg-slate-950/55 p-1 text-sm"
        role="tablist"
        aria-label="Account access"
      >
        <button
          type="button"
          className={`cursor-pointer rounded-lg px-3 py-2.5 font-medium transition ${
            mode === "signin"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
          onClick={() => setMode("signin")}
          role="tab"
          aria-selected={mode === "signin"}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`cursor-pointer rounded-lg px-3 py-2.5 font-medium transition ${
            mode === "signup"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
          onClick={() => setMode("signup")}
          role="tab"
          aria-selected={mode === "signup"}
        >
          Create account
        </button>
      </div>

      {mode === "signup" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span className="text-xs font-medium text-slate-300">Handle</span>
            <input
              className={fieldClass}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="yourname"
              pattern="[a-zA-Z0-9_\-]{3,30}"
              title="3–30 characters: letters, digits, dashes, underscores"
              autoComplete="username"
              required
            />
          </label>
          <label className={labelClass}>
            <span className="text-xs font-medium text-slate-300">
              Display name <span className="font-normal text-slate-500">(optional)</span>
            </span>
            <input
              className={fieldClass}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              autoComplete="name"
            />
          </label>
        </div>
      )}

      <label className={labelClass}>
        <span className="text-xs font-medium text-slate-300">Email address</span>
        <input
          className={fieldClass}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>
      <label className={labelClass}>
        <span className="flex items-center justify-between text-xs font-medium text-slate-300">
          Password
          {mode === "signin" && (
            <span className="font-normal text-slate-500">At least 8 characters</span>
          )}
        </span>
        <span className="relative block">
          <input
            className={`${fieldClass} pr-16`}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            required
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
      </label>

      {error && (
        <p
          className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200"
          role="alert"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-indigo-300 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300/30 disabled:cursor-default disabled:opacity-60"
        disabled={busy}
      >
        <span className="relative">
          {busy ? "Just a moment…" : mode === "signup" ? "Create your shome" : "Continue to shome"}
        </span>
      </button>
      {mode === "signup" && (
        <p className="text-center text-xs leading-5 text-slate-500">
          By creating an account, you can start making a feed that is entirely yours.
        </p>
      )}
    </form>
  );
}
