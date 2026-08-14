import type { Db } from "@shome/db";
import { renderProfileComponents } from "./profile-components";
import { defaultProfileHtml, sanitizeProfileHtml } from "./sanitize";

// No scripts, no external requests beyond images/media/fonts. Served as a
// response header for direct navigation to the content route, and repeated as a
// meta tag inside the document so the same policy still applies when the editor
// renders an unsaved draft through `srcdoc`, where there is no response to hang
// headers off.
export const PROFILE_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src https: data:; media-src https:; font-src https: data:";

/**
 * Builds the full profile document rendered inside the sandboxed iframe. Both
 * the public page and the editor's live preview go through here so a draft is
 * rendered and sanitized exactly the way it will be once published.
 */
export async function renderProfileDocument({
  db,
  userId,
  html,
  handle,
}: {
  db: Db;
  userId: string;
  html: string | null;
  handle: string;
}): Promise<string> {
  const inner = html?.trim()
    ? sanitizeProfileHtml(await renderProfileComponents({ db, userId, html }))
    : defaultProfileHtml(handle);

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${PROFILE_CSP}">
</head>
<body>${inner}</body>
</html>`;
}
