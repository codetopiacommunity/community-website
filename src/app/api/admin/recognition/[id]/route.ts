import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const data = await request.json();

    const item = await prisma.recognition.update({
      where: { id: Number(id) },
      data: {
        ...(data.portalUsername !== undefined && {
          portalUsername: String(data.portalUsername).trim(),
        }),
        ...(data.category !== undefined && {
          category: String(data.category).trim(),
        }),
        ...(data.awardName !== undefined && {
          awardName: String(data.awardName).trim(),
        }),
        ...(data.period !== undefined && {
          period: String(data.period).trim(),
        }),
        ...(data.impactSummary !== undefined && {
          impactSummary: String(data.impactSummary).trim(),
        }),
        ...(data.roleLabel !== undefined && {
          roleLabel: data.roleLabel?.trim() || null,
        }),
        ...(data.domain !== undefined && {
          domain: data.domain?.trim() || null,
        }),
        ...(Array.isArray(data.achievements) && {
          achievements: data.achievements
            .map((a: string) => a.trim())
            .filter(Boolean),
        }),
        ...(data.isPublished !== undefined && {
          isPublished: Boolean(data.isPublished),
        }),
        ...(data.order !== undefined && { order: Number(data.order) || 0 }),
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("PATCH Recognition Error:", error);
    return serverError("Failed to update recognition");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    await prisma.recognition.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Recognition Error:", error);
    return serverError("Failed to delete recognition");
  }
}
