"use server";

import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth/auth";
import { withRetry } from "@/lib/retry";

export async function getUpcomingEventsCount(): Promise<number> {
  const session = await getSession();
  if (!session) return 0;
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
