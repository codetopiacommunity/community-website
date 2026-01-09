import { spaceGrotesk , archivo} from "@/fonts/fonts";

export default function Newsletter() {
    return (
        <section className="py-12 bg-foreground">
            <div className={` lg:max-w-[80%]  mx-auto px-4 ${spaceGrotesk.className}`}>
                <div className="bg-background text-ct-primary  p-10 text-center shadow-lg">
                    <h2 className={`text-3xl font-bold uppercase mb-6 `}>
                        Codetopia Newsletters
                    </h2>
                    <p className={`text-lg mb-8 max-w-lg mx-auto text-ct-secondary ${archivo.className}`}>
                        Subscribe to our newsletter to get updates on upcoming events,
                        new articles, and community announcements delivered straight
                        to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-2 text-background bg-ct-primary border border-ct-secondary focus:outline-none focus:border-ct-disabled"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-2 text-ct-primary bg-background font-semibold  border border-ct-secondary shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] "
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}