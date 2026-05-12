import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { processImage } from "@/app/api/admin/team/utils";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { slugify } from "@/lib/utils";

/**
 * GET: List all mentorships
 */
export async function GET() {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const mentorships = await prisma.mentorship.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        mentors: {
          select: { id: true, name: true, slug: true, imageUrl: true },
        },
      },
    });

    return NextResponse.json(mentorships);
  } catch (error) {
    console.error("GET Mentorships Error:", error);
    return serverError("Failed to fetch mentorships");
  }
}

/**
 * POST: Create a new mentorship session
 */
export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    // Validation
    const validationError = validateRequired(data, ["title", "description"]);
    if (validationError) return validationError;

    const mentorConnect = Array.isArray(data.mentorIds)
      ? { connect: data.mentorIds.map((id: number) => ({ id: Number(id) })) }
      : undefined;

    const processedImageUrl = await processImage(
      data.imageUrl ?? null,
      data.title || "mentorship",
    );

    const processedCoverImage = await processImage(
      data.coverImage ?? null,
      `${data.title || "mentorship"}-cover`,
    );

    const processedFlyerImage = await processImage(
      data.flyerImage ?? null,
      `${data.title || "mentorship"}-flyer`,
    );

    const newMentorship = await prisma.mentorship.create({
      data: {
        title: data.title.trim(),
        slug: slugify(data.title.trim()),
        description: data.description?.trim() ?? "",
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        isOnline: data.isOnline ?? true,
        location: data.location || null,
        capacity: data.capacity ? Number(data.capacity) : null,
        applicationLink: data.applicationLink || null,
        registrationLink: data.registrationLink || null,
        imageUrl: processedImageUrl,
        coverImage: processedCoverImage,
        flyerImage: processedFlyerImage,
        tags: Array.isArray(data.tags) ? data.tags : [],
        status: data.status || "open",
        mentors: mentorConnect,
      },
    });

    return NextResponse.json(newMentorship, { status: 201 });
  } catch (error) {
    console.error("POST Mentorship Error:", error);
    return serverError("Failed to create mentorship");
  }
}
