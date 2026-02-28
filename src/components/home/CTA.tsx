import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export function CTA() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#09090b] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background glow or subtle gradient if needed. The design implies a slight lighter center */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#09090b] to-[#09090b] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center max-w-4xl px-4 font-sans">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
          Ready to join our community
        </h2>
        <p className="text-zinc-300 text-base md:text-xl lg:text-2xl mb-12 max-w-3xl leading-relaxed">
          Whether you're a beginner or an experienced developer, there's a place
          for you in Codetopia Community. Start your journey today!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 w-full sm:w-auto">
          <CtaButton
            className="bg-white text-black hover:bg-zinc-200"
            offsetClassName="bg-zinc-700 hidden sm:block"
          >
            JOIN OUR COMMUNITY
          </CtaButton>
          <CtaButton
            className="border-zinc-600 text-white hover:bg-zinc-900 border-[1px] sm:border-2 !bg-black border-solid !px-10"
            offsetClassName="border-zinc-600 hidden sm:block"
          >
            LEARN MORE
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
