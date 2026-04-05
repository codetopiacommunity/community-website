import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

const PAGE_SIZE = 10;

/**
 * GET: List newsletters with pagination (?page=1)
 */
export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const skip = (page - 1) * PAGE_SIZE;

    const [newsletters, total] = await Promise.all([
      prisma.newsletter.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE,
      }),
      prisma.newsletter.count(),
    ]);

    return NextResponse.json({ newsletters, total, page, pageSize: PAGE_SIZE });
  } catch (error) {
    console.error("GET Newsletters Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletters" },
      { status: 500 },
    );
  }
}

/**
 * POST: Create a new newsletter draft
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { subject, previewText, markdownContent } = data;

    // Validate subject
    if (!subject?.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 },
      );
    }
    if (subject.trim().length > 200) {
      return NextResponse.json(
        { error: "Subject must be 200 characters or fewer" },
        { status: 400 },
      );
    }

    // Validate previewText
    if (previewText && previewText.length > 150) {
      return NextResponse.json(
        { error: "Preview text must be 150 characters or fewer" },
        { status: 400 },
      );
    }

    const newsletter = await prisma.newsletter.create({
      data: {
        subject: subject.trim(),
        previewText: previewText?.trim() || null,
        markdownContent: markdownContent || "",
        status: "draft",
      },
    });

    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error("POST Newsletter Error:", error);
    return NextResponse.json(
      { error: "Failed to create newsletter" },
      { status: 500 },
    );
  }
}
