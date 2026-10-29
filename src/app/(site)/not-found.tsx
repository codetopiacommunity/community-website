import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen flex flex-col">
      <section className="relative flex-1 flex flex-col justify-center overflow-hidden">
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Container className="relative z-10 px-4 py-32 md:py-48">
          <h1 className="uppercase tracking-tighter text-[28vw] md:text-[20vw] font-bold leading-tight font-sans text-white mb-2">
            404
          </h1>

          <div className="pt-10 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="uppercase tracking-tighter text-white font-bold text-2xl md:text-3xl font-sans mb-3">
                Page not found
              </p>
              <p className="text-zinc-400 font-mono text-base leading-relaxed max-w-md">
                The page you are looking for does not exist or has been moved.
              </p>
            </div>

            <Link
              href="/"
              className="uppercase tracking-tight group inline-flex items-center gap-3 bg-white text-black font-bold text-sm px-8 py-4 hover:bg-zinc-200 transition-colors font-sans self-start shrink-0"
            >
              Return home
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
