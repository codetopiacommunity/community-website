import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import codetopiaLogoTw from "@/assets/images/logos/Codetopia-Logo-TW.png";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 relative overflow-hidden bg-[#09090b]">
      {/* Watermark Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
        <Image
          src={codetopiaLogoTw}
          alt="Codetopia Watermark"
          className="w-[150%] max-w-none md:w-full object-cover"
        />
      </div>

      <Container className="flex flex-col items-center justify-center text-center px-4 max-w-2xl font-sans relative z-10">
        <h1 className="text-8xl md:text-[120px] font-black text-white tracking-tighter uppercase leading-none mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-200 mb-6 uppercase tracking-wider">
          Page Not Found
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl font-mono mb-12">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/">
          <CtaButton
            className="bg-white text-black hover:bg-zinc-200 px-8"
            offsetClassName="bg-zinc-700"
          >
            <span className="flex items-center">
              RETURN HOME
              <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
            </span>
          </CtaButton>
        </Link>
      </Container>
    </div>
  );
}
