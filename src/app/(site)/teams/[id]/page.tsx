import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { TeamCard } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/lib/data/team";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TeamDirectoryPage({ params }: Props) {
  const { id } = await params;
  const tier = id?.toUpperCase() as "CORE" | "VOLUNTEER" | "AMBASSADOR";

  const filteredMembers = teamMembers.filter((m) => m.tier === tier);

  if (!filteredMembers.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-black py-48">
        <h1 className="text-white font-mono text-xl animate-pulse">
          Team not found
        </h1>
        <Link
          href="/about"
          className="mt-8 text-zinc-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" /> RETURN TO ABOUT
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black py-24 md:py-32">
      <Container>
        <div className="mb-24">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs transition-colors mb-12 group"
          >
            <FaArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to About
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight font-sans mb-8">
            {tier} DIVISION
          </h1>
          <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs">
            <span className="w-12 h-[1px] bg-zinc-800" />
            TOTAL MEMBERS: {filteredMembers.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </div>
  );
}
