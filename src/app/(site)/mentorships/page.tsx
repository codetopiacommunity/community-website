import { MentorshipsGridIsland } from "./MentorshipsGridIsland";

export const dynamic = "force-dynamic";

export default function MentorshipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black border-b border-zinc-900">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
            MENTOR<span className="text-zinc-700">SHIPS</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
            Guided sessions built for the community, led by experienced members.
          </p>
        </div>
      </section>

      {/* Ledger */}
      <section className="w-full bg-black text-white z-20 relative border-t border-zinc-900 pb-24">
        <MentorshipsGridIsland />
      </section>
    </>
  );
}
