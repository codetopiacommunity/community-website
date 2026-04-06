import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";

export async function GET() {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
    return NextResponse.json(config ?? null);
  } catch (error) {
    console.error("GET Admin Articles Config Error:", error);
    return serverError("Failed to fetch articles config");
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    const validationError = validateRequired(data, ["hashnodeHost"]);
    if (validationError) return validationError;

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
    return serverError("Failed to update articles config");
  }
}
