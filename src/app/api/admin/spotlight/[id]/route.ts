import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { deleteSpotlightImage, uploadSpotlightImage } from "../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const data = await request.json();

    const existing = await prisma.spotlight.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let imageUrl = existing.imageUrl;
    if (data.imageUrl && data.imageUrl !== existing.imageUrl) {
      await deleteSpotlightImage(existing.imageUrl);
      imageUrl = await uploadSpotlightImage(data.imageUrl, data.name ?? existing.name);
    }

    const updated = await prisma.spotlight.update({
      where: { id: Number(id) },
      data: {
        name: data.name?.trim() ?? existing.name,
        role: data.role?.trim() ?? existing.role,
        imageUrl,
        contribution: data.contribution?.trim() ?? existing.contribution,
        links: data.links ?? existing.links,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Spotlight Error:", error);
    return serverError("Failed to update spotlight");
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

    const existing = await prisma.spotlight.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteSpotlightImage(existing.imageUrl);
    await prisma.spotlight.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Spotlight Error:", error);
    return serverError("Failed to delete spotlight");
  }
}
