import { prisma } from "@/../prisma/prisma";
import type { Event } from "@/lib/events";
import { EventsClient } from "./EventsClient";

export async function EventsLedger() {
  let events: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  try {
    events = await prisma.event.findMany({ orderBy: { startDate: "asc" } });
  } catch {
    // Retry once on cold-start timeout
    events = await prisma.event.findMany({ orderBy: { startDate: "asc" } });
  }

  return <EventsClient initialEvents={events as unknown as Event[]} />;
}
