import nodemailer from "nodemailer";
import { verificationTemplate } from "@/lib/email-templates/verification";
import { welcomeTemplate } from "@/lib/email-templates/welcome";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_ADDRESS =
  process.env.SMTP_FROM ?? "Codetopia <noreply@codetopia.com>";

export async function sendVerificationEmail(
  to: string,
  token: string,
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:4000";
  const verifyUrl = `${baseUrl}/api/newsletter/verify?token=${token}`;

  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: "Verify your Codetopia newsletter subscription",
    html: verificationTemplate(verifyUrl),
  });
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:4000";

  await transporter.sendMail({
    from: FROM_ADDRESS,
    to,
    subject: "Welcome to the Codetopia Dispatch! 🎉",
    html: welcomeTemplate(baseUrl),
  });
}
