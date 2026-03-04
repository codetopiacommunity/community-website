"use client";

import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export function Newsletter() {
  return (
    <section className="w-full py-10 md:py-20 bg-[#e4e4e7] flex justify-center items-center">
      <Container className="px-4 w-full flex justify-center">
        <div className="w-full max-w-5xl bg-[#18181b] p-8 py-12 md:p-16 lg:p-24 flex flex-col items-center text-center shadow-2xl">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4 md:mb-6 font-sans">
            Codetopia Newsletters
          </h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-mono max-w-2xl mb-8 md:mb-12 px-2">
            Subscribe to our newsletter to get updates on upcoming events, new
            articles, and community announcements delivered straight to your
            inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-xl gap-4 sm:gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 w-full bg-zinc-900 text-white px-6 py-5 h-14 sm:h-16 outline-none font-mono text-sm border border-zinc-700/50 rounded-none placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
              required
            />
            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4">
              <CtaButton
                type="submit"
                className="bg-[#18181b] text-white border-white hover:bg-zinc-900"
                offsetClassName="border-white"
              >
                Subscribe
              </CtaButton>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
