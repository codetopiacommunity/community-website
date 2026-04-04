import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    if (
      !Array.isArray(data.featuredSlugs) ||
      data.featuredSlugs.length > 3 ||
      !data.featuredSlugs.every((s: unknown) => typeof s === "string")
    )
      return NextResponse.json(
        { error: "featuredSlugs must be an array of at most 3 strings" },
        { status: 400 },
      );

    const config = await prisma.articlesConfig.update({
      where: { id: 1 },
      data: { featuredSlugs: data.featuredSlugs },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("POST Admin Articles Featured Error:", error);
    return NextResponse.json(
      { error: "Failed to update featured slugs" },
      { status: 500 },
    );
  }
}
