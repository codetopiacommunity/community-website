import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const album = await prisma.galleryAlbum.findUnique({
      where: { slug },
      include: { photos: { orderBy: { createdAt: "asc" } } },
    });
    if (!album)
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    return NextResponse.json(album);
  } catch (error) {
    console.error("GET Album Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch album" },
      { status: 500 },
    );
  }
}
