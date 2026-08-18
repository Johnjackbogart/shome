import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const requestHost = forwardedHost || requestHeaders.get("host");
  const host =
    requestHost && /^[a-zA-Z0-9.-]+(?::\d{1,5})?$/.test(requestHost)
      ? requestHost
      : "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol =
    forwardedProtocol === "https" || process.env.NODE_ENV === "production" ? "https" : "http";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "shome — a calmer way to keep up",
    description: "Bring the people and ideas you care about into one intentional space.",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title: "shome — a calmer way to keep up",
      description: "Bring the people and ideas you care about into one intentional space.",
      images: [
        { url: "/og.png", width: 1731, height: 909, alt: "shome — A calmer way to keep up." },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "shome — a calmer way to keep up",
      description: "Bring the people and ideas you care about into one intentional space.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
