import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { deleteImage } from "../../utils";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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
    return serverError("Failed to delete photo");
  }
}
