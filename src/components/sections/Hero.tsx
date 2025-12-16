"use client";

import { useEffect, useState } from "react";
import { spaceGrotesk } from "../../fonts/fonts";
import CtaButton from "../shared/CtaButton";

type HeroProps = {
  backgroundImage?: string;
};

export default function Hero({ backgroundImage }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <section
      style={{
        backgroundImage: !isMobile
          ? `url(${backgroundImage || "/images/hero-background.jpg"})`
          : "none", // remove image on mobile
      }}
      className={`md:min-h-screen bg-center bg-cover md:flex flex-col items-center justify-center relative  text-center ${spaceGrotesk.className}`}
    >
      {!isMobile && <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>}
      <div className="lg:max-w-9/10 z-10">
        <h1 className="text-4xl font-bold max-w-md mx-auto pt-20 md:max-w-7xl md:text-7xl text-white">
          Building A Community for the future
        </h1>
        <p className="mt-5 max-w-3xl mx-auto text-white text-2xl">
          A thriving community where tech enthusiasts come together to learn,
          share and grow
        </p>
        <div className="flex items-center justify-center gap-8 flex-col md:flex-row">
            <CtaButton />
            <CtaButton />
        </div>
      </div>
    </section>
  );
}
