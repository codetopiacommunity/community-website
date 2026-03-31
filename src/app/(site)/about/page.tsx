"use client";

import {
  ArrowUpRight,
  Award,
  Heart,
  Loader2,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import { TeamCard } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";

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

interface TeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  statement: string;
  expertise: string[];
  tier: string;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

export default function AboutPage() {
  const [coreMembers, setCoreMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoreMembers() {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) {
          const data = await res.json();
          setCoreMembers(
            data.filter((m: TeamMember) => m.tier === "CORE").slice(0, 3),
          );
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
      setLoading(false);
    }
    fetchCoreMembers();
  }, []);

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
        <Container className="w-full px-4 relative z-10">
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
        <Container className="w-full px-4 relative z-10">
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
        <Container className="w-full px-4 relative z-10">
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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
          ) : coreMembers.length === 0 ? (
            <div className="w-full flex flex-col md:flex-row items-stretch border border-zinc-900 bg-zinc-950 min-h-[400px]">
              <div className="flex-1 flex flex-col justify-center p-10 md:p-16 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-black text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-8">
                    <span className="w-2 h-2 bg-zinc-600 animate-pulse rounded-full"></span>
                    COMMUNITY LEADERS
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none font-sans">
                    STAY <span className="text-zinc-600">TUNED</span>
                  </h3>

                  <p className="text-zinc-500 font-mono text-base max-w-lg leading-relaxed">
                    We're currently assembling our community leadership network.
                    Check back soon for updates to the directory.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex w-1/4 min-w-[200px] border-l border-zinc-900 bg-black flex-col justify-between p-8 relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #27272a 0, #27272a 1px, transparent 0, transparent 20px)",
                  }}
                ></div>

                <div className="self-end p-5 border border-zinc-800 bg-zinc-950 text-zinc-500 transition-all duration-500 group-hover:text-zinc-300 relative z-10">
                  <Users2 className="w-8 h-8" strokeWidth={1} />
                </div>

                <div
                  className="font-mono text-[9px] text-zinc-700 uppercase tracking-[0.3em] rotate-180 relative z-10"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {"CODETOPIA // LEADERSHIP DIRECTORY"}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
              {coreMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
