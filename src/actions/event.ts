"use server";

import { prisma } from "@/../prisma/prisma";

export async function getUpcomingEventsCount(): Promise<number> {
  const maxRetries = 2;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const count = await prisma.event.count({
        where: {
          endDate: {
            gt: new Date(),
          },
        },
      });
      return count;
    } catch (_error) {
      if (i === maxRetries) return 0;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return 0;
}
