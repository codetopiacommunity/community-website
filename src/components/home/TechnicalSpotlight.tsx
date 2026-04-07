import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/layout/Container";
import type { Spotlight } from "@/types";

export function TechnicalSpotlight({ spotlight }: { spotlight: Spotlight | null }) {
  if (!spotlight) return null;

  return (
    <section className="w-full bg-background overflow-hidden border-t border-border px-0 py-24 md:py-32">
      <Container className="max-w-none px-0">
        <div className="w-full mb-24 text-left px-6 lg:px-12 max-w-screen-2xl mx-auto">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-foreground uppercase tracking-tighter mb-6 leading-none font-sans">
            SPOTLIGHT
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-mono max-w-2xl">
            A high-honor record of technical mastery and architectural impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[90vh] lg:min-h-[850px] border-y border-border bg-muted overflow-hidden group">
          {/* Left: Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden bg-black border-b lg:border-b-0 lg:border-r border-border">
            <Image
              src={spotlight.imageUrl}
              alt={spotlight.name}
              fill
              unoptimized
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-background space-y-12">
            <div className="space-y-8 lg:transform lg:-translate-x-1 lg:group-hover:translate-x-0 lg:transition-transform lg:duration-700">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] xl:text-[9.5rem] font-black uppercase tracking-tighter text-foreground leading-[0.75] font-sans">
                  {spotlight.name.split(" ").map((part, i, arr) => (
                    <React.Fragment key={`${spotlight.id}-${part}-${i}`}>
                      {part}
                      {i === 0 ? <br /> : i < arr.length - 1 ? " " : ""}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="text-muted-foreground font-mono text-xs md:text-sm lg:text-base uppercase tracking-[0.4em] font-black">
                  {spotlight.role}
                </p>
              </div>

              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl lg:leading-relaxed font-mono max-w-2xl">
                {spotlight.contribution}
              </p>
            </div>

            {spotlight.links.length > 0 && (
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <p className="text-muted-foreground font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black shrink-0">
                  Links
                </p>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {spotlight.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-foreground font-mono text-xs md:text-sm lg:text-base uppercase tracking-widest hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
