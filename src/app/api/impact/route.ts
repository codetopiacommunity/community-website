import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

export async function GET() {
  try {
    const stories = await prisma.impactStory.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET Impact Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch impact stories" },
      { status: 500 },
    );
  }
}
