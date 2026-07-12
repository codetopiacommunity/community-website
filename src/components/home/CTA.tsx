import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";

export function CTA() {
  return (
    <section className="relative w-full pt-48 pb-0 bg-black overflow-hidden flex flex-col items-center justify-center text-center border-t border-zinc-900">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.025]">
        <Image
          src={logo}
          alt=""
          width={1200}
          height={720}
          className="w-3/4 h-auto object-contain grayscale brightness-0 invert"
        />
      </div>

      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center max-w-5xl px-4 font-sans">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
          Ready to <span className="text-zinc-400">Join?</span>
        </h2>
        <p className="text-zinc-500 text-lg md:text-xl mb-16 max-w-xl font-mono leading-relaxed mx-auto">
          The community is open. Come build with us.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6 w-full">
          <Link
            href="https://community.codetopia.org/howtos/Getting-Started/01-join-the-community"
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 hover:bg-zinc-100 border border-white"
          >
            Join the Community
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 bg-transparent text-zinc-500 hover:text-white px-10 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 border border-zinc-800 hover:border-zinc-600"
          >
            Read the Manifesto
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>

      {/* Big bottom wordmark */}
      <div className="relative z-10 w-full mt-16 select-none pointer-events-none overflow-hidden">
        <p className="font-sans font-black uppercase leading-none text-white/[0.1] whitespace-nowrap text-[14.5vw] tracking-tight w-full text-center">
          Community
        </p>
      </div>
    </section>
  );
}
