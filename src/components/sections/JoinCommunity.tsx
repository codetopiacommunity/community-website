import { spaceGrotesk, archivo } from "@/fonts/fonts";

export default function JoinCommunity() {
    return (
        <section className={`py-20 bg-[#0A0A0A] text-ct-primary relative overflow-hidden ${spaceGrotesk.className}`}>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ct-primary/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 bg-ct-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-8">
                    Ready to Join Our Community
                </h2>
                <p className={`text-lg text-ct-secondary/80 max-w-2xl mx-auto leading-relaxed ${archivo.className}`}>
                    Whether you're a beginner or an experienced developer, there's a place for you
                    in Codetopia Community. Start your journey today!
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">

                    <button
                        className="px-8 py-3 bg-white text-black font-bold text-[11px] uppercase tracking-widest border-none shadow-[6px_6px_0_0_#A8A8A8] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                    >
                        JOIN OUR COMMUNITY
                    </button>

                    <button
                        className="px-8 py-3 bg-transparent text-white font-bold text-[11px] uppercase tracking-widest border border-white shadow-[6px_6px_0_0_#474747] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                    >
                        LEARN MORE
                    </button>
                </div>
            </div>
        </section>
    );
}