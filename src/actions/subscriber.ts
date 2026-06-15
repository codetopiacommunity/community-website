"use server";

import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth/auth";
import { withRetry } from "@/lib/retry";

export async function getSubscriberCount(): Promise<number> {
  const session = await getSession();
  if (!session) return 0;
  return withRetry(() => prisma.subscriber.count(), { fallback: 0 });
}
