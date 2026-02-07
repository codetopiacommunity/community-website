import { spaceGrotesk, archivo } from "@/fonts/fonts";

export default function Newsletter() {
    return (
        <section className="py-12 bg-ct-surface">
            <div className={` lg:max-w-[80%]  mx-auto px-4 ${spaceGrotesk.className}`}>
                <div className="bg-[#1A1A1A] text-ct-primary p-12 text-center border border-white/10">
                    <h2 className={`text-3xl font-bold uppercase mb-6 tracking-wide`}>
                        Codetopia Newsletters
                    </h2>
                    <p className={`text-sm mb-10 max-w-xl mx-auto text-ct-secondary/80 leading-relaxed ${archivo.className}`}>
                        Subscribe to our newsletter to get updates on upcoming events,
                        new articles, and community announcements delivered straight
                        to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto items-center">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full sm:flex-1 px-4 py-2.5 text-ct-inverse bg-ct-primary border-none focus:outline-none placeholder:text-ct-inverse/50"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1A1A] text-white font-bold text-[10px] uppercase tracking-widest border border-white shadow-[4px_4px_0_0_#A8A8A8] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ml-0 sm:ml-4 mt-4 sm:mt-0"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}