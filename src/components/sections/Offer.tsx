import Image from "next/image";
import { spaceGrotesk } from "@/fonts/fonts";

export default function Offer() {

  const offerCards = [
    {
      title: "Events",
      description: "Weekly meetups, workshops, and hackathons for all skill levels",
      icon: "/images/icon-events.png",
    },
    {
      title: "Workshops",
      description: "Hands-on sessions focused on real-world tools and technologies",
      icon: "/images/Web Design.png",
    },
    {
      title: "Community",
      description: "Connect, collaborate, and grow with like-minded developers",
      icon: "/images/Crowd.png",
    },
  ];

  return (
    <section
      className={`relative  ${spaceGrotesk.className} p-3 overflow-hidden`}
    >

      <Image
        src="/images/codetopia-bg.jpg"
        alt="Codetopia background"
        fill
        className="object-cover"
        priority
      />

      {/* Section Content */}
      <div className="relative z-10 lg:max-w-[80%] mx-auto py-20">
        <h2 className="text-center mb-10 uppercase">
          <span className="inline-block text-2xl font-medium text-ct-primary border-b-2 pb-2">
            What We Offer
          </span>
        </h2>

        <div className="flex flex-wrap gap-7 justify-center">
          {offerCards.map((card, index) => (
            <div
              key={index}
              className="bg-ct-primary basis-[18rem] min-w-[14rem] flex-1 p-10 shadow-ct-offer transition-all duration-300 ease-out hover:shadow-ct-offer-hover"
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={50}
                height={50}
              />

              <h3 className="my-4 text-ct-inverse font-bold text-[18px]">
                {card.title}
              </h3>

              <p className="text-ct-inverse-2">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
