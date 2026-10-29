import { ArrowUpRight } from "lucide-react";
import { CareersListing } from "@/components/careers/CareersListing";
import { PageHeader } from "@/components/layout/PageHeader";
import { POST_ROLE_URL } from "@/lib/data/links";

export const dynamic = "force-dynamic";

export default function CareersPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <PageHeader
        title="Open roles"
        action={
          <a
            href={POST_ROLE_URL}
            className="uppercase tracking-[0.22em] group inline-flex items-center gap-3 font-sans font-bold text-xs text-white border-b border-zinc-800 pb-2 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
          >
            Hiring? Post a role
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        }
      >
        Roles, internships, and projects from organisations that want to work
        with our members.
      </PageHeader>

      {/* Listings */}
      <section className="pb-32">
        <CareersListing />
      </section>
    </div>
  );
}
