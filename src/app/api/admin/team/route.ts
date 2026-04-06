import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { processImage } from "./utils";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET Team Error:", error);
    return serverError("Failed to fetch team members");
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
      "tier",
      "statement",
    ]);
    if (validationError) return validationError;

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
    return serverError("Failed to create team member");
  }
}
