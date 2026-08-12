export const UI = {
  screen: "flex-1 bg-[#070a18]",
  screenContent: "flex-1 bg-[#070a18] px-5",
  card: "rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20",
  input:
    "rounded-xl border border-slate-200/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500",
  primaryButton: "items-center rounded-xl bg-indigo-300 px-4 py-3 active:opacity-80",
  ghostButton:
    "items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 active:opacity-70",
  eyebrow: "text-xs font-semibold uppercase tracking-[2px] text-indigo-200",
  heading: "text-3xl font-semibold text-white",
  body: "text-sm leading-5 text-slate-400",
  muted: "text-sm text-slate-500",
} as const;

export const COLORS = {
  background: "#070a18",
  accent: "#c4b5fd",
  muted: "#94a3b8",
} as const;
