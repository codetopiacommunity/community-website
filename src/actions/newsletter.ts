"use server";

import type { Newsletter, NewsletterDeliveryLog } from "@prisma/client";
import { prisma } from "@/../prisma/prisma";

export async function getNewsletters(): Promise<Newsletter[]> {
  return prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getDeliveryLogs(
  limit = 5,
): Promise<(NewsletterDeliveryLog & { newsletter: { subject: string } })[]> {
  return prisma.newsletterDeliveryLog.findMany({
    orderBy: { completedAt: "desc" },
    take: limit,
    include: {
      newsletter: {
        select: { subject: true },
      },
    },
  });
}
