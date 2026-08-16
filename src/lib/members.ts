import { buildPortraitUrl } from "@/lib/cloudinary-url";
import {
  fetchPortalMembers,
  getPortalProfileUrl,
  type PortalMember,
} from "@/lib/portal";
import type { PublicTeamMember } from "@/lib/team";

/**
 * A member as shown on the public site.
 *
 * Structurally identical to `PublicTeamMember` on purpose: a member and a
 * team member are the same person reached through a different door, so the
 * same `TeamMemberModal` renders both and there is only one profile layout
 * to maintain.
 */
export type CommunityMember = PublicTeamMember;

/**
 * This module covers every member, not the subset holding a public role --
 * that's what `getTeamData()` is for. `role` here is a label for the modal
 * header, not a filter.
 */
const ROLE_FALLBACK = "Member";

/**
 * Portal returns `primaryRole` as either a role name (`core_team`) or its
 * display name (`Core Team`) depending on the role's configuration. Title
 * casing normalises both without needing to know which arrived.
 */
function toRoleLabel(primaryRole: string): string {
  const parts = primaryRole.split(/[\s_-]+/).filter(Boolean);
  if (parts.length === 0) return ROLE_FALLBACK;

  return parts
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Stable, non-alphabetical member ordering.
 *
 * Members should read as a community rather than a directory listing, but a
 * random shuffle would reorder everyone on every ISR regeneration, so a
 * returning visitor sees a different set of faces each minute for no reason.
 *
 * Hashing the username rather than shuffling the array also means a new
 * member drops into their own place instead of reshuffling everyone else's.
 */
function memberOrder(username: string): number {
  // FNV-1a, 32-bit.
  let hash = 2166136261;
  for (let i = 0; i < username.length; i++) {
    hash ^= username.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function portalMemberToCommunityMember(member: PortalMember): CommunityMember {
  return {
    id: member.username,
    slug: member.username,
    name: member.fullName || member.username,
    role: member.primaryRole ? toRoleLabel(member.primaryRole) : ROLE_FALLBACK,
    imageUrl: member.profilePictureUrl || null,
    statement: member.bio || "",
    expertise: member.skills,
    tier: member.primaryRole || "member",
    github: member.githubHandle || null,
    linkedin: member.linkedinUrl || null,
    twitter: member.twitterHandle || null,
    website: member.websiteUrl || null,
    position: member.currentRole || null,
    location: member.location || null,
    socialLinks: member.socialLinks,
    joinedAt: member.joinedAt || null,
    communityProfileUrl: getPortalProfileUrl(member.username),
    careerProgressions: member.careerProgressions,
  };
}

export async function getCommunityMembers(): Promise<CommunityMember[]> {
  const members = await fetchPortalMembers({ excludeFlagged: true }, 60);

  return members
    .filter((member) => member.username)
    .map(portalMemberToCommunityMember)
    .sort((a, b) => memberOrder(a.slug) - memberOrder(b.slug));
}

const CARD_CROP_WIDTH = 560;
const CARD_CROP_HEIGHT = 700;

/**
 * Whole days since the Unix epoch, UTC.
 *
 * Server-only, like the rest of this module -- it holds the portal API key,
 * so it can never reach a client bundle where a clock read would risk a
 * hydration mismatch. Ghana sits on UTC, so the roll happens at local
 * midnight rather than at some arbitrary hour of the night.
 */
function dayIndex(): number {
  return Math.floor(Date.now() / 86_400_000);
}

/**
 * Members for the showcase rows, each with their portrait pre-cropped for
 * the card.
 *
 * One card per member, so `limit` is the number of portraits the section
 * downloads. Rather than always taking the same `limit` members off the
 * front, the window advances a day at a time and wraps -- otherwise the same
 * handful of people occupy the homepage permanently and everyone past the
 * cut never appears at all, which gets steadily more wrong as the community
 * grows.
 *
 * The window runs over members who have uploaded a picture, so a given day
 * can't land on a screen of initials tiles. That fallback is a stand-in, not
 * a draw. Members without a picture are only pulled in to top up a roster too
 * small to fill the rows, and unlike a hash that buried them, appearing is
 * something they can fix in the time it takes to upload a photo.
 */
export async function getShowcaseMembers(
  limit: number,
): Promise<CommunityMember[]> {
  const members = await getCommunityMembers();
  if (members.length === 0) return [];

  const withPhoto = members.filter((member) => member.imageUrl);
  const pool =
    withPhoto.length >= limit
      ? withPhoto
      : [...withPhoto, ...members.filter((member) => !member.imageUrl)];

  // Advance by a full window per day rather than a single member. Stepping by
  // one would take a 500-member community well over a year to show everyone
  // once, and would change only one card of eighteen overnight; stepping by
  // the window covers the same roster in under a month and makes each day a
  // genuinely different set of faces. A pool at or under the limit rotates
  // onto itself, so small communities simply show everyone.
  const offset = (dayIndex() * limit) % pool.length;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];

  return rotated.slice(0, limit).map((member) => ({
    ...member,
    imageUrl: member.imageUrl
      ? buildPortraitUrl(member.imageUrl, {
          width: CARD_CROP_WIDTH,
          height: CARD_CROP_HEIGHT,
        })
      : null,
  }));
}
