import { spaceGrotesk } from "@/fonts/fonts";

export default function GrowingCommunity() {
  return (
    <section className={`relative bg-white ${spaceGrotesk.className} p-3 `}>
      {/* Section Content */}
      <div className="relative z-10 lg:max-w-[80%] mx-auto py-20">
        <h2 className="text-center mb-10 uppercase ">
          <span className="inline-block text-2xl font-medium text-black border-b-2 border-black pb-2">
            Our Growing Community
          </span>
        </h2>
        <p className="text-center mb-5">
          A thriving tech community where developer, engineers, designers, and
          tech enthusiasts come together to learn, shrae, and grow
        </p>

        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[300px]">
          {/* Left card */}
          <div className="flex flex-col bg-amber-300 justify-end p-8 flex-1">
            <p className="text-right">
              <span className="block text-4xl font-bold">10+</span>
              <span className="block text-sm">Workshop &amp; meetups</span>
            </p>
          </div>

          {/* Right column (two stacked cards) */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col bg-amber-300 justify-end p-8 flex-1">
              <p className="text-right">
                <span className="block text-4xl font-bold">13+</span>
                <span className="block text-sm">Workshops &amp; meetups</span>
              </p>
            </div>
            <div className="flex flex-col bg-amber-300 justify-end p-8 flex-1">
              <p className="text-right">
                <span className="block text-4xl font-bold">7+</span>
                <span className="block text-sm">Workshops &amp; meetups</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
