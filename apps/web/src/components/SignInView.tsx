"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "#/components/AuthForm";

export function SignInView() {
  const router = useRouter();

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#070a18] px-6 py-10 text-slate-100 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(99,102,241,0.23),transparent_28%),radial-gradient(circle_at_91%_88%,rgba(244,114,182,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute top-[-14rem] left-[31%] -z-10 h-[33rem] w-[33rem] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-md flex-col items-center justify-center text-center">
        <a
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label="shome home"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-indigo-300 text-sm font-black text-slate-950 shadow-[0_0_32px_rgba(165,180,252,0.35)]">
            s
          </span>
          <span className="text-lg">shome</span>
        </a>

        <div className="mt-14 w-full">
          <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-indigo-200 uppercase">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Make yourself at home.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Sign in to tune into the feed you made for yourself.
          </p>

          <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-left shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
            <AuthForm onAuthed={() => router.replace("/")} />
          </div>
          <p className="mt-6 text-xs text-slate-500">Your sources stay yours. Always.</p>
        </div>
      </div>
    </main>
  );
}
