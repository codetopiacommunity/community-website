import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <CTA />
    </div>
  );
}
