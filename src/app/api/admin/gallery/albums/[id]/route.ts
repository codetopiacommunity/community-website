import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { deleteImage, processImage } from "../../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const existingAlbum = await prisma.galleryAlbum.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    let coverImageUrl: string | null =
      data.coverImage ?? existingAlbum.coverImage;

    try {
      if (data.coverImage?.startsWith("data:image")) {
        // Upload new image, then delete old one
        coverImageUrl = await processImage(
          data.coverImage,
          data.title ?? existingAlbum.title,
        );
        if (existingAlbum.coverImage) {
          await deleteImage(existingAlbum.coverImage);
        }
      } else if (
        (data.coverImage === null || data.coverImage === "") &&
        existingAlbum.coverImage
      ) {
        // Cover image explicitly removed
        await deleteImage(existingAlbum.coverImage);
        coverImageUrl = null;
      }
    } catch (_err: unknown) {
      return NextResponse.json(
        { error: "Invalid image data provided." },
        { status: 400 },
      );
    }

    const album = await prisma.galleryAlbum.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(data.title && { title: data.title.trim() }),
        ...(data.date && { date: data.date.trim() }),
        ...(data.category && { category: data.category.trim() }),
        ...(data.title && {
          slug: data.title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-"),
        }),
        coverImage: coverImageUrl as string,
      },
      include: { _count: { select: { photos: true } } },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error("PATCH Gallery Album Error:", error);
    return NextResponse.json(
      { error: "Failed to update gallery album" },
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
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingAlbum = await prisma.galleryAlbum.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // Non-fatal: log and continue if Cloudinary deletion fails
    if (existingAlbum.coverImage) {
      try {
        await deleteImage(existingAlbum.coverImage);
      } catch (err) {
        console.error("Failed to delete cover image from Cloudinary:", err);
      }
    }

    // Cascade deletes photos via Prisma relation
    await prisma.galleryAlbum.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Gallery Album Error:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery album" },
      { status: 500 },
    );
  }
}
