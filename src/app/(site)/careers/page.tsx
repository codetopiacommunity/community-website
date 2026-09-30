import { ArrowUpRight } from "lucide-react";
import { CareersListing } from "@/components/careers/CareersListing";
import { Container } from "@/components/layout/Container";
import { POST_ROLE_URL } from "@/lib/data/links";

export const dynamic = "force-dynamic";

export default function CareersPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black border-b border-zinc-900">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                OPEN <span className="text-zinc-400">ROLES</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                Roles, internships, and projects from organisations that want to
                work with our members.
              </p>
            </div>
            <a
              href={POST_ROLE_URL}
              className="group inline-flex items-center gap-3 self-start md:self-end font-sans font-black text-[11px] uppercase tracking-[0.22em] text-white border-b border-zinc-800 pb-2 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
            >
              Hiring? Post a role
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
