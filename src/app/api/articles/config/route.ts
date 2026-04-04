import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

export async function GET() {
  try {
    const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
    return NextResponse.json({ hashnodeHost: config?.hashnodeHost ?? null });
  } catch (error) {
    console.error("GET Articles Config Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles config" },
      { status: 500 },
    );
  }
}
