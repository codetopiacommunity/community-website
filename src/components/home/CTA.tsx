import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export function CTA() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#09090b] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Radial fade background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)",
        }}
      />

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
            className="border-zinc-600 text-white hover:bg-zinc-900 border-[1px] sm:border-2 !bg-[#09090b] border-solid !px-10"
            offsetClassName="border-zinc-600 hidden sm:block"
          >
            LEARN MORE
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
