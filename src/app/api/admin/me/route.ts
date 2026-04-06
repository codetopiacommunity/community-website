import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { type AdminSession, getSession, login } from "@/lib/auth/auth";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;
  const session = (await getSession()) as AdminSession;

  return NextResponse.json({
    email: session.email,
    name: session.name || "Admin",
  });
}

export async function PATCH(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;
    const session = (await getSession()) as AdminSession;

    const { email, currentPassword, newPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required to make changes" },
        { status: 400 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email: session.email },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 401 },
      );
    }

    const updateData: Record<string, string> = {};
    if (email && email !== admin.email) {
      updateData.email = email;
    }
    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length > 0) {
      const updatedAdmin = await prisma.admin.update({
        where: { id: admin.id },
        data: updateData,
      });

      // Issue a new session if the email was successfully changed
      if (updateData.email) {
        await login({
          email: updatedAdmin.email,
          name: session.name || "Admin",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error: unknown) {
    console.error("Settings Update Error:", error);

    // Check if error is Prisma unique constraint violation
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "That email is already in use by another admin." },
        { status: 400 },
      );
    }
    return serverError("Internal server error");
  }
}
