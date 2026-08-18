/** A stable, public URL for an uploaded profile picture. */
export function profileAvatarUrl(uploadId: string): string {
  return `/api/profile/avatar/${encodeURIComponent(uploadId)}`;
}
