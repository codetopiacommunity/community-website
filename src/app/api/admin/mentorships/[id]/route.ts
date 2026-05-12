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
 * GET: Fetch a single mentorship
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const mentorshipId = Number.parseInt(id, 10);

    if (Number.isNaN(mentorshipId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const mentorship = await prisma.mentorship.findUnique({
      where: { id: mentorshipId },
      include: {
        mentors: {
          select: { id: true, name: true, slug: true, imageUrl: true },
        },
      },
    });

    if (!mentorship) {
      return NextResponse.json(
        { error: "Mentorship not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(mentorship);
  } catch (error) {
    console.error("GET Mentorship ID Error:", error);
    return serverError("Failed to fetch mentorship");
  }
}

/**
 * PUT: Update a mentorship
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const mentorshipId = Number.parseInt(id, 10);

    if (Number.isNaN(mentorshipId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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

    const updatedMentorship = await prisma.mentorship.update({
      where: { id: mentorshipId },
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

    return NextResponse.json(updatedMentorship);
  } catch (error) {
    console.error("PUT Mentorship Error:", error);
    return serverError("Failed to update mentorship");
  }
}

/**
 * DELETE: Remove a mentorship
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const mentorshipId = Number.parseInt(id, 10);

    if (Number.isNaN(mentorshipId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.mentorship.delete({
      where: { id: mentorshipId },
    });

    return NextResponse.json({ message: "Mentorship deleted successfully" });
  } catch (error) {
    console.error("DELETE Mentorship Error:", error);
    return serverError("Failed to delete mentorship");
  }
}
