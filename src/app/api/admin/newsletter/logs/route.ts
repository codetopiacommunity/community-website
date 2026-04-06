import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

/**
 * GET: List newsletter delivery logs with offset-based pagination (?offset=0)
 */
export async function GET(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const offset = Math.max(0, Number(searchParams.get("offset") ?? "0"));
    const BATCH = 5;

    const [logs, total] = await Promise.all([
      prisma.newsletterDeliveryLog.findMany({
        orderBy: { completedAt: "desc" },
        skip: offset,
        take: BATCH,
        include: { newsletter: { select: { subject: true } } },
      }),
      prisma.newsletterDeliveryLog.count(),
    ]);

    return NextResponse.json({
      logs,
      total,
      offset,
      hasMore: offset + BATCH < total,
    });
  } catch (error) {
    console.error("GET Newsletter Logs Error:", error);
    return serverError("Failed to fetch delivery logs");
  }
}
