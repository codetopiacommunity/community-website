import { Compass, GitPullRequest, Layers, Ticket } from "lucide-react";
import { Container } from "@/components/layout/Container";

const offers = [
  {
    title: "Direct Mentorship",
    description:
      "1-on-1 guidance from experienced engineers to help you navigate your tech journey.",
    icon: Compass,
  },
  {
    title: "Collaborative Projects",
    description:
      "Real-world engineering on community-led systems and open-source contributions.",
    icon: GitPullRequest,
  },
  {
    title: "Technical Training",
    description:
      "Structured learning paths and workshops from fundamentals to advanced architecture.",
    icon: Layers,
  },
  {
    title: "Community Events",
    description:
      "Meetups, technical sessions, and hackathons to connect and build together.",
    icon: Ticket,
  },
];

export function WhatWeOffer() {
  return (
    <section className="relative w-full py-32 bg-black text-white border-t border-zinc-900 overflow-hidden">
      <Container className="relative z-10 w-full px-4 max-w-7xl">
        <div className="mb-24 text-left">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-8 leading-none font-sans">
            WHAT WE <span className="text-zinc-500">OFFER</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            We provide the infrastructure and mentorship needed to rotate from
            theory to engineering impact.
          </p>
        </div>
      </Container>

      <div className="flex flex-col border-t border-zinc-900">
        {offers.map((offer, index) => (
          <div
            key={offer.title}
            className="group relative border-b border-zinc-900 transition-colors hover:bg-zinc-900/50"
          >
            <Container className="relative z-10 w-full px-4 max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between py-16">
              {/* Massive Architectural Number */}
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-white/[0.02] pointer-events-none select-none">
                0{index + 1}
              </span>

              <div className="relative z-10 flex items-center gap-6 mb-4 md:mb-0">
                <offer.icon className="w-8 h-8 text-white" strokeWidth={2} />
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter font-sans">
                  {offer.title}
                </h3>
              </div>
              <p className="relative z-10 text-zinc-500 font-mono text-base md:text-lg max-w-xl md:text-right">
                {offer.description}
              </p>
            </Container>
          </div>
        ))}
      </div>
    </section>
  );
}
