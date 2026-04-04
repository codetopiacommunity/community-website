import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { deleteImage, processImage } from "../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const data = await request.json();

    if (!data.title?.trim())
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!data.impact?.trim())
      return NextResponse.json(
        { error: "Impact description is required" },
        { status: 400 },
      );
    if (!data.imageUrl?.trim())
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    if (!data.logoUrl?.trim())
      return NextResponse.json({ error: "Logo is required" }, { status: 400 });
    if (!data.date?.trim())
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    if (!data.location?.trim())
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 },
      );

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
        date: data.date.trim(),
        location: data.location.trim(),
        link: data.link?.trim() || null,
        galleryLink: data.galleryLink?.trim() || null,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    console.error("PATCH Impact Error:", error);
    return NextResponse.json(
      { error: "Failed to update impact story" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
    return NextResponse.json(
      { error: "Failed to delete impact story" },
      { status: 500 },
    );
  }
}
