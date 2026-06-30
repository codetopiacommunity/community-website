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

const ROLE_TO_TIER: Record<string, PublicTeamTier> = {
  core: "CORE",
  core_team: "CORE",
  volunteer: "VOLUNTEER",
  ambassador: "AMBASSADOR",
};

const TIER_LABELS: Record<PublicTeamTier, string> = {
  CORE: "Core Team",
  VOLUNTEER: "Volunteer",
  AMBASSADOR: "Ambassador",
};

function normalizeRole(role: string): string {
  return role
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function getPortalTier(member: PortalMember): PublicTeamTier | null {
  for (const role of member.communityRoles) {
    const tier = ROLE_TO_TIER[normalizeRole(role)];
    if (tier) return tier;
  }
  return null;
}

function portalMemberToTeamMember(
  member: PortalMember,
): PublicTeamMember | null {
  const tier = getPortalTier(member);
  if (!tier) return null;

  return {
    id: member.communityId || member.username,
    slug: member.username,
    name: member.fullName || member.username,
    role: TIER_LABELS[tier],
    imageUrl: member.profilePictureUrl || null,
    statement: "",
    expertise: member.communityRoles,
    tier,
    github: null,
    linkedin: null,
    twitter: null,
  };
}

function isTeamMember(
  member: PublicTeamMember | null,
): member is PublicTeamMember {
  return member !== null;
}

export async function GET() {
  try {
    const localMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    let portalMembers: PublicTeamMember[] = [];
    try {
      const members = await fetchPortalMembers(undefined, 60);
      portalMembers = members
        .map(portalMemberToTeamMember)
        .filter(isTeamMember);
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


