import { AppShell } from "@/components/AppShell";
import type { PublicUser } from "@/lib/types";
import { getSessionOrNull } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSessionOrNull();
  const initialUser: PublicUser | null = session
    ? {
        id: session.user.id,
        email: session.user.email,
        handle: (session.user as { username?: string | null }).username ?? null,
        displayName: session.user.name ?? null,
      }
    : null;
  return <AppShell initialUser={initialUser} />;
}
