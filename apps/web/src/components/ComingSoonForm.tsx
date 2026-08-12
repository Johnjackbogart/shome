"use client";

import { type FormEvent, useState } from "react";

type FormStatus = "idle" | "saving" | "success" | "error";

export function ComingSoonForm() {
  const [email, setEmail] = useState("");
  const [waitlist, setWaitlist] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!waitlist && !newsletter) {
      setError("Choose the waitlist, the newsletter, or both.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, waitlist, newsletter }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error ?? "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-5 py-6 text-center"
        aria-live="polite"
      >
        <span className="mx-auto grid size-10 place-items-center rounded-full bg-emerald-200 text-lg font-bold text-emerald-950">
          ✓
        </span>
        <h3 className="mt-4 text-lg font-semibold text-white">You’re on the list.</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/70">
          We’ll send the good stuff to {email.trim()}—only when there’s something worth sharing.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={submit}>
      <p className="text-sm leading-6 text-slate-400">
        Choose what you’d like to hear about. We’ll keep it thoughtful and occasional.
      </p>

      <label className="block space-y-2">
        <span className="text-xs font-medium text-slate-300">Email address</span>
        <input
          className="w-full rounded-xl border border-slate-200/10 bg-slate-950/65 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-300/70 focus:bg-slate-950 focus:ring-4 focus:ring-indigo-400/10"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-slate-300">Keep me in the loop about</legend>
        <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-slate-950/35 p-3.5 transition hover:border-indigo-200/25">
          <input
            className="mt-0.5 size-4 cursor-pointer accent-indigo-300"
            type="checkbox"
            checked={waitlist}
            onChange={(event) => setWaitlist(event.target.checked)}
          />
          <span>
            <span className="block text-sm font-medium text-slate-100">Early access</span>
            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
              A note when shome is ready for you.
            </span>
          </span>
        </label>
        <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-slate-950/35 p-3.5 transition hover:border-indigo-200/25">
          <input
            className="mt-0.5 size-4 cursor-pointer accent-indigo-300"
            type="checkbox"
            checked={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
          />
          <span>
            <span className="block text-sm font-medium text-slate-100">The shome letter</span>
            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
              Occasional notes on building a more intentional web.
            </span>
          </span>
        </label>
      </fieldset>

      {status === "error" && (
        <p
          className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200"
          role="alert"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        className="cursor-pointer rounded-xl bg-indigo-300 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300/30 disabled:cursor-default disabled:opacity-60"
        disabled={status === "saving"}
      >
        {status === "saving" ? "Saving your spot…" : "Keep me in the loop"}
      </button>
    </form>
  );
}
