import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { requireAuth, serverError } from "@/lib/api/api-utils";

/**
 * GET: List all admin accounts (email + id only, no passwords)
 */
export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error("GET Admins Error:", error);
    return serverError("Failed to fetch admins");
  }
}

/**
 * POST: Add a new admin — initial password is set to their email address
 */
export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { email } = await request.json();

    if (
      !email ||
      !email.includes("@") ||
      email.indexOf("@") !== email.lastIndexOf("@") ||
      email.startsWith("@") ||
      email.endsWith("@") ||
      email.endsWith(".")
    ) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An admin with that email already exists" },
        { status: 400 },
      );
    }

    // Initial password = the email address itself
    const password = await bcrypt.hash(email, 10);

    const admin = await prisma.admin.create({
      data: { email, password },
      select: { id: true, email: true, createdAt: true },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error("POST Admins Error:", error);
    return serverError("Failed to create admin");
  }
}
