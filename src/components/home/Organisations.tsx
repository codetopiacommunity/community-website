"use client";

import Image from "next/image";
import { type Organisation, organisations } from "@/lib/data/partners";

const sponsors = organisations.filter((o) => o.type === "sponsor");
const partners = organisations.filter((o) => o.type === "partner");
const workedWith = organisations.filter((o) => o.type === "worked-with");

function OrgLogo({ org }: { org: Organisation }) {
  const content = (
    <div className="group/logo flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer px-4 md:px-8 shrink-0">
      <Image
        src={org.logo}
        alt={org.name}
        width={224}
        height={80}
        className="h-16 md:h-20 w-40 md:w-56 object-contain"
        unoptimized
      />
    </div>
  );

  if (org.website) {
    return (
      <a href={org.website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

function OrgStrip({ items }: { items: Organisation[] }) {
  // 1–4 items: static single-line row, centered
  if (items.length < 5) {
    return (
      <div className="flex justify-center items-center gap-4 md:gap-12 flex-nowrap w-full py-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
    <div className="w-full flex flex-col items-center mb-14 last:mb-0 px-4 md:px-16 lg:px-24">
      <h3 className="text-white text-sm font-bold tracking-[0.25em] mb-6 uppercase text-center font-sans opacity-50">
        {title}
      </h3>
      <OrgStrip items={items} />
    </div>
  );
}

export function Organisations() {
  return (
    <section className="w-full py-14 bg-black border-b-4 border-zinc-900 flex flex-col items-center overflow-hidden">
      <SubSection title="Sponsors" items={sponsors} />
      <SubSection title="Partners" items={partners} />
      <SubSection title="Organisations We've Worked With" items={workedWith} />
    </section>
  );
}
