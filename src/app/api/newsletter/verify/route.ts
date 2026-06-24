import { type NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "../../../../../prisma/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:4000";

// GET: validate the token and redirect to the confirmation page.
// No writes happen here — email prefetchers and security scanners follow
// GET links automatically, so keeping this step read-only prevents them
// from silently consuming the one-time token before the user sees the email.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/newsletter/expired`);
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

  return NextResponse.redirect(`${baseUrl}/newsletter/confirm?token=${token}`);
}

// POST: called by the confirmation page form — performs the actual verification.
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string | null;

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/newsletter/expired`);
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
  } catch (error) {
    console.error("Newsletter verification error:", error);
    return NextResponse.redirect(`${baseUrl}/newsletter/expired`);
  }
}
