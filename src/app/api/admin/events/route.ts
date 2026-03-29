import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

/**
 * GET: List all events
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET Events Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

/**
 * POST: Create a new event
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validation
    if (!data.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.classification?.trim()) {
      return NextResponse.json(
        { error: "Classification is required" },
        { status: 400 },
      );
    }
    if (!data.description?.trim()) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 },
      );
    }
    if (!data.startDate) {
      return NextResponse.json(
        { error: "Start date is required" },
        { status: 400 },
      );
    }
    if (!data.endDate) {
      return NextResponse.json(
        { error: "End date is required" },
        { status: 400 },
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        classification: data.classification.trim(),
        title: data.title.trim(),
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
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
