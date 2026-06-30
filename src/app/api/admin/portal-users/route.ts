import { NextResponse } from "next/server";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { fetchPortalMembers } from "@/lib/portal";

/** Admin-only proxy to the portal members directory, used by the recognition user picker. */
export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") || undefined;
  const search = searchParams.get("search") || undefined;

  try {
    // No caching for the live picker — admins expect fresh results.
    const members = await fetchPortalMembers({ role, search }, 0);
    return NextResponse.json(members);
  } catch (error) {
    console.error("Portal users proxy error:", error);
    return serverError("Failed to fetch users from the portal");
  }
}
