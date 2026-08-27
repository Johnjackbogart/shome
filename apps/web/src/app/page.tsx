import { DEFAULT_APP_STYLE } from "@shome/core";
import { AppShell } from "#/components/AppShell";
import type { PublicUser } from "#/lib/types";
import { getAppStyleForUser } from "#/server/app-style-data";
import { getSessionOrNull } from "#/server/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSessionOrNull();
  const initialUser: PublicUser | null = session
    ? {
        id: session.user.id,
        email: session.user.email,
        handle: (session.user as { username?: string | null }).username ?? null,
        displayName: session.user.name ?? null,
        image: (session.user as { image?: string | null }).image ?? null,
      }
    : null;
  const initialAppStyle = session
    ? await getAppStyleForUser(session.user.id)
    : { ...DEFAULT_APP_STYLE };

  return <AppShell initialUser={initialUser} initialAppStyle={initialAppStyle} />;
}
