import { prisma } from "@/../prisma/prisma";
import type { Event } from "@/lib/events";
import { EventsClient } from "./EventsClient";

export async function EventsLedger() {
  const events = await prisma.event.findMany({ orderBy: { startDate: "asc" } });
  return <EventsClient initialEvents={events as unknown as Event[]} />;
}
