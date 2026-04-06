import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";
import { deleteImage, processImage } from "../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    // Resolve params for Next.js 15+
    const { id } = await params;
    const data = await request.json();

    // 1. Retrieve the existing record to check for current image
    const existingMember = await prisma.teamMember.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 },
      );
    }

    const validationError = validateRequired(data, [
      "name",
      "role",
      "tier",
      "statement",
    ]);
    if (validationError) return validationError;

    let processedImageUrl = data.imageUrl || null;
    try {
      // 2. If a new image is being uploaded (base64)
      if (data.imageUrl?.startsWith("data:image")) {
        // Upload the new one
        processedImageUrl = await processImage(data.imageUrl, data.name);

        // Delete the previous one if it exists
        if (existingMember.imageUrl) {
          await deleteImage(existingMember.imageUrl);
        }
      }
      // 3. If the image is being intentionally removed
      else if (!data.imageUrl && existingMember.imageUrl) {
        await deleteImage(existingMember.imageUrl);
      }
    } catch (_err: unknown) {
      return NextResponse.json(
        { error: "Invalid image data provided." },
        { status: 400 },
      );
    }

    const member = await prisma.teamMember.update({
      where: { id: parseInt(id, 10) },
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
    console.error("PATCH Team Error:", error);
    return serverError("Failed to update team member");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;

    // First retrieve the record to obtain the string reference to the file
    const existingMember = await prisma.teamMember.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (existingMember?.imageUrl) {
      await deleteImage(existingMember.imageUrl);
    }

    await prisma.teamMember.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Team Error:", error);
    return serverError("Failed to delete team member");
  }
}
