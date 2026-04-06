import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET: Fetch a single newsletter by ID
 */
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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
    return serverError("Failed to fetch newsletter");
  }
}

/**
 * PATCH: Update a newsletter by ID
 */
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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
    return serverError("Failed to update newsletter");
  }
}

/**
 * DELETE: Delete a newsletter by ID (only if status is "draft")
 */
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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
    return serverError("Failed to delete newsletter");
  }
}
