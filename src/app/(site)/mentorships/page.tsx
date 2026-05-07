import { Container } from "@/components/layout/Container";
import { MentorshipsGridIsland } from "./MentorshipsGridIsland";

export const dynamic = "force-dynamic";

export default function MentorshipsPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full pt-32 pb-16 overflow-hidden bg-black border-b border-zinc-900">
        <Container className="relative z-10 px-4 font-sans">
          <p className="text-xs font-inter text-zinc-500 uppercase tracking-widest mb-4">
            Community Programs
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] max-w-3xl font-space-grotesk">
            Mentorships
          </h1>
          <p className="text-zinc-400 text-base font-inter leading-relaxed max-w-xl mt-6">
            Learn from experienced community members and grow your skills
            through guided mentorship sessions.
          </p>
        </Container>
      </div>

      {/* Mentorships Grid — Client Island */}
      <MentorshipsGridIsland />
    </div>
  );
}
