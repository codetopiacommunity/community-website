import { EventsLedger } from "@/components/events/EventsLedger";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full py-32 md:py-40 bg-black overflow-hidden border-b border-zinc-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container className="relative z-10 px-4 font-sans flex flex-col gap-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] max-w-5xl">
            Events &<br />
            <span className="text-zinc-700">Activities</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
            The schedule for our upcoming build sessions, workshops, and
            community events.
          </p>
        </Container>
      </div>

      {/* Ledger */}
      <section className="w-full bg-black text-white z-20 relative border-t border-zinc-900 pb-24">
        <EventsLedger />
      </section>
    </>
  );
}
