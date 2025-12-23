import { spaceGrotesk } from "@/fonts/fonts"

export default function GrowingCommunity() {
    return (
        <section
              className={`relative bg-white ${spaceGrotesk.className} p-3 overflow-hidden`}
            >
              {/* Section Content */}
              <div className="relative z-10 lg:max-w-[80%] mx-auto py-20">
                <h2 className="text-center mb-10 uppercase">
                  <span className="inline-block text-2xl font-medium text-black border-b-2 border-black pb-2">
                  Our Growing Community
                  </span>
                </h2>
                <p className="text-center">A thriving tech community where developer, engineers, designers, and tech enthusiasts come together to learn, shrae, and grow</p>
        
                <div className="">
                     
                </div>
              </div>
            </section>
    )
}