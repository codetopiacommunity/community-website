"use server";

import { prisma } from "@/../prisma/prisma";
import { withRetry } from "@/lib/retry";

/**
 * Server Action: Fetches the total count of subscribers.
 * This is used to display the count of newsletter members.
 */
export async function getSubscriberCount(): Promise<number> {
  return withRetry(() => prisma.subscriber.count(), { fallback: 0 });
}
