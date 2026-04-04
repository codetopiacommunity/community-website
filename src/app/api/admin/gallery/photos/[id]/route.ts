import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { deleteImage } from "../../utils";

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
    const photoId = parseInt(id, 10);

    const existingPhoto = await prisma.galleryPhoto.findUnique({
      where: { id: photoId },
    });

    if (!existingPhoto) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Non-fatal: log and continue if Cloudinary deletion fails
    try {
      await deleteImage(existingPhoto.src);
    } catch (err) {
      console.error("Failed to delete photo from Cloudinary:", err);
    }

    await prisma.galleryPhoto.delete({
      where: { id: photoId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Gallery Photo Error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 },
    );
  }
}
