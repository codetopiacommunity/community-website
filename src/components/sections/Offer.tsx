import Image from "next/image";
import { spaceGrotesk } from "@/fonts/fonts";

export default function Offer() {
  return (
    <section
      className={`relative bg-black/90 ${spaceGrotesk.className} p-3 overflow-hidden`}
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
          <span className="inline-block text-2xl font-medium text-white border-b-2 pb-2">
            What We Offer
          </span>
        </h2>

        <div className="flex flex-wrap gap-7 justify-center">
          {/* Card 1 */}
          <div className="bg-white basis-[18rem] min-w-[14rem] flex-1 p-10 shadow-[8px_8px_0_0_rgba(255,255,255,0.4)] transition-shadow duration-300 ease-out hover:shadow-[12px_12px_0_0_rgba(255,255,255,0.4)]">
            <Image
              src="/images/icon-events.png"
              alt="event"
              width={50}
              height={50}
            />
            <h3 className="my-4 text-inverse font-bold text-[18px]">Events</h3>
            <p className="text-inverse-2">
              Weekly meetups, workshops, and hackathons for all skill levels
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white basis-[18rem] min-w-[14rem] flex-1 p-10 shadow-[8px_8px_0_0_rgba(255,255,255,0.4)] transition-shadow duration-300 ease-out hover:shadow-[12px_12px_0_0_rgba(255,255,255,0.4)]">
            <Image
              src="/images/icon-events.png"
              alt="event"
              width={50}
              height={50}
            />
            <h3 className="my-4 text-inverse font-bold text-[18px]">Workshops</h3>
            <p className="text-inverse-2">
              Hands-on sessions focused on real-world tools and technologies
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white basis-[18rem] min-w-[14rem] flex-1 p-10 shadow-[8px_8px_0_0_rgba(255,255,255,0.4)] transition-shadow duration-300 ease-out hover:shadow-[12px_12px_0_0_rgba(255,255,255,0.4)]">
            <Image
              src="/images/icon-events.png"
              alt="event"
              width={50}
              height={50}
            />
            <h3 className="my-4 text-inverse font-bold text-[18px]">Community</h3>
            <p className="text-inverse-2">Connect, collaborate, and grow with like-minded developers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
