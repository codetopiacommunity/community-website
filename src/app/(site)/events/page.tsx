import { EventsLedger } from "@/components/events/EventsLedger";
import { PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <>
      <PageHeader title="Events">
        Meetups, workshops and online sessions you can join.
      </PageHeader>

      {/* Ledger */}
      <section className="w-full bg-black text-white z-20 relative pb-24">
        <EventsLedger />
      </section>
    </>
  );
}
