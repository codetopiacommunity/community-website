import { render } from "@react-email/render";
import { marked } from "marked";
import { Resend } from "resend";
import { prisma } from "@/../prisma/prisma";
import { NewsletterTemplate } from "@/lib/email-templates/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Codetopia Community <dispatch@codetopia.org>";

const BATCH_SIZE = 50;

/**
 * Replaces known template variables in the markdown string.
 * Unknown {{placeholder}} patterns are left unchanged.
 */
export function substituteTemplateVars(
  markdown: string,
  baseUrl: string,
): string {
  return markdown.replaceAll("{{base_url}}", baseUrl);
}

/**
 * Runs the full rendering pipeline:
 *   substituteTemplateVars → marked (markdown → HTML) → NewsletterTemplate → @react-email/render
 */
export async function renderNewsletterHtml(
  markdown: string,
  subject: string,
  previewText: string | undefined,
  baseUrl: string,
): Promise<string> {
  const substituted = substituteTemplateVars(markdown, baseUrl);
  const htmlContent = await marked(substituted);
  return render(
    NewsletterTemplate({ subject, previewText, htmlContent, baseUrl }),
  );
}

/**
 * Sends a newsletter broadcast to all verified subscribers in sequential batches of 50.
 * Updates the Newsletter status and writes a NewsletterDeliveryLog on completion.
 */
export async function sendNewsletterBatch(newsletterId: number): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const newsletter = await prisma.newsletter.findUnique({
    where: { id: newsletterId },
  });

  if (!newsletter) {
    throw new Error(`Newsletter with id ${newsletterId} not found`);
  }

  // Mark as sending before we begin
  await prisma.newsletter.update({
    where: { id: newsletterId },
    data: { status: "sending" },
  });

  const subscribers = await prisma.subscriber.findMany({
    where: { status: "verified" },
  });

  const total = subscribers.length;
  let successCount = 0;
  let failCount = 0;

  // Chunk into batches of BATCH_SIZE
  const batches: (typeof subscribers)[] = [];
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    batches.push(subscribers.slice(i, i + BATCH_SIZE));
  }

  const html = await renderNewsletterHtml(
    newsletter.markdownContent,
    newsletter.subject,
    newsletter.previewText ?? undefined,
    baseUrl,
  );

  for (const batch of batches) {
    for (const subscriber of batch) {
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: subscriber.email,
          subject: newsletter.subject,
          html,
        });
        successCount++;
      } catch (err) {
        console.error(
          `Failed to send newsletter ${newsletterId} to ${subscriber.email}:`,
          err,
        );
        failCount++;
      }
    }
  }

  // Determine log status
  const logStatus =
    successCount === total ? "sent" : successCount === 0 ? "failed" : "partial";

  const newsletterStatus = successCount === 0 ? "failed" : "sent";
  const now = new Date();

  // Write delivery log — errors here must not surface to the caller
  try {
    await prisma.newsletterDeliveryLog.create({
      data: {
        newsletterId,
        totalRecipients: total,
        successCount,
        failCount,
        status: logStatus,
        completedAt: now,
      },
    });
  } catch (err) {
    console.error(
      `Failed to write delivery log for newsletter ${newsletterId}:`,
      err,
    );
  }

  await prisma.newsletter.update({
    where: { id: newsletterId },
    data: {
      status: newsletterStatus,
      recipientCount: total,
      sentAt: now,
    },
  });
}
