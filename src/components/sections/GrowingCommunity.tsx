import { spaceGrotesk } from "@/fonts/fonts";

export default function GrowingCommunity() {
  return (
    <section className={`relative bg-ct-surface ${spaceGrotesk.className} p-3 `}>
      {/* Section Content */}
      <div className="relative z-10 lg:max-w-[80%] mx-auto py-10">

        <div className="text-center mb-16 space-y-4">
          <h2 className="inline-block text-2xl font-medium text-ct-inverse border-b-2 border-ct-inverse pb-2">
            Our Growing Community
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent mx-auto w-1/2"></span>
          </h2>
          <p className="text-center text-ct-inverse mb-5 max-w-3xl mx-auto">
            A thriving tech community where developer, engineers, designers, and
            tech enthusiasts come together to learn, share, and grow
          </p>
        </div>



        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[300px]">
          {/* Left card */}
          <div className="relative flex flex-col justify-end p-8 flex-1 bg-[url('/images/stats-bg-1.png')] bg-cover bg-center shadow-ct-stats
                transition-shadow duration-300 hover:shadow-ct-stats-hover">
            {/* Diagonal overlay */}
            <div className="absolute inset-0 bg-gradient-to-tl from-black/100 to-transparent pointer-events-none"></div>

            {/* Text */}
            <p className="relative text-right text-ct-primary">
              <span className="block text-4xl font-bold">10+</span>
              <span className="block text-sm">Workshop &amp; meetups</span>
            </p>
          </div>

          {/* Right column (two stacked cards) */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="relative flex flex-col  justify-end p-8 flex-1 bg-[url('/images/stats-bg-2.png')] bg-cover bg-center shadow-ct-stats
                transition-shadow duration-300 hover:shadow-ct-stats-hover">
              <div className="absolute inset-0 bg-gradient-to-tl from-black/100 to-transparent pointer-events-none"></div>
              <p className="relative text-right text-ct-primary">
                <span className="block text-4xl font-bold">13+</span>
                <span className="block text-sm">Workshops &amp; meetups</span>
              </p>
            </div>
            <div className="relative flex flex-col justify-end p-8 flex-1 bg-[url('/images/stats-bg-2.png')] bg-cover bg-center shadow-ct-stats
                transition-shadow duration-300 hover:shadow-ct-stats-hover">
              <div className="absolute inset-0 bg-gradient-to-tl from-black/100 to-transparent pointer-events-none"></div>
              <p className="relative text-right text-ct-primary">
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
