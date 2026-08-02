/**
 * Server-side client for portal-core (the identity backend).
 *
 * Members/roles live in portal-core, not here. We reach them with a scoped
 * API key (profile.view + roles.view) — the same key system the portal admin
 * issues. Never expose PORTAL_API_KEY to the browser; only call these from
 * the server.
 */

const PORTAL_API_URL = process.env.PORTAL_API_URL;
const PORTAL_API_KEY = process.env.PORTAL_API_KEY;
const PORTAL_WEB_URL = process.env.PORTAL_WEB_URL;

export interface PortalSocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface PortalCareerProgression {
  id: number | string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface PortalMember {
  communityId: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
  coverImageUrl: string;
  communityRoles: string[];
  // Highest-ranked *public* role the member holds. Portal-core computes it
  // (private roles like admin are excluded), so prefer this over
  // communityRoles[0] when you want a single headline role.
  primaryRole: string;
  bio: string;
  skills: string[];
  location: string;
  currentRole: string;
  githubHandle: string;
  twitterHandle: string;
  linkedinUrl: string;
  websiteUrl: string;
  socialLinks: PortalSocialLink[];
  joinedAt: string;
  careerProgressions: PortalCareerProgression[];
}

export interface PortalRole {
  name: string;
  displayName: string;
  isPublic: boolean;
}

export function isPortalConfigured(): boolean {
  return Boolean(PORTAL_API_URL && PORTAL_API_KEY);
}

export async function fetchPortalMembers(
  params?: { role?: string; search?: string; excludeFlagged?: boolean },
  revalidate = 60,
): Promise<PortalMember[]> {
  if (!PORTAL_API_URL || !PORTAL_API_KEY) {
    throw new Error(
      "Portal API is not configured (PORTAL_API_URL / PORTAL_API_KEY).",
    );
  }

  const url = new URL(`${PORTAL_API_URL}/api/v1/users/members/`);
  if (params?.role) url.searchParams.set("role", params.role);
  if (params?.search) url.searchParams.set("search", params.search);
  // Public pages must pass this -- portal-core only excludes flagged
  // accounts when explicitly asked. Omit it for internal/admin lookups,
  // where seeing a flagged account is the point (reviewing/managing it).
  if (params?.excludeFlagged) url.searchParams.set("exclude_flagged", "true");

  const res = await fetch(url.toString(), {
    headers: { "X-Api-Key": PORTAL_API_KEY },
    // Light caching so the public Wall doesn't hammer portal on every render.
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Portal members request failed: ${res.status}`);
  }

  const json = await res.json();
  const data: Array<Record<string, unknown>> = json?.data ?? [];
  return data.map((m) => ({
    communityId: String(m.communityId ?? ""),
    username: String(m.username ?? ""),
    fullName: String(m.fullName ?? m.username ?? ""),
    profilePictureUrl: String(m.profilePictureUrl ?? ""),
    coverImageUrl: String(m.coverImageUrl ?? ""),
    communityRoles: Array.isArray(m.communityRoles)
      ? (m.communityRoles as string[])
      : [],
    primaryRole: String(m.primaryRole ?? ""),
    bio: String(m.bio ?? ""),
    skills: Array.isArray(m.skills) ? (m.skills as string[]) : [],
    location: String(m.location ?? ""),
    currentRole: String(m.currentRole ?? ""),
    githubHandle: String(m.githubHandle ?? ""),
    twitterHandle: String(m.twitterHandle ?? ""),
    linkedinUrl: String(m.linkedinUrl ?? ""),
    websiteUrl: String(m.websiteUrl ?? ""),
    socialLinks: Array.isArray(m.socialLinks)
      ? (m.socialLinks as PortalSocialLink[])
      : [],
    joinedAt: String(m.joinedAt ?? ""),
    careerProgressions: Array.isArray(m.careerProgressions)
      ? (m.careerProgressions as Array<Record<string, unknown>>).map((c) => ({
          id: (c.id as number | string) ?? "",
          title: String(c.title ?? ""),
          organization: String(c.organization ?? ""),
          startDate: String(c.startDate ?? ""),
          endDate: c.endDate ? String(c.endDate) : null,
          description: String(c.description ?? ""),
        }))
      : [],
  }));
}

/**
 * All community roles defined in the portal. Requires the API key to also
 * hold `roles.view` (in addition to `profile.view`) -- mint/edit the key in
 * the portal admin under API keys.
 */
export async function fetchPortalRoles(
  revalidate = 300,
): Promise<PortalRole[]> {
  if (!PORTAL_API_URL || !PORTAL_API_KEY) {
    throw new Error(
      "Portal API is not configured (PORTAL_API_URL / PORTAL_API_KEY).",
    );
  }

  const res = await fetch(`${PORTAL_API_URL}/api/v1/roles/`, {
    headers: { "X-Api-Key": PORTAL_API_KEY },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Portal roles request failed: ${res.status}`);
  }

  const json = await res.json();
  const data: Array<Record<string, unknown>> = json?.data ?? [];
  return data.map((r) => ({
    name: String(r.name ?? ""),
    displayName: String(r.displayName ?? r.name ?? ""),
    isPublic: Boolean(r.isPublic),
  }));
}

/**
 * A published Wall of Impact entry. Both the award content and the honoree's
 * identity come from portal-core in one call -- there's nothing to merge, and
 * nothing keyed by a username string that a rename could orphan.
 */
export interface PortalRecognition {
  id: string;
  slug: string;
  username: string;
  communityId: string;
  fullName: string;
  profilePictureUrl: string;
  coverImageUrl: string;
  category: string;
  awardName: string;
  period: string;
  periodStart: string | null;
  periodEnd: string | null;
  impactSummary: string;
  achievements: string[];
  domain: string;
  roleLabel: string;
  featuredRank: number | null;
  publishedAt: string | null;
}

function mapRecognition(r: Record<string, unknown>): PortalRecognition {
  return {
    id: String(r.id ?? ""),
    slug: String(r.slug ?? ""),
    username: String(r.username ?? ""),
    communityId: String(r.communityId ?? ""),
    fullName: String(r.fullName ?? r.username ?? ""),
    profilePictureUrl: String(r.profilePictureUrl ?? ""),
    coverImageUrl: String(r.coverImageUrl ?? ""),
    category: String(r.category ?? "member"),
    awardName: String(r.awardName ?? ""),
    period: String(r.period ?? ""),
    periodStart: r.periodStart ? String(r.periodStart) : null,
    periodEnd: r.periodEnd ? String(r.periodEnd) : null,
    impactSummary: String(r.impactSummary ?? ""),
    achievements: Array.isArray(r.achievements)
      ? (r.achievements as string[])
      : [],
    domain: String(r.domain ?? ""),
    roleLabel: String(r.roleLabel ?? ""),
    featuredRank:
      typeof r.featuredRank === "number" ? (r.featuredRank as number) : null,
    publishedAt: r.publishedAt ? String(r.publishedAt) : null,
  };
}

export async function fetchPortalRecognitions(
  params?: { category?: string; username?: string; limit?: number },
  revalidate = 60,
): Promise<PortalRecognition[]> {
  if (!PORTAL_API_URL || !PORTAL_API_KEY) {
    throw new Error(
      "Portal API is not configured (PORTAL_API_URL / PORTAL_API_KEY).",
    );
  }

  const url = new URL(`${PORTAL_API_URL}/api/v1/recognitions/`);
  if (params?.category) url.searchParams.set("category", params.category);
  if (params?.username) url.searchParams.set("username", params.username);
  if (params?.limit) url.searchParams.set("limit", String(params.limit));

  const res = await fetch(url.toString(), {
    headers: { "X-Api-Key": PORTAL_API_KEY },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Portal recognitions request failed: ${res.status}`);
  }

  const json = await res.json();
  const data: Array<Record<string, unknown>> = json?.data ?? [];
  return data.map(mapRecognition);
}

/**
 * A single published recognition. Returns null when the slug doesn't resolve
 * (unpublished, withdrawn, or never existed) so callers can notFound() without
 * having to distinguish those cases -- to the public they're all the same.
 */
export async function fetchPortalRecognition(
  slug: string,
  revalidate = 60,
): Promise<PortalRecognition | null> {
  if (!PORTAL_API_URL) {
    throw new Error("Portal API is not configured (PORTAL_API_URL).");
  }

  const res = await fetch(
    `${PORTAL_API_URL}/api/v1/recognitions/${encodeURIComponent(slug)}/`,
    {
      // The detail endpoint is public -- no API key needed, unlike the feed.
      next: { revalidate },
    },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Portal recognition request failed: ${res.status}`);
  }

  const json = await res.json();
  return json?.data ? mapRecognition(json.data) : null;
}

/**
 * Roles that should surface as a "team" category on the public site: public
 * so they're meant to be shown at all, and not the blanket "member" role
 * every signup gets (that's not a team, it's just membership).
 */
export function isTeamRole(role: PortalRole): boolean {
  return role.isPublic && role.name !== "member";
}

/**
 * The member's public community-portal profile (the portal-web /[username]
 * page), so the team modal can link back to their full profile. Returns null
 * if PORTAL_WEB_URL isn't configured -- callers should just omit the link.
 */
export function getPortalProfileUrl(username: string): string | null {
  if (!PORTAL_WEB_URL) return null;
  return `${PORTAL_WEB_URL.replace(/\/+$/, "")}/${username}`;
}
