import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { slugify } from "@/lib/utils";

/**
 * GET: List all events
 */
export async function GET() {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET Events Error:", error);
    return serverError("Failed to fetch events");
  }
}

/**
 * POST: Create a new event
 */
export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    // Validation
    const validationError = validateRequired(data, [
      "title",
      "classification",
      "description",
      "startDate",
      "endDate",
    ]);
    if (validationError) return validationError;

    const newEvent = await prisma.event.create({
      data: {
        classification: data.classification.trim(),
        title: data.title.trim(),
        slug: slugify(data.title.trim()),
        description: data.description.trim(),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isOnline: data.isOnline ?? true,
        reserveSpotLink: data.reserveSpotLink || null,
        joinMeetingLink: data.joinMeetingLink || null,
        recordedVideoLink: data.recordedVideoLink || null,
        locationUrl: data.locationUrl || null,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST Event Error:", error);
    return serverError("Failed to create event");
  }
}
