import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";
import { deleteImage, processImage } from "../utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Resolve params for Next.js 15+
    const { id } = await params;
    const data = await request.json();

    if (!data.name || data.name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!data.role || data.role.trim() === "") {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }
    if (!data.tier || data.tier.trim() === "") {
      return NextResponse.json({ error: "Tier is required" }, { status: 400 });
    }
    if (!data.statement || data.statement.trim() === "") {
      return NextResponse.json(
        { error: "Bio / Mission statement is required" },
        { status: 400 },
      );
    }

    let processedImageUrl = data.imageUrl || null;
    try {
      if (data.imageUrl?.startsWith("data:image")) {
        processedImageUrl = await processImage(data.imageUrl, data.name);
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
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 },
    );
  }
}
