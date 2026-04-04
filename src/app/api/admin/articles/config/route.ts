import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
    return NextResponse.json(config ?? null);
  } catch (error) {
    console.error("GET Admin Articles Config Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles config" },
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

    if (!data.hashnodeHost?.trim())
      return NextResponse.json(
        { error: "hashnodeHost is required" },
        { status: 400 },
      );

    const config = await prisma.articlesConfig.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        hashnodeHost: data.hashnodeHost.trim(),
        featuredSlugs: [],
      },
      update: { hashnodeHost: data.hashnodeHost.trim() },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("POST Admin Articles Config Error:", error);
    return NextResponse.json(
      { error: "Failed to update articles config" },
      { status: 500 },
    );
  }
}
