import Image from "next/image";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 bg-[#09090b]">
      <Container className="flex flex-col items-center text-center px-4 max-w-4xl font-sans">
        {/* Community Logo */}
        <div className="mb-12">
          <Image
            src={logo}
            alt="Codetopia Community"
            width={400}
            height={240}
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-10 leading-none">
          ABOUT CODETOPIA COMMUNITY
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl">
          Launched in 2020 as <a href="https://codetopia.org/">Codetopia</a>
          's first initiative, Codetopia Community has grown from a small group
          of passionate developers into a thriving ecosystem of tech
          professionals, students, and enthusiasts, united by a commitment to
          collaborative learning and innovation.
        </p>
      </Container>
    </div>
  );
}
