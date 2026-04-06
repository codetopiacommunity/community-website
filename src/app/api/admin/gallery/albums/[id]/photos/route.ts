import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { processImage } from "../../../utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;
    const { id } = await params;
    const albumId = parseInt(id, 10);
    const photos = await prisma.galleryPhoto.findMany({
      where: { albumId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error("GET Gallery Photos Error:", error);
    return serverError("Failed to fetch photos");
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const albumId = parseInt(id, 10);
    const data = await request.json();

    if (!data.src || data.src.trim() === "") {
      return NextResponse.json(
        { error: "Photo src is required" },
        { status: 400 },
      );
    }
    if (!data.alt || data.alt.trim() === "") {
      return NextResponse.json(
        { error: "Photo alt text is required" },
        { status: 400 },
      );
    }

    const existingAlbum = await prisma.galleryAlbum.findUnique({
      where: { id: albumId },
    });

    if (!existingAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    let srcUrl: string | null = null;
    try {
      srcUrl = await processImage(data.src, data.alt);
    } catch (_err: unknown) {
      return NextResponse.json(
        { error: "Invalid image data provided." },
        { status: 400 },
      );
    }

    const photo = await prisma.galleryPhoto.create({
      data: {
        src: srcUrl as string,
        alt: data.alt.trim(),
        albumId,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("POST Gallery Photo Error:", error);
    return serverError("Failed to add photo to album");
  }
}
