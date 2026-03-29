import type { Event } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

/**
 * PATCH: Update an existing event
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Fetch the existing record
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Combine data - only update if provided
    const updateData: Partial<Event> = {
      classification: body.classification?.trim() || event.classification,
      title: body.title?.trim() || event.title,
      description: body.description?.trim() || event.description,
      startDate: body.startDate ? new Date(body.startDate) : event.startDate,
      endDate: body.endDate ? new Date(body.endDate) : event.endDate,
      isOnline: body.isOnline !== undefined ? body.isOnline : event.isOnline,
      reserveSpotLink:
        body.reserveSpotLink !== undefined
          ? body.reserveSpotLink || null
          : event.reserveSpotLink,
      joinMeetingLink:
        body.joinMeetingLink !== undefined
          ? body.joinMeetingLink || null
          : event.joinMeetingLink,
      recordedVideoLink:
        body.recordedVideoLink !== undefined
          ? body.recordedVideoLink || null
          : event.recordedVideoLink,
      locationUrl:
        body.locationUrl !== undefined
          ? body.locationUrl || null
          : event.locationUrl,
    };

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("PATCH Event Error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

/**
 * DELETE: Remove an event
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.event.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Event Error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}
