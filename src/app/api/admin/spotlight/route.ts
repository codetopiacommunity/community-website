import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { slugify } from "@/lib/utils";
import { uploadSpotlightImage } from "./utils";

export async function GET() {
  try {
    const spotlights = await prisma.spotlight.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(spotlights);
  } catch (error) {
    console.error("GET Spotlight Error:", error);
    return serverError("Failed to fetch spotlights");
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    const validationError = validateRequired(data, [
      "name",
      "role",
      "imageUrl",
      "contribution",
    ]);
    if (validationError) return validationError;

    const imageUrl = await uploadSpotlightImage(data.imageUrl, data.name);

    const spotlight = await prisma.spotlight.create({
      data: {
        name: data.name.trim(),
        slug: slugify(data.name.trim()),
        role: data.role.trim(),
        imageUrl,
        contribution: data.contribution.trim(),
        links: data.links ?? [],
        featured: false,
      },
    });

    return NextResponse.json(spotlight);
  } catch (error) {
    console.error("POST Spotlight Error:", error);
    return serverError("Failed to create spotlight");
  }
}
