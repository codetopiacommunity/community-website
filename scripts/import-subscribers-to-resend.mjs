/**
 * One-time move of verified subscribers from the Subscriber table into the
 * Resend segment that now holds The Dispatch's list.
 *
 * Safe to run more than once. Contacts that are already there are left alone,
 * and anyone who has unsubscribed in Resend stays unsubscribed. Pending
 * subscribers never confirmed, so they aren't imported.
 *
 *   pnpm import:subscribers           # dry run: reports what would happen
 *   pnpm import:subscribers --apply   # writes to Resend
 *
 * Point DATABASE_URL and RESEND_API_KEY at production to move the real list.
 * No address is printed, only totals.
 */

import { setTimeout as sleep } from "node:timers/promises";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { Resend } from "resend";

const { DATABASE_URL, RESEND_API_KEY, RESEND_NEWSLETTER_SEGMENT_ID } =
  process.env;

if (!DATABASE_URL || !RESEND_API_KEY || !RESEND_NEWSLETTER_SEGMENT_ID) {
  console.error(
    "DATABASE_URL, RESEND_API_KEY and RESEND_NEWSLETTER_SEGMENT_ID must all be set.",
  );
  process.exit(1);
}

const apply = process.argv.includes("--apply");
const segmentId = RESEND_NEWSLETTER_SEGMENT_ID;
const resend = new Resend(RESEND_API_KEY);

// Keeps below Resend's rate limit and backs off if it's hit anyway.
async function call(request) {
  for (let attempt = 0; ; attempt++) {
    await sleep(600);
    const result = await request();
    if (result.error?.name !== "rate_limit_exceeded" || attempt === 4) {
      return result;
    }
    await sleep(2000 * (attempt + 1));
  }
}

async function importSubscriber(email) {
  const found = await call(() => resend.contacts.get({ email }));
  if (found.error && found.error.name !== "not_found") {
    throw new Error(found.error.name);
  }

  if (found.error) {
    if (apply) {
      const created = await call(() =>
        resend.contacts.create({
          email,
          unsubscribed: false,
          segments: [{ id: segmentId }],
        }),
      );
      if (created.error) throw new Error(created.error.name);
    }
    return "created";
  }

  if (found.data.unsubscribed) return "keptUnsubscribed";

  const segments = await call(() => resend.contacts.segments.list({ email }));
  if (segments.error) throw new Error(segments.error.name);
  if (segments.data.data.some((segment) => segment.id === segmentId)) {
    return "alreadyPresent";
  }

  if (apply) {
    const added = await call(() =>
      resend.contacts.segments.add({ email, segmentId }),
    );
    if (added.error) throw new Error(added.error.name);
  }
  return "addedToSegment";
}

const pool = new Pool({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const totals = {
  created: 0,
  addedToSegment: 0,
  alreadyPresent: 0,
  keptUnsubscribed: 0,
  failed: 0,
};

try {
  const subscribers = await prisma.subscriber.findMany({
    where: { status: "verified" },
    select: { id: true, email: true },
    orderBy: { id: "asc" },
  });

  console.log(
    `${apply ? "Importing" : "Dry run for"} ${subscribers.length} verified subscribers.`,
  );

  for (const { id, email } of subscribers) {
    try {
      totals[await importSubscriber(email)]++;
    } catch (error) {
      totals.failed++;
      console.error(`Subscriber ${id} failed: ${error.message}`);
    }
  }

  console.log(totals);
  if (totals.failed > 0) process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await pool.end();
}
