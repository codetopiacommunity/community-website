import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST: Duplicate a newsletter by ID (creates a new draft with same content)
 */
export async function POST(_req: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const newsletterId = parseInt(id, 10);

    const source = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!source) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 },
      );
    }

    const newRecord = await prisma.newsletter.create({
      data: {
        subject: source.subject,
        previewText: source.previewText,
        markdownContent: source.markdownContent,
        status: "draft",
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("POST Duplicate Newsletter Error:", error);
    return NextResponse.json(
      { error: "Failed to duplicate newsletter" },
      { status: 500 },
    );
  }
}
