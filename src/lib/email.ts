import type { ReactElement } from "react";
import { Resend } from "resend";
import { VerificationTemplate } from "@/lib/email-templates/verification";
import { WelcomeTemplate } from "@/lib/email-templates/welcome";
import {
  createConfirmToken,
  currentConfirmWindow,
  hashEmail,
} from "@/lib/newsletter/token";
import { getBaseUrl } from "@/lib/site-url";

export const resend = new Resend(
  process.env.RESEND_API_KEY || "re_placeholder",
);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Codetopia Community <dispatch@codetopia.org>";

// Both mean Resend already has this email from an earlier request.
const ALREADY_ACCEPTED = new Set([
  "concurrent_idempotent_requests",
  "invalid_idempotent_request",
]);

/** Resend returns failures rather than throwing, so they have to be raised here. */
async function sendEmail(
  email: { to: string; subject: string; react: ReactElement },
  idempotencyKey: string,
): Promise<void> {
  const { error } = await resend.emails.send(
    { from: FROM_ADDRESS, ...email },
    { idempotencyKey },
  );

  if (error && !ALREADY_ACCEPTED.has(error.name)) {
    throw new Error(`Resend rejected the email: ${error.name}`);
  }
}

export async function sendVerificationEmail(to: string): Promise<void> {
  const baseUrl = getBaseUrl();
  const token = await createConfirmToken(to);
  const verifyUrl = `${baseUrl}/api/newsletter/verify?token=${encodeURIComponent(token)}`;

  await sendEmail(
    {
      to,
      subject: "Verify your subscription to The Dispatch",
      react: VerificationTemplate({ verifyUrl, baseUrl }),
    },
    `dispatch-confirm/${hashEmail(to)}/${currentConfirmWindow()}`,
  );
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  await sendEmail(
    {
      to,
      subject: "Welcome to the Codetopia Community Dispatch!",
      react: WelcomeTemplate({ baseUrl: getBaseUrl() }),
    },
    `dispatch-welcome/${hashEmail(to)}`,
  );
}
