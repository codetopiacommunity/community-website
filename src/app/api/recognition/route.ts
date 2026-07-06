import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { serverError } from "@/lib/api/api-utils";
import { fetchPortalMembers } from "@/lib/portal";

/**
 * Public Wall of Impact feed. Recognition metadata is stored locally; the
 * honoree's identity (name, avatar, roles) is fetched live from portal-core
 * and merged in. Portal data is lightly cached in fetchPortalMembers.
 */
export async function GET() {
  try {
    const recognitions = await prisma.recognition.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    let members: Awaited<ReturnType<typeof fetchPortalMembers>> = [];
    try {
      members = await fetchPortalMembers({ excludeFlagged: true }, 60);
    } catch (err) {
      // Portal unreachable/misconfigured — still render recognitions with fallbacks.
      console.error("Recognition portal merge failed:", err);
    }

    const byUsername = new Map(
      members.map((m) => [m.username.toLowerCase(), m]),
    );

    const entries = recognitions.map((r) => {
      const member = byUsername.get(r.portalUsername.toLowerCase());
      const name = member?.fullName || r.portalUsername;
      const initials = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
      return {
        id: String(r.id),
        slug: r.slug || String(r.id),
        portalUsername: r.portalUsername,
        name,
        role: r.roleLabel || member?.communityRoles?.[0] || "",
        image: member?.profilePictureUrl || initials,
        coverImage: member?.coverImageUrl || "",
        category: r.category,
        awardName: r.awardName,
        period: r.period,
        impactSummary: r.impactSummary,
        domain: r.domain,
        achievements: r.achievements,
      };
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("GET public Recognition Error:", error);
    return serverError("Failed to load recognitions");
  }
}
