"use server";

import { prisma } from "@/../prisma/prisma";

/**
 * Server Action: Fetches the total count of subscribers.
 * This is used to display the count of newsletter members.
 */
export async function getSubscriberCount(): Promise<number> {
  const maxRetries = 2;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const totalCount = await prisma.subscriber.count();
      return totalCount;
    } catch (error) {
      if (i === maxRetries) {
        console.error(
          "Error fetching subscriber count (after retries):",
          error,
        );
        return 0; // Return 0 as final fallback
      }
      console.warn(`Retry ${i + 1} fetching subscriber count...`);
      // Wait 1s before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return 0;
}
