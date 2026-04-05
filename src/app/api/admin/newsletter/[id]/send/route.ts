import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { sendNewsletterBatch } from "@/lib/newsletter";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST: Trigger a newsletter broadcast by ID
 */
export async function POST(_req: Request, { params }: RouteContext) {
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

    if (!newsletter.subject.trim()) {
      return NextResponse.json(
        { error: "Subject must not be empty" },
        { status: 400 },
      );
    }

    if (!newsletter.markdownContent.trim()) {
      return NextResponse.json(
        { error: "Content must not be empty" },
        { status: 400 },
      );
    }

    await sendNewsletterBatch(newsletterId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Newsletter Send Error:", error);
    return NextResponse.json(
      { error: "Failed to send newsletter" },
      { status: 500 },
    );
  }
}
