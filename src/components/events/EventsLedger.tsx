import { prisma } from "@/../prisma/prisma";
import type { Event } from "@/lib/events";
import { EventsClient } from "./EventsClient";

export async function EventsLedger() {
  let events: Event[] = [];
  try {
    const rows = await prisma.event.findMany({ orderBy: { startDate: "asc" } });
    events = rows as unknown as Event[];
  } catch (error) {
    console.error("EventsLedger: failed to fetch events", error);
  }
  return <EventsClient initialEvents={events} />;
}
