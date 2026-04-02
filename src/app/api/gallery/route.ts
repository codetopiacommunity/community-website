import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

export async function GET() {
  try {
    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { createdAt: "desc" },
      include: { photos: { take: 1, orderBy: { createdAt: "asc" } } },
    });
    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET Gallery Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 },
    );
  }
}
