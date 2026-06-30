/**
 * Server-side client for portal-core (the identity backend).
 *
 * Members/roles live in portal-core, not here. We reach them with a scoped
 * API key (profile.view) — the same key system the portal admin issues.
 * Never expose PORTAL_API_KEY to the browser; only call these from the server.
 */

const PORTAL_API_URL = process.env.PORTAL_API_URL;
const PORTAL_API_KEY = process.env.PORTAL_API_KEY;

export interface PortalMember {
  communityId: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
  coverImageUrl: string;
  communityRoles: string[];
}

export function isPortalConfigured(): boolean {
  return Boolean(PORTAL_API_URL && PORTAL_API_KEY);
}

export async function fetchPortalMembers(
  params?: { role?: string; search?: string },
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
  }));
}
