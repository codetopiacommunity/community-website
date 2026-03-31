import heroBg from "@/assets/images/django-girls.jpg";
import { EventsLedger } from "@/components/events/EventsLedger";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <>
      {/* Hero Section with Depth */}
      <div className="relative w-full min-h-[70vh] flex flex-col pt-32 pb-20 overflow-hidden bg-black">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale"
          style={{ backgroundImage: `url('${heroBg.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-0" />

        <Container className="flex flex-col items-start text-left px-4 font-sans relative z-10">
          <div className="mb-10">
            <span className="text-zinc-400 font-mono text-sm uppercase tracking-[0.4em] mb-4 block animate-pulse">
              ● THE SCHEDULE
            </span>
          </div>
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-10 leading-[0.9] max-w-4xl">
            EVENTS & <br />
            <span className="text-zinc-700">ACTIVITIES</span>
          </h1>
          {/* Description */}
          <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl font-mono">
            We don't do simple meet-and-greets. This is the operational schedule
            for our upcoming Build Together sessions, Open Source Sprints, and
            Engineering Syncs.
            <span className="text-white block mt-4 font-sans font-black uppercase tracking-tighter">
              Secure your spot.
            </span>
          </p>
        </Container>
      </div>

      {/* Ledger Section */}
      <section className="w-full py-16 md:py-48 bg-black text-white z-20 overflow-hidden relative border-t border-zinc-900">
        <Container className="w-full px-4 relative z-10">
          <EventsLedger />
        </Container>
      </section>


    </>
  );
}
