import { expo } from "@better-auth/expo";
import { account, session, user, verification } from "@shome/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { headers } from "next/headers";
import { db, getDb } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: { enabled: true },
  // The mobile app authenticates against these same endpoints; its requests
  // originate from the app scheme rather than an http origin.
  trustedOrigins: ["shome://"],
  plugins: [
    expo(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
    }),
  ],
});

export type AuthSession = typeof auth.$Infer.Session;

/** Resolves the signed-in session (or null), making sure migrations ran first. */
export async function getSessionOrNull(): Promise<AuthSession | null> {
  await getDb();
  return auth.api.getSession({ headers: await headers() });
}
