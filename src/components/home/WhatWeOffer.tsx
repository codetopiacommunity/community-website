import Image from "next/image";
import articlesLogo from "@/assets/images/logos/articles-logo.png";
import codetopiaLogoTw from "@/assets/images/logos/Codetopia-Logo-TW.png";
import communityLogo from "@/assets/images/logos/community-logo.png";
import eventsLogo from "@/assets/images/logos/events-logo.png";
import { Container } from "@/components/layout/Container";

const offers = [
  {
    title: "Events",
    description:
      "Weekly meetups, workshops, and hackathons for all skill levels.",
    icon: eventsLogo,
  },
  {
    title: "Tech Articles",
    description:
      "Community-written articles on latest technologies and best practices.",
    icon: articlesLogo,
  },
  {
    title: "Active Community",
    description: "Connect with like-minded individuals and grow your network.",
    icon: communityLogo,
  },
];

export function WhatWeOffer() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#18181b] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Watermark Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
        <Image
          src={codetopiaLogoTw}
          alt="Codetopia Watermark"
          className="w-[150%] max-w-none md:w-full object-cover"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center w-full px-4 font-sans">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-2">
            What We Offer
          </h2>
          <div className="w-24 h-1 bg-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 w-full max-w-[90rem]">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="relative group text-left cursor-pointer"
            >
              {/* Solid thick brutish shadow behind the card */}
              <div className="absolute inset-0 bg-zinc-600 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Main Card */}
              <div className="relative z-10 bg-[#e4e4e7] border border-transparent flex flex-col p-10 md:p-14 h-full transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
                <div className="mb-6 md:mb-8">
                  <Image
                    src={offer.icon}
                    alt={`${offer.title} Icon`}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#18181b] mb-4">
                  {offer.title}
                </h3>
                <p className="text-[#3f3f46] text-lg leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
