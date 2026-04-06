import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { deleteImage, processImage } from "../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const data = await request.json();

    const validationError = validateRequired(data, [
      "title",
      "impact",
      "imageUrl",
      "logoUrl",
      "startDate",
      "location",
    ]);
    if (validationError) return validationError;

    const existing = await prisma.impactStory.findUnique({
      where: { id: Number(id) },
    });
    if (!existing)
      return NextResponse.json({ error: "Story not found" }, { status: 404 });

    let imageUrl = data.imageUrl;
    let logoUrl = data.logoUrl;

    try {
      // New upload for image
      if (data.imageUrl?.startsWith("data:image")) {
        imageUrl = await processImage(data.imageUrl, data.title, "images");
        await deleteImage(existing.imageUrl, "images");
      } else if (!data.imageUrl && existing.imageUrl) {
        await deleteImage(existing.imageUrl, "images");
        imageUrl = null;
      }

      // New upload for logo
      if (data.logoUrl?.startsWith("data:image")) {
        logoUrl = await processImage(data.logoUrl, data.title, "logos");
        await deleteImage(existing.logoUrl, "logos");
      } else if (!data.logoUrl && existing.logoUrl) {
        await deleteImage(existing.logoUrl, "logos");
        logoUrl = null;
      }
    } catch {
      return NextResponse.json(
        { error: "Failed to upload image(s)" },
        { status: 400 },
      );
    }

    const story = await prisma.impactStory.update({
      where: { id: Number(id) },
      data: {
        title: data.title.trim(),
        impact: data.impact.trim(),
        imageUrl,
        logoUrl,
        startDate: data.startDate.trim(),
        endDate: data.endDate?.trim() || null,
        location: data.location.trim(),
        link: data.link?.trim() || null,
        galleryLink: data.galleryLink?.trim() || null,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    console.error("PATCH Impact Error:", error);
    return serverError("Failed to update impact story");
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
    const existing = await prisma.impactStory.findUnique({
      where: { id: Number(id) },
    });

    if (existing) {
      await deleteImage(existing.imageUrl, "images");
      await deleteImage(existing.logoUrl, "logos");
    }

    await prisma.impactStory.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Impact Error:", error);
    return serverError("Failed to delete impact story");
  }
}
