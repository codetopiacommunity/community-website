import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken, getTokenExpiry } from "@/lib/token";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
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
          { message: "This email is already subscribed." },
          { status: 409 },
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
        { message: "A new verification email has been sent. Please check your inbox." },
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
      { message: "Please check your email to verify your subscription." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
