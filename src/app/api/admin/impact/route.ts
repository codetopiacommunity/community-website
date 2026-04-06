import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { processImage } from "./utils";

export async function GET() {
  try {
    const stories = await prisma.impactStory.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET Impact Error:", error);
    return serverError("Failed to fetch impact stories");
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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

    let imageUrl: string | null = null;
    let logoUrl: string | null = null;

    try {
      imageUrl = await processImage(data.imageUrl, data.title, "images");
      logoUrl = await processImage(data.logoUrl, data.title, "logos");
    } catch {
      return NextResponse.json(
        { error: "Failed to upload image(s)" },
        { status: 400 },
      );
    }

    const story = await prisma.impactStory.create({
      data: {
        title: data.title.trim(),
        impact: data.impact.trim(),
        imageUrl: imageUrl as string,
        logoUrl: logoUrl as string,
        startDate: data.startDate.trim(),
        endDate: data.endDate?.trim() || null,
        location: data.location.trim(),
        link: data.link?.trim() || null,
        galleryLink: data.galleryLink?.trim() || null,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    console.error("POST Impact Error:", error);
    return serverError("Failed to create impact story");
  }
}
