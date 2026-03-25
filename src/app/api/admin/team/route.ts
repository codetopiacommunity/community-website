import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { processImage } from "./utils";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET Team Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    if (!data.name || data.name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!data.role || data.role.trim() === "") {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }
    if (!data.tier || data.tier.trim() === "") {
      return NextResponse.json({ error: "Tier is required" }, { status: 400 });
    }
    if (!data.statement || data.statement.trim() === "") {
      return NextResponse.json(
        { error: "Bio / Mission statement is required" },
        { status: 400 },
      );
    }

    let processedImageUrl = null;
    try {
      if (data.imageUrl) {
        processedImageUrl = await processImage(data.imageUrl, data.name);
      }
    } catch (_err: unknown) {
      return NextResponse.json(
        { error: "Invalid image data provided." },
        { status: 400 },
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        ...data,
        imageUrl: processedImageUrl,
        slug: data.name
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error("POST Team Error:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 },
    );
  }
}
