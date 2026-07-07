import { prisma } from "@/../prisma/prisma";
import {
  fetchPortalMembers,
  fetchPortalRoles,
  getPortalProfileUrl,
  isTeamRole,
  type PortalCareerProgression,
  type PortalMember,
} from "@/lib/portal";

export type PublicTeamMember = {
  id: number | string;
  slug: string;
  name: string;
  role: string;
  imageUrl: string | null;
  statement: string;
  expertise: string[];
  tier: string;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
  position: string | null;
  location: string | null;
  socialLinks: { platform: string; label: string; url: string }[];
  joinedAt: string | null;
  communityProfileUrl: string | null;
  careerProgressions: PortalCareerProgression[];
};

export type TeamTier = { value: string; label: string };

function portalMemberToTeamMember(
  member: PortalMember,
  tier: string,
  label: string,
): PublicTeamMember {
  return {
    id: member.username,
    slug: member.username,
    name: member.fullName || member.username,
    role: label,
    imageUrl: member.profilePictureUrl || null,
    statement: member.bio || "",
    expertise: member.skills,
    tier,
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

/**
 * The "team" categories and their members are both driven by the portal's
 * role registry now, not a hardcoded list here -- any role an admin marks
 * public in the portal (other than "member") shows up as a team category
 * automatically, with no code change on this side.
 */
async function fetchPortalTeamMembers(): Promise<{
  members: PublicTeamMember[];
  tiers: TeamTier[];
}> {
  const roles = await fetchPortalRoles();
  const teamRoles = roles.filter(isTeamRole);

  const byUsername = new Map<string, PublicTeamMember>();
  for (const role of teamRoles) {
    try {
      const members = await fetchPortalMembers(
        { role: role.name, excludeFlagged: true },
        60,
      );
      for (const member of members) {
        if (!member.username) continue;
        const key = member.username.toLowerCase();
        if (!byUsername.has(key)) {
          byUsername.set(
            key,
            portalMemberToTeamMember(member, role.name, role.displayName),
          );
        }
      }
    } catch (error) {
      console.error(`Team portal role fetch failed for ${role.name}:`, error);
    }
  }

  return {
    members: Array.from(byUsername.values()),
    tiers: teamRoles.map((r) => ({ value: r.name, label: r.displayName })),
  };
}

/**
 * Merges locally-curated team members (admin panel) with the portal-derived
 * ones, shared by both /api/team (the full team page) and the homepage
 * team preview -- one source of truth for "who's on the team" and how the
 * two lists get combined.
 */
export async function getTeamData(): Promise<{
  members: PublicTeamMember[];
  tiers: TeamTier[];
}> {
  const localMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "desc" },
  });

  let portalMembers: PublicTeamMember[] = [];
  let portalTiers: TeamTier[] = [];
  try {
    const result = await fetchPortalTeamMembers();
    portalMembers = result.members;
    portalTiers = result.tiers;
  } catch (error) {
    console.error("Team portal merge failed:", error);
  }

  const localSlugs = new Set(localMembers.map((m) => m.slug.toLowerCase()));
  const mergedPortalMembers = portalMembers.filter(
    (member) => !localSlugs.has(member.slug.toLowerCase()),
  );

  // Locally-curated members (admin panel) can carry a tier that doesn't
  // correspond to any portal role -- surface those as filter options too
  // so they stay reachable instead of falling into an untitled bucket.
  const portalTierValues = new Set(portalTiers.map((t) => t.value));
  const localOnlyTiers = [...new Set(localMembers.map((m) => m.tier))]
    .filter((tier) => !portalTierValues.has(tier))
    .map((tier) => ({ value: tier, label: tier }));

  // Local rows only carry the columns admins fill in by hand -- the rest
  // (position, location, socials beyond github/linkedin/twitter, join date,
  // a linked portal profile) simply don't apply to them.
  const publicLocalMembers: PublicTeamMember[] = localMembers.map((m) => ({
    id: m.id,
    slug: m.slug,
    name: m.name,
    role: m.role,
    imageUrl: m.imageUrl,
    statement: m.statement,
    expertise: m.expertise,
    tier: m.tier,
    github: m.github,
    linkedin: m.linkedin,
    twitter: m.twitter,
    website: null,
    position: null,
    location: null,
    socialLinks: [],
    joinedAt: null,
    communityProfileUrl: null,
    careerProgressions: [],
  }));

  return {
    members: [...publicLocalMembers, ...mergedPortalMembers],
    tiers: [...portalTiers, ...localOnlyTiers],
  };
}
