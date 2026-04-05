import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSession } from "@/lib/auth";
import { renderNewsletterHtml } from "@/lib/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Codetopia Community <dispatch@codetopia.org>";

function isValidEmail(email: string): boolean {
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;
  const domain = email.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  return dot > 0 && dot < domain.length - 1 && !email.includes(" ");
}

/**
 * POST: Send a test email to a specified address without persisting any records
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, subject, previewText, markdownContent } = await request.json();

    if (!to || !isValidEmail(to)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const html = await renderNewsletterHtml(
      markdownContent ?? "",
      subject ?? "",
      previewText,
      process.env.NEXT_PUBLIC_BASE_URL ?? "",
    );

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject: subject ?? "",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("POST Newsletter Test Send Error:", error);
    return NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 },
    );
  }
}
