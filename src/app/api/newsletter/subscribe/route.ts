import { NextResponse } from "next/server";
import { generateVerificationToken, getTokenExpiry } from "@/lib/auth/token";
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "../../../../../prisma/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 },
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { message: "Email is too long." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === "verified") {
        return NextResponse.json(
          { message: "Email already part of the community." },
          { status: 409 },
        );
      }

      if (existing.tokenExpiresAt && existing.tokenExpiresAt > new Date()) {
        return NextResponse.json(
          {
            message:
              "A verification email was already sent recently. Please check your inbox (and spam folder).",
          },
          { status: 200 },
        );
      }

      const token = generateVerificationToken();
      const expiresAt = getTokenExpiry();

      await prisma.subscriber.update({
        where: { email },
        data: {
          verificationToken: token,
          tokenExpiresAt: expiresAt,
        },
      });

      await sendVerificationEmail(email, token);

      return NextResponse.json(
        {
          message: "Re-sent. Check your email.",
        },
        { status: 200 },
      );
    }

    const token = generateVerificationToken();
    const expiresAt = getTokenExpiry();

    await prisma.subscriber.create({
      data: {
        email,
        verificationToken: token,
        tokenExpiresAt: expiresAt,
      },
    });

    await sendVerificationEmail(email, token);

    return NextResponse.json(
      { message: "Almost there. Check your inbox to verify." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { message: "Technical error. Please try again." },
      { status: 500 },
    );
  }
}
