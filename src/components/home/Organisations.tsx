"use client";

import Image from "next/image";
import { type Organisation, organisations } from "@/lib/data/partners";

const workedWith = organisations.filter((o) => o.types.includes("worked-with"));
const partners = organisations.filter((o) => o.types.includes("partner"));
const sponsors = organisations.filter((o) => o.types.includes("sponsor"));

function OrgLogo({ org }: { org: Organisation }) {
  return (
    <div className="group/logo flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer px-12 shrink-0">
      <Image
        src={org.logo}
        alt={org.name}
        width={160}
        height={72}
        className="h-14 w-auto object-contain"
        unoptimized
      />
    </div>
  );
}

function OrgStrip({ items }: { items: Organisation[] }) {
  // 1–4 items: static centered row, no scroll needed
  if (items.length < 5) {
    return (
      <div className="flex justify-center items-center gap-12 flex-wrap w-full py-4 px-4">
        {items.map((org) => (
          <OrgLogo key={org.id} org={org} />
        ))}
      </div>
    );
  }

  // 5+ items: CSS marquee — duplicate once, animate translateX(-50%)
  return (
    <div className="w-full overflow-hidden">
      <div
        role="marquee"
        className="flex items-center w-max"
        style={{
          animation: "marquee 25s linear infinite",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running";
        }}
      >
        {/* 2 copies is enough for a seamless loop with translateX(-50%) */}
        {[...items, ...items].map((org, i) => (
          <OrgLogo key={`${org.id}-${i}`} org={org} />
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function SubSection({
  title,
  items,
}: {
  title: string;
  items: Organisation[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center mb-14 last:mb-0">
      <h3 className="text-white text-sm font-bold tracking-[0.25em] mb-6 uppercase text-center font-sans opacity-50">
        {title}
      </h3>
      <OrgStrip items={items} />
    </div>
  );
}

export function Organisations() {
  return (
    <section className="w-full py-14 bg-[#09090b] border-b-4 border-zinc-800 flex flex-col items-center overflow-hidden">
      <SubSection title="Organisations We've Worked With" items={workedWith} />
      <SubSection title="Partners" items={partners} />
      <SubSection title="Sponsors" items={sponsors} />
    </section>
  );
}
