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

// The same request is still in progress, so the email is on its way.
const ALREADY_IN_PROGRESS = "concurrent_idempotent_requests";

/** Resend returns failures rather than throwing, so they have to be raised here. */
async function sendEmail(
  email: { to: string; subject: string; react: ReactElement },
  idempotencyKey: string,
): Promise<void> {
  const { error } = await resend.emails.send(
    { from: FROM_ADDRESS, ...email },
    { idempotencyKey },
  );

  if (error && error.name !== ALREADY_IN_PROGRESS) {
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
      subject: "Confirm your subscription to The Dispatch",
      react: VerificationTemplate({ verifyUrl, baseUrl }),
    },
    `dispatch-confirm/${hashEmail(to)}/${currentConfirmWindow()}`,
  );
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  await sendEmail(
    {
      to,
      subject: "You're subscribed to The Dispatch",
      react: WelcomeTemplate({ baseUrl: getBaseUrl() }),
    },
    // Short-lived on purpose. It only needs to catch a double click, and someone
    // who leaves and comes back later should get welcomed again.
    `dispatch-welcome/${hashEmail(to)}/${currentConfirmWindow()}`,
  );
}
