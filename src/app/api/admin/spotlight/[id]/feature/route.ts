import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

/**
 * PATCH /api/admin/spotlight/[id]/feature — toggles the feature flag.
 *
 * Only one spotlight is featured at a time, so featuring one clears the rest
 * in the same transaction. Unfeaturing leaves nobody featured, which is a
 * state the site already handles: the home page orders by featured first and
 * then by newest, so it falls back to the most recent entry. Before this,
 * featuring was one-way, and the only way to move the flag was to hand it to
 * somebody else.
 */
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const spotlightId = Number(id);
    if (!Number.isInteger(spotlightId)) {
      return serverError("Invalid spotlight id", 400);
    }

    const current = await prisma.spotlight.findUnique({
      where: { id: spotlightId },
      select: { featured: true },
    });
    if (!current) return serverError("Spotlight not found", 404);

    // Already the featured one, so this is the uncheck. No transaction
    // needed: clearing one flag cannot leave two set.
    if (current.featured) {
      await prisma.spotlight.update({
        where: { id: spotlightId },
        data: { featured: false },
      });
      return NextResponse.json({ featured: false });
    }

    await prisma.$transaction([
      prisma.spotlight.updateMany({ data: { featured: false } }),
      prisma.spotlight.update({
        where: { id: spotlightId },
        data: { featured: true },
      }),
    ]);

    return NextResponse.json({ featured: true });
  } catch (error) {
    console.error("PATCH Feature Spotlight Error:", error);
    return serverError("Failed to update featured spotlight");
  }
}
