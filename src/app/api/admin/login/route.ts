import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { serverError, validateRequired } from "@/lib/api/api-utils";
import { login } from "@/lib/auth/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const validationError = validateRequired({ email, password }, [
      "email",
      "password",
    ]);
    if (validationError) return validationError;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    await login({
      email: admin.email,
      name: "Admin",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login Error:", error);
    return serverError("Server error");
  }
}
