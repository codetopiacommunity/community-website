/**
 * Stand-in avatar for members who haven't uploaded a profile picture.
 *
 * Deliberately matches portal-web's `getAvatarUrl` (DiceBear 9.x
 * bottts-neutral). Portal-core is the identity source of truth, so a member
 * should have the same face wherever they appear. This app previously
 * inlined `7.x/initials` in four separate places, which meant the same
 * person showed a robot in the portal and letters here.
 *
 * Note: this is for avatar-sized identity chips (the admin member picker,
 * inline bylines). The public Wall of Impact does NOT use it for its poster
 * cards — stretching a 128px square avatar into a 3:4 portrait and
 * desaturating it looks broken. Those use a typographic treatment instead;
 * see `InitialsPoster` in components/about/WallOfImpact.tsx.
 */
export function getMemberAvatarUrl(
  profilePictureUrl: string | null | undefined,
  name: string,
): string {
  const uploaded = profilePictureUrl?.trim();
  if (uploaded) return uploaded;

  const seed = encodeURIComponent(name || "codetopia");
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&size=128`;
}

/**
 * Up-to-two-letter initials for the poster fallback. Falls back to "CT" so a
 * blank-named entry still renders something deliberate.
 */
export function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "CT";
}
