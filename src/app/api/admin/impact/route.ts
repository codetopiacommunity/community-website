import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { processImage } from "./utils";

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

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    if (!data.title?.trim())
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!data.impact?.trim())
      return NextResponse.json(
        { error: "Impact description is required" },
        { status: 400 },
      );
    if (!data.imageUrl?.trim())
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    if (!data.logoUrl?.trim())
      return NextResponse.json({ error: "Logo is required" }, { status: 400 });
    if (!data.date?.trim())
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    if (!data.location?.trim())
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 },
      );

    let imageUrl: string | null = null;
    let logoUrl: string | null = null;

    try {
      imageUrl = await processImage(data.imageUrl, data.title, "images");
      logoUrl = await processImage(data.logoUrl, data.title, "logos");
    } catch {
      return NextResponse.json(
        { error: "Failed to upload image(s)" },
        { status: 400 },
      );
    }

    const story = await prisma.impactStory.create({
      data: {
        title: data.title.trim(),
        impact: data.impact.trim(),
        imageUrl: imageUrl as string,
        logoUrl: logoUrl as string,
        date: data.date.trim(),
        location: data.location.trim(),
        link: data.link?.trim() || null,
        galleryLink: data.galleryLink?.trim() || null,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    console.error("POST Impact Error:", error);
    return NextResponse.json(
      { error: "Failed to create impact story" },
      { status: 500 },
    );
  }
}
