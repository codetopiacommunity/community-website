import { type NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:4000";

    if (!token) {
      return NextResponse.json(
        { message: "Verification token missing." },
        { status: 400 },
      );
    }

    const subscriber = await prisma.subscriber.findUnique({
      where: { verificationToken: token },
    });

    if (!subscriber) {
      return NextResponse.redirect(`${baseUrl}/newsletter/expired`);
    }

    if (subscriber.status === "verified") {
      return NextResponse.redirect(`${baseUrl}/newsletter/verified`);
    }

    if (subscriber.tokenExpiresAt && subscriber.tokenExpiresAt < new Date()) {
      return NextResponse.redirect(`${baseUrl}/newsletter/expired`);
    }

    await prisma.subscriber.update({
      where: { id: subscriber.id },
      data: {
        status: "verified",
        verificationToken: null,
        tokenExpiresAt: null,
        verifiedAt: new Date(),
      },
    });

    await sendWelcomeEmail(subscriber.email);

    return NextResponse.redirect(`${baseUrl}/newsletter/verified`);
    // biome-ignore lint/suspicious/noExplicitAny: error is logged and exposed for debugging
  } catch (error: any) {
    console.error("Newsletter verification error:", error);

    return NextResponse.json(
      {
        message: "Verification failed. System error.",
        error: error.message || "Unknown error",
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
