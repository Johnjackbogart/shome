import { expo } from "@better-auth/expo";
import { account, session, user, verification } from "@shome/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { headers } from "next/headers";
import { isAllowedOrigin } from "#/lib/origins";
import { db, getDb } from "./db";
import { createDefaultProfile } from "./default-profile";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        // Better Auth runs this only after the user row exists.
        after: async (createdUser) => {
          await createDefaultProfile(db, createdUser);
        },
      },
    },
  },
  // The mobile app authenticates against these same endpoints. On native its
  // requests originate from the app scheme; under `expo start --web` they come
  // from the Metro dev server, which Better Auth's origin check would otherwise
  // reject before CORS ever mattered.
  trustedOrigins: (request) => {
    const origin = request?.headers.get("origin");
    return origin && isAllowedOrigin(origin) ? ["shome://", origin] : ["shome://"];
  },
  plugins: [
    expo(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
    }),
  ],
});

export type AuthSession = typeof auth.$Infer.Session;

/** Resolves the signed-in session, or null when the request carries none. */
export async function getSessionOrNull(): Promise<AuthSession | null> {
  // Better Auth receives the synchronous database handle at module scope, but
  // PGlite finishes booting asynchronously. Do not let a session lookup race
  // that boot on a cold start.
  await getDb();
  return auth.api.getSession({ headers: await headers() });
}
