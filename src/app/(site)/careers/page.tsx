import { CareersListing } from "@/components/careers/CareersListing";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export default function CareersPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black border-b border-zinc-900">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                OPEN <span className="text-zinc-700">ROLES</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                Internships, jobs, and projects built for the community.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Listings */}
      <section className="pb-32">
        <CareersListing />
      </section>
    </div>
  );
}
