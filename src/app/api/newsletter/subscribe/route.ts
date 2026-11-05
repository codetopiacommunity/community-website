import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import { isSubscribed } from "@/lib/newsletter/contacts";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The same answer for new and existing addresses, so this endpoint can't be
// used to find out who is subscribed.
const CHECK_INBOX =
  "Check your inbox to confirm your subscription. If you're already subscribed, there's nothing else to do.";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const fields =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {};

    // Hidden field that people never see, so only bots fill it in.
    if (fields.website) {
      return NextResponse.json({ message: CHECK_INBOX });
    }

    const email =
      typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";

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

    if (!(await isSubscribed(email))) {
      await sendVerificationEmail(email);
    }

    return NextResponse.json({ message: CHECK_INBOX });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { message: "Technical error. Please try again." },
      { status: 500 },
    );
  }
}
