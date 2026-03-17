"use client";

import {
  Award,
  Github,
  Heart,
  Linkedin,
  ShieldCheck,
  Target,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logos/codetopia-community.png";
import profileSample from "@/assets/images/profile/profile-sample.jpg";
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

const teamMembers = [
  {
    name: "Seth Mensah",
    role: "Founder & Technical Lead",
    image: profileSample,
    socials: {
      github: "https://github.com/seth-mensah",
      linkedin: "https://linkedin.com/in/seth-mensah",
      twitter: "https://twitter.com/seth_mensah_",
    },
  },
  {
    name: "Tech Nomad",
    role: "Community Manager",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Code Architect",
    role: "Operations Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Pixel Wizard",
    role: "Design Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Data Scout",
    role: "Analytics Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Cloud Pilot",
    role: "DevOps Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Security Ghost",
    role: "Security Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Logic Engine",
    role: "Backend Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Buffer King",
    role: "QA Lead",
    image: profileSample,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function AboutPage() {
  const TeamCard = ({ member }: { member: (typeof teamMembers)[0] }) => (
    <div className="relative group text-left w-full">
      {/* Hollow offset border shadow */}
      <div className="absolute inset-0 border-2 border-zinc-900 translate-x-[6px] translate-y-[6px] z-0 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px]" />

      {/* Top Interactive Card */}
      <div className="relative z-10 flex flex-col items-start justify-end p-6 bg-[#09090b] border-2 border-zinc-900 transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] aspect-[4/5] overflow-hidden">
        {/* Background Member Image */}
        <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-90">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          {/* Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Member Content */}
        <div className="relative z-10 w-full text-white">
          <h3 className="text-2xl md:text-3xl font-black font-sans tracking-tight uppercase leading-none mb-1">
            {member.name}
          </h3>
          <p className="text-white/70 font-mono text-xs uppercase tracking-wider mb-4">
            {member.role}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 bg-[#09090b] relative overflow-hidden">
        {/* Background Typographic Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <h2 className="text-[20vw] font-black uppercase tracking-tighter text-white">
            BUILDERS
          </h2>
        </div>

        <Container className="flex flex-col items-center text-center px-4 max-w-4xl font-sans relative z-10">
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
            <div className="mt-12 max-w-2xl border-l-4 border-black pl-8">
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
      <section className="w-full py-32 bg-[#09090b] text-white z-20 border-t border-zinc-900 overflow-hidden">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 font-sans">
              THE MANIFESTO
            </h2>
            <div className="h-2 w-32 bg-white" />
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

      {/* Teams Section: Full Impact Grid */}
      <section className="w-full py-32 bg-white text-black z-20 border-t border-zinc-200">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none font-sans">
            THE <span className="text-zinc-300">CORE</span>
          </h2>
          <p className="text-zinc-600 text-lg md:text-xl font-mono max-w-2xl border-l-4 border-black pl-6">
            The builders behind the builders. A dedicated leadership team
            ensuring that every community project and mentorship session meets
            the Codetopia standard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full mt-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
