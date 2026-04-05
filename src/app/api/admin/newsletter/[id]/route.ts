import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET: Fetch a single newsletter by ID
 */
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const newsletterId = parseInt(id, 10);

    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(newsletter);
  } catch (error) {
    console.error("GET Newsletter Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter" },
      { status: 500 },
    );
  }
}

/**
 * PATCH: Update a newsletter by ID
 */
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const newsletterId = parseInt(id, 10);

    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 },
      );
    }

    const data = await req.json();
    const { subject, previewText, markdownContent } = data;

    if (subject !== undefined && subject.trim().length > 200) {
      return NextResponse.json(
        { error: "Subject must be 200 characters or fewer" },
        { status: 400 },
      );
    }

    if (previewText !== undefined && previewText.length > 150) {
      return NextResponse.json(
        { error: "Preview text must be 150 characters or fewer" },
        { status: 400 },
      );
    }

    const updated = await prisma.newsletter.update({
      where: { id: newsletterId },
      data: {
        ...(subject !== undefined && { subject: subject.trim() }),
        ...(previewText !== undefined && {
          previewText: previewText.trim() || null,
        }),
        ...(markdownContent !== undefined && { markdownContent }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Newsletter Error:", error);
    return NextResponse.json(
      { error: "Failed to update newsletter" },
      { status: 500 },
    );
  }
}

/**
 * DELETE: Delete a newsletter by ID (only if status is "draft")
 */
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const newsletterId = parseInt(id, 10);

    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 },
      );
    }

    if (newsletter.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft newsletters can be deleted" },
        { status: 400 },
      );
    }

    await prisma.newsletter.delete({ where: { id: newsletterId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Newsletter Error:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter" },
      { status: 500 },
    );
  }
}
