import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";

/**
 * GET: Fetch a single career opportunity
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const careerId = Number.parseInt(id, 10);

    if (Number.isNaN(careerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const career = await prisma.career.findUnique({
      where: { id: careerId },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error("GET Career ID Error:", error);
    return serverError("Failed to fetch career");
  }
}

/**
 * PUT: Update a career opportunity
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const careerId = Number.parseInt(id, 10);

    if (Number.isNaN(careerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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

    const updatedCareer = await prisma.career.update({
      where: { id: careerId },
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

    return NextResponse.json(updatedCareer);
  } catch (error) {
    console.error("PUT Career Error:", error);
    return serverError("Failed to update career opportunity");
  }
}

/**
 * DELETE: Remove a career opportunity
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const careerId = Number.parseInt(id, 10);

    if (Number.isNaN(careerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.career.delete({
      where: { id: careerId },
    });

    return NextResponse.json({ message: "Career deleted successfully" });
  } catch (error) {
    console.error("DELETE Career Error:", error);
    return serverError("Failed to delete career opportunity");
  }
}
