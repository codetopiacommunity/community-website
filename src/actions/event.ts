"use server";

import { prisma } from "@/../prisma/prisma";
import { withRetry } from "@/lib/retry";

export async function getUpcomingEventsCount(): Promise<number> {
  const result = await withRetry(
    () =>
      prisma.event.count({
        where: {
          endDate: {
            gt: new Date(),
          },
        },
      }),
    { fallback: 0 },
  );
  return (result as number) ?? 0;
}
