import {spaceGrotesk, archivo} from "@/fonts/fonts";

export default function JoinCommunity() {
    return (
        <section className={`py-20 bg-[#000000] text-white relative overflow-hidden ${spaceGrotesk.className}`}>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/8 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-8 drop-shadow-2xl">
                    Ready to Join Our Community
                </h2>
                <p className={`text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg ${archivo.className}`}>
                    Whether you're a beginner or an experienced developer, there's a place for you
                    in Codetopia Community. Start your journey today!
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">

                    <button
                        type="submit"
                        className="px-8 py-2 bg-white text-[#1F1F1F] font-semibold  border border-gray-300 shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] "
                    >
                        JOIN OUR COMMUNITY
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-2 text-white bg-[#1F1F1F] font-semibold  border border-gray-300 shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] "
                    >
                        LEARN MORE
                    </button>
                </div>
            </div>
        </section>
    );
}