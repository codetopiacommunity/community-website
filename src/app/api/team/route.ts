import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { serverError } from "@/lib/api/api-utils";
import { fetchPortalMembers, type PortalMember } from "@/lib/portal";

type PublicTeamTier = "CORE" | "VOLUNTEER" | "AMBASSADOR";

type PublicTeamMember = {
  id: number | string;
  slug: string;
  name: string;
  role: string;
  imageUrl: string | null;
  statement: string;
  expertise: string[];
  tier: PublicTeamTier;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
};

const PORTAL_TEAM_ROLES: Array<{
  role: string;
  tier: PublicTeamTier;
  label: string;
}> = [
  { role: "core_team", tier: "CORE", label: "Core Team" },
  { role: "volunteer", tier: "VOLUNTEER", label: "Volunteer" },
  { role: "ambassador", tier: "AMBASSADOR", label: "Ambassador" },
];

function portalMemberToTeamMember(
  member: PortalMember,
  tier: PublicTeamTier,
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

async function fetchPortalTeamMembers(): Promise<PublicTeamMember[]> {
  const byUsername = new Map<string, PublicTeamMember>();

  for (const { role, tier, label } of PORTAL_TEAM_ROLES) {
    try {
      const members = await fetchPortalMembers({ role }, 60);
      for (const member of members) {
        if (!member.username) continue;
        const key = member.username.toLowerCase();
        if (!byUsername.has(key)) {
          byUsername.set(key, portalMemberToTeamMember(member, tier, label));
        }
      }
    } catch (error) {
      console.error(`GET Team portal role fetch failed for ${role}:`, error);
    }
  }

  return Array.from(byUsername.values());
}

export async function GET() {
  try {
    const localMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    let portalMembers: PublicTeamMember[] = [];
    try {
      portalMembers = await fetchPortalTeamMembers();
    } catch (error) {
      console.error("GET Team portal merge failed:", error);
    }

    const localSlugs = new Set(localMembers.map((m) => m.slug.toLowerCase()));
    const mergedPortalMembers = portalMembers.filter(
      (member) => !localSlugs.has(member.slug.toLowerCase()),
    );

    return NextResponse.json([...localMembers, ...mergedPortalMembers]);
  } catch (error) {
    console.error("GET public Team Error:", error);
    return serverError("Failed to fetch team members");
  }
}
