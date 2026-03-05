import { Compass, GitPullRequest, Layers, Ticket } from "lucide-react";
import Image from "next/image";
import codetopiaLogoTw from "@/assets/images/logos/Codetopia-Logo-TW.png";
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
    <section className="relative w-full py-24 md:py-32 bg-[#09090b] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Watermark Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
        <Image
          src={codetopiaLogoTw}
          alt="Codetopia Watermark"
          className="w-[150%] max-w-none md:w-full object-cover"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center w-full px-4 font-sans">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-4 font-sans">
            What We Offer
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-mono">
            Everything you need to accelerate your tech career, expand your
            network, and build the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-2 w-full max-w-[90rem]">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.title}
                className="relative group text-left cursor-pointer"
              >
                {/* Hollow offsetting border shadow */}
                <div className="absolute inset-0 border border-zinc-500 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

                {/* Main Card */}
                <div className="relative z-10 bg-[#e4e4e7] border border-transparent flex flex-col p-8 md:p-8 h-full transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
                  <div className="mb-8 md:mb-10 text-[#18181b]">
                    <Icon size={64} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#18181b] mb-4">
                    {offer.title}
                  </h3>
                  <p className="text-[#3f3f46] text-lg leading-relaxed">
                    {offer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
