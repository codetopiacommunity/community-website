import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";

// Returns NextResponse(401) if no session, null if authenticated
export async function requireAuth(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// Returns NextResponse(400) for first missing/empty field, null if all valid
export function validateRequired(
  data: Record<string, unknown>,
  fields: string[],
): NextResponse | null {
  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 },
      );
    }
  }
  return null;
}

// Returns NextResponse with message and status (default 500)
export function serverError(message: string, status = 500): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
