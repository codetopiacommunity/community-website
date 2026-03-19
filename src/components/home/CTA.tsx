import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export function CTA() {
  return (
    <section className="relative w-full py-48 bg-black overflow-hidden flex flex-col items-center justify-center text-center border-t border-zinc-900">
      {/* Background Logo Watermark - Centered Abstract */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <Image
          src={logo}
          alt=""
          width={1200}
          height={720}
          className="w-3/4 h-auto object-contain grayscale brightness-0 invert"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center max-w-6xl px-4 font-sans">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-10 uppercase tracking-tighter leading-none">
          READY TO <span className="text-zinc-600">JOIN?</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl mb-16 max-w-2xl font-sans leading-relaxed mx-auto">
          The barrier between consumer and creator is collaboration. Step across
          it today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full">
          <CtaButton
            asChild
            className="bg-white text-black hover:bg-zinc-200"
            offsetClassName="bg-zinc-600"
          >
            <a
              href="https://discord.gg/3nBFMfdNmB"
              target="_blank"
              rel="noreferrer"
            >
              JOIN THE COMMUNITY
            </a>
          </CtaButton>
          <CtaButton
            asChild
            className="bg-transparent border-2 border-white text-white hover:bg-white/5"
            offsetClassName="bg-zinc-800"
          >
            <Link href="/about">READ THE MANIFESTO</Link>
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
