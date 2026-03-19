"use client";

import {
  ArrowUpRight,
  Award,
  Heart,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { TeamCard } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/lib/data/team";

const coreValues = [
  {
    title: "Inclusivity",
    description:
      "Every beginner and early-stage builder is welcomed and supported, regardless of background.",
    icon: Heart,
  },
  {
    title: "Collaboration",
    description:
      "Members learn, build, and solve problems together on meaningful projects.",
    icon: Users,
  },
  {
    title: "Accountability",
    description:
      "Contributions and outputs are tracked and recognized; effort alone is not enough.",
    icon: ShieldCheck,
  },
  {
    title: "Growth",
    description:
      "Continuous learning, skill development, and measurable progress are expected and rewarded.",
    icon: TrendingUp,
  },
  {
    title: "Excellence",
    description:
      "Everything Codetopia Community produces - projects, events, mentorship is held to a high standard.",
    icon: Award,
  },
  {
    title: "Impact",
    description:
      "What we build must mean something beyond the community. Real projects. Real skills. Real careers.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="flex-1 flex flex-col items-start justify-center py-24 md:py-32 bg-black relative overflow-hidden">
        <Container className="flex flex-col items-start text-left px-4 md:px-16 lg:px-24 max-w-none font-sans relative z-10">
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-10 leading-none font-sans">
            ENGINEERING IMPACT <br /> THROUGH{" "}
            <span className="text-zinc-600">COLLABORATION</span>
          </h1>
          {/* Description */}
          <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl font-mono">
            Launched in 2020 as{" "}
            <a
              href="https://codetopia.org/"
              className="text-white hover:underline decoration-zinc-500"
            >
              Codetopia
            </a>
            &apos;s first initiative, we&apos;ve grown from a small group into a
            thriving ecosystem of tech professionals and enthusiasts united by a
            commitment to{" "}
            <span className="text-white">collaborative building.</span>
          </p>
        </Container>
      </div>

      {/* Vision & Mission: Typographic Statement */}
      <section className="w-full py-32 md:py-48 bg-white text-black z-20 border-t border-zinc-200 relative overflow-hidden">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <div className="flex flex-col gap-12">
            <h2 className="text-zinc-400 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Our Vision
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-black font-sans">
              To be the leading{" "}
              <span className="text-zinc-400">builder-focused</span> tech
              community in Ghana and across Africa, where anyone can grow their
              skills, contribute meaningfully, and shape the future of
              technology.
            </p>
            <div className="mt-12 max-w-2xl">
              <h3 className="text-xl font-bold uppercase mb-4">Mission</h3>
              <p className="text-zinc-600 font-mono text-lg md:text-xl leading-relaxed">
                To empower learners and creators through mentorship,
                collaboration, and hands-on experiences, turning potential into
                practical impact across the tech ecosystem.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values: Architectural List */}
      <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900 overflow-hidden">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 font-sans">
              THE MANIFESTO
            </h2>
          </div>

          <div className="flex flex-col border-t border-zinc-800">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-16 border-b border-zinc-800 transition-colors hover:bg-zinc-900/50"
              >
                {/* Massive Architectural Number */}
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-white/[0.03] pointer-events-none select-none">
                  0{index + 1}
                </span>

                <div className="relative z-10 flex items-center gap-6 mb-4 md:mb-0">
                  <value.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter font-sans">
                    {value.title}
                  </h3>
                </div>
                <p className="relative z-10 text-zinc-400 font-mono text-base md:text-lg max-w-xl md:text-right">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership Brief Section */}
      <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="flex-1 px-2">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                LEADERSHIP <br />
                <span className="text-zinc-700">BRIEF</span>
              </h2>
              <div className="max-w-2xl">
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  A Codetopia initiative. The Codetopia Community is led by a
                  decentralized collective of engineers and community leaders
                  defining the future of technical mastery.
                </p>
              </div>
            </div>

            <Link
              href="/team"
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-mono text-[9px] uppercase tracking-[0.3em] font-black hover:bg-zinc-200 transition-colors"
            >
              VIEW ALL TEAMS
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
            {teamMembers
              .filter((m) => m.tier === "CORE")
              .slice(0, 4)
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
