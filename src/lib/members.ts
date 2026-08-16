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

/**
 * How many members share a card position.
 *
 * Every member in a position is mounted so a swap never crossfades into a
 * blank frame, which makes this a payload ceiling rather than a taste call:
 * positions x depth is the number of images the section downloads.
 */
const SLOT_DEPTH = 2;
const CARD_CROP_WIDTH = 560;
const CARD_CROP_HEIGHT = 700;

/**
 * Deals members into card positions.
 *
 * Positions are capped by the roster rather than fixed, so every one gets a
 * full rotation instead of members being spread one-per-card with nothing
 * ever changing -- a community of six fills three rotating positions, not
 * six static ones.
 *
 * Round-robin rather than sliced, so no two positions hold the same person
 * and every position ends up within one card of the same depth: no card sits
 * still while its neighbours rotate. Members with a picture sort first,
 * which lands them in the opening frame of every position.
 */
function dealIntoSlots<T extends { imageUrl: string | null }>(
  members: T[],
  maxSlots: number,
): T[][] {
  if (members.length === 0 || maxSlots < 1) return [];

  const slotCount = Math.max(
    1,
    Math.min(maxSlots, Math.floor(members.length / SLOT_DEPTH)),
  );

  const dealable = [...members]
    .sort((a, b) => Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)))
    .slice(0, slotCount * SLOT_DEPTH);

  const slots: T[][] = Array.from({ length: slotCount }, () => []);
  dealable.forEach((member, index) => {
    slots[index % slotCount].push(member);
  });

  return slots.filter((slot) => slot.length > 0);
}

export async function getShowcaseMemberSlots(
  maxSlots: number,
): Promise<CommunityMember[][]> {
  const members = await getCommunityMembers();

  const cropped = members.map((member) => ({
    ...member,
    imageUrl: member.imageUrl
      ? buildPortraitUrl(member.imageUrl, {
          width: CARD_CROP_WIDTH,
          height: CARD_CROP_HEIGHT,
        })
      : null,
  }));

  return dealIntoSlots(cropped, maxSlots);
}
