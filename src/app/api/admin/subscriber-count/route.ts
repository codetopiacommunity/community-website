import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

/**
 * GET: Return the count of verified subscribers
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await prisma.subscriber.count({
      where: { status: "verified" },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("GET Subscriber Count Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriber count" },
      { status: 500 },
    );
  }
}
