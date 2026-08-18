import { type Db, profiles } from "@shome/db";
import { defaultProfileHtml } from "./sanitize";

type NewUser = {
  id: string;
  name: string;
  username?: unknown;
};

/**
 * Creates the editable profile document that accompanies every new account.
 * The conflict guard keeps retries from replacing a person's later edits.
 */
export async function createDefaultProfile(db: Db, user: NewUser): Promise<void> {
  const handle =
    typeof user.username === "string" && user.username.trim() ? user.username : user.name;

  await db
    .insert(profiles)
    .values({ userId: user.id, html: defaultProfileHtml(handle) })
    .onConflictDoNothing();
}
