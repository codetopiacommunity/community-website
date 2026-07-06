import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { serverError } from "@/lib/api/api-utils";
import {
  fetchPortalMembers,
  fetchPortalRoles,
  isTeamRole,
  type PortalMember,
} from "@/lib/portal";

type PublicTeamMember = {
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
};

type TeamTier = { value: string; label: string };

function portalMemberToTeamMember(
  member: PortalMember,
  tier: string,
  label: string,
): PublicTeamMember {
  return {
    id: member.communityId || member.username,
    slug: member.username,
    name: member.fullName || member.username,
    role: label,
    imageUrl: member.profilePictureUrl || null,
    statement: "",
    expertise: member.communityRoles,
    tier,
    github: null,
    linkedin: null,
    twitter: null,
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
      console.error(
        `GET Team portal role fetch failed for ${role.name}:`,
        error,
      );
    }
  }

  return {
    members: Array.from(byUsername.values()),
    tiers: teamRoles.map((r) => ({ value: r.name, label: r.displayName })),
  };
}

export async function GET() {
  try {
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
      console.error("GET Team portal merge failed:", error);
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

    return NextResponse.json({
      members: [...localMembers, ...mergedPortalMembers],
      tiers: [...portalTiers, ...localOnlyTiers],
    });
  } catch (error) {
    console.error("GET public Team Error:", error);
    return serverError("Failed to fetch team members");
  }
}
