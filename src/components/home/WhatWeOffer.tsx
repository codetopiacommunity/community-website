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
      <Container className="relative z-10 w-full px-4">
        <div className="mb-24 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
            What We <span className="text-zinc-400">Offer</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-mono max-w-2xl">
            We provide the infrastructure and mentorship needed to rotate from
            theory to engineering impact.
          </p>
        </div>
      </Container>

      <div className="flex flex-col border-t border-zinc-900">
        {offers.map((offer) => (
          <div
            key={offer.title}
            className="group relative border-b border-zinc-900 transition-all duration-300 hover:bg-zinc-900/40 cursor-default"
          >
            <Container className="relative z-10 w-full px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 lg:py-16 gap-6 lg:gap-0">
              {/* Left: icon + title */}
              <div className="relative z-10 flex items-center gap-5 lg:gap-8 flex-1">
                <offer.icon
                  className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-400 shrink-0 transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter font-sans transition-colors duration-300">
                  {offer.title}
                </h3>
              </div>

              {/* Right: description + arrow */}
              <div className="relative z-10 flex items-center gap-8 lg:max-w-xl lg:justify-end">
                <p className="text-zinc-400 font-mono text-sm lg:text-base lg:text-right transition-colors duration-300 group-hover:text-white">
                  {offer.description}
                </p>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </section>
  );
}
