import { Resend } from "resend";
import { verificationTemplate } from "@/lib/email-templates/verification";
import { welcomeTemplate } from "@/lib/email-templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Codetopia Community <dispatch@codetopia.org>";

export async function sendVerificationEmail(
  to: string,
  token: string,
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/newsletter/verify?token=${token}`;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Verify your Codetopia newsletter subscription",
    html: verificationTemplate(verifyUrl, baseUrl),
  });
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Welcome to the Codetopia Community Dispatch!",
    html: welcomeTemplate(baseUrl),
  });
}
