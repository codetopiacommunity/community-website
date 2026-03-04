import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export function CTA() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#09090b] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Brutalist Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                               linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
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
            offsetClassName="border-white"
          >
            JOIN OUR COMMUNITY
          </CtaButton>
          <CtaButton
            className="bg-[#09090b] text-white border border-white hover:bg-zinc-900"
            offsetClassName="border-white"
          >
            LEARN MORE
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
