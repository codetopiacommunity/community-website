import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

/**
 * GET: List all admin accounts (email + id only, no passwords)
 */
export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admins = await prisma.admin.findMany({
    select: { id: true, email: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(admins);
}

/**
 * POST: Add a new admin — initial password is set to their email address
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
}
