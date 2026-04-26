import heroBg from "@/assets/images/careers-hero.png";
import { CareersListing } from "@/components/careers/CareersListing";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export default function CareersPage() {
  return (
    <>
      {/* Hero Section */}
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
              ● OPEN OPPORTUNITIES
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-10 leading-[0.9] max-w-4xl">
            BUILD THE <br />
            <span className="text-zinc-700">FUTURE</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl font-mono">
            Codetopia Community is more than a community — it&apos;s a launchpad. We
            connect builders with internships, job offers, and open-source
            projects that actually matter.
            <span className="text-white block mt-4 font-sans font-black uppercase tracking-tighter">
              Your next move starts here.
            </span>
          </p>
        </Container>
      </div>

      {/* Careers Listing */}
      <section className="w-full bg-black text-white z-20 relative border-t border-zinc-900 pb-24">
        <CareersListing />
      </section>
    </>
  );
}
