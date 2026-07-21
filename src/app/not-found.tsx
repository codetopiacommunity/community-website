import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <div className="flex-1 bg-black text-white flex flex-col">
          <section className="relative flex-1 flex flex-col justify-center overflow-hidden border-b border-zinc-900">
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
              <h1 className="text-[28vw] md:text-[20vw] font-black uppercase tracking-tighter leading-none font-sans text-white mb-2">
                4<span className="text-zinc-800">0</span>4
              </h1>

              <div className="border-t border-zinc-900 pt-10 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <p className="text-white font-black uppercase tracking-tighter text-2xl md:text-3xl font-sans mb-3">
                    Page Not Found
                  </p>
                  <p className="text-zinc-400 font-mono text-base leading-relaxed max-w-md">
                    The page you are looking for does not exist or has been
                    moved.
                  </p>
                </div>

                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 bg-white text-black font-black uppercase tracking-tight text-sm px-8 py-4 hover:bg-zinc-200 transition-colors font-sans self-start shrink-0"
                >
                  Return Home
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Container>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
