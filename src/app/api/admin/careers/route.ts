import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";

/**
 * GET: List all careers
 */
export async function GET() {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const careers = await prisma.career.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("GET Careers Error:", error);
    return serverError("Failed to fetch careers");
  }
}

/**
 * POST: Create a new career opportunity
 */
export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();

    // Validation
    const validationError = validateRequired(data, [
      "title",
      "type",
      "location",
      "description",
      "requirements",
      "expiryDate",
    ]);
    if (validationError) return validationError;

    const newCareer = await prisma.career.create({
      data: {
        title: data.title.trim(),
        company: data.company?.trim() || "Codetopia",
        type: data.type.trim(),
        location: data.location.trim(),
        description: data.description.trim(),
        requirements: Array.isArray(data.requirements)
          ? data.requirements
          : data.requirements.split("\n").filter((r: string) => r.trim()),
        link: data.link || null,
        expiryDate: new Date(data.expiryDate),
        isFeatured: data.isFeatured ?? false,
        status: data.status || "open",
      },
    });

    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    console.error("POST Career Error:", error);
    return serverError("Failed to create career opportunity");
  }
}
