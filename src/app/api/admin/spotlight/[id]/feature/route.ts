import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

// PATCH /api/admin/spotlight/[id]/feature — sets this as the only featured spotlight
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;

    // Unfeature all, then feature the target — in a transaction
    await prisma.$transaction([
      prisma.spotlight.updateMany({ data: { featured: false } }),
      prisma.spotlight.update({
        where: { id: Number(id) },
        data: { featured: true },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Feature Spotlight Error:", error);
    return serverError("Failed to feature spotlight");
  }
}
