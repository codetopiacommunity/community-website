import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

/**
 * GET: Return the count of verified subscribers
 */
export async function GET() {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const count = await prisma.subscriber.count({
      where: { status: "verified" },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("GET Subscriber Count Error:", error);
    return serverError("Failed to fetch subscriber count");
  }
}
