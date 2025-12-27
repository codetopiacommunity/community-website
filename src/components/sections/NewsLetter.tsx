import { spaceGrotesk , archivo} from "@/fonts/fonts";

export default function Newsletter() {
    return (
        <section className="py-12 bg-[#E9E9E9]">
            <div className={` lg:max-w-[80%]  mx-auto px-4 ${spaceGrotesk.className}`}>
                <div className="bg-[#1F1F1F] text-white  p-10 text-center shadow-lg">
                    <h2 className={`text-3xl font-bold uppercase mb-6 `}>
                        Codetopia Newsletters
                    </h2>
                    <p className={`text-lg mb-8 max-w-lg mx-auto text-gray-300 ${archivo.className}`}>
                        Subscribe to our newsletter to get updates on upcoming events,
                        new articles, and community announcements delivered straight
                        to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-2 text-[#1F1F1F] bg-white border border-gray-300 focus:outline-none focus:border-gray-500"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-2 text-white bg-[#1F1F1F] font-semibold  border border-gray-300 shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] "
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}