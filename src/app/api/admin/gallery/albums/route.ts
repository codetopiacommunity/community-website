import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { processImage } from "../utils";

export async function GET() {
  try {
    const albums = await prisma.galleryAlbum.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { photos: true } } },
    });
    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET Gallery Albums Error:", error);
    return serverError("Failed to fetch gallery albums");
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    const validationError = validateRequired(data, [
      "title",
      "date",
      "category",
      "coverImage",
    ]);
    if (validationError) return validationError;

    const slug = data.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    let coverImageUrl: string | null = null;
    try {
      coverImageUrl = await processImage(data.coverImage, data.title);
    } catch (_err: unknown) {
      return NextResponse.json(
        { error: "Invalid image data provided." },
        { status: 400 },
      );
    }

    const album = await prisma.galleryAlbum.create({
      data: {
        slug,
        title: data.title.trim(),
        date: data.date.trim(),
        category: data.category.trim(),
        coverImage: coverImageUrl as string,
      },
      include: { _count: { select: { photos: true } } },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error: unknown) {
    // Prisma unique constraint violation → duplicate slug
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An album with this title already exists." },
        { status: 409 },
      );
    }
    console.error("POST Gallery Albums Error:", error);
    return serverError("Failed to create gallery album");
  }
}
