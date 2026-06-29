"use server";

import type { Newsletter, NewsletterDeliveryLog } from "@prisma/client";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth/auth";

export async function getNewsletters(): Promise<Newsletter[]> {
  const session = await getSession();
  if (!session) return [];
  try {
    return await prisma.newsletter.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getNewsletters: failed to fetch newsletters", error);
    return [];
  }
}

export async function getDeliveryLogs(
  limit = 5,
): Promise<(NewsletterDeliveryLog & { newsletter: { subject: string } })[]> {
  const session = await getSession();
  if (!session) return [];
  try {
    return await prisma.newsletterDeliveryLog.findMany({
      orderBy: { completedAt: "desc" },
      take: limit,
      include: {
        newsletter: {
          select: { subject: true },
        },
      },
    });
  } catch (error) {
    console.error("getDeliveryLogs: failed to fetch delivery logs", error);
    return [];
  }
}
