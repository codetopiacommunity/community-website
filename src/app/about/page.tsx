import {
  Award,
  Eye,
  Heart,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logos/codetopia-community.png";
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

export default function AboutPage() {
  return (
    <>
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
            Launched in 2020 as{" "}
            <a
              href="https://codetopia.org/"
              className="text-white hover:underline"
            >
              Codetopia
            </a>
            's first initiative, Codetopia Community has grown from a small
            group of passionate developers into a thriving ecosystem of tech
            professionals, students, and enthusiasts, united by a commitment to
            collaborative learning and innovation.
          </p>
        </Container>
      </div>

      {/* Mission & Vision Section */}
      <section className="w-full py-20 md:py-32 bg-white flex flex-col items-center justify-center relative overflow-hidden text-black z-20 border-t border-zinc-200">
        <Container className="w-full px-4 max-w-7xl relative z-10 flex flex-col items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center flex-1 text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 font-sans text-black">
              OUR PURPOSE
            </h2>
            <p className="text-zinc-600 text-base md:text-lg max-w-2xl font-mono">
              Turning potential into practical impact through structured
              collaboration and hands-on building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
            {/* Vision Card */}
            <div className="relative group text-left w-full h-full">
              {/* Hollow offset border shadow */}
              <div className="absolute inset-0 border-2 border-zinc-900 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Top Interactive Card */}
              <div className="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-12 bg-[#09090b] border-2 border-white transition-all duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px] overflow-hidden">
                {/* Abstract Background Icon */}
                <Eye
                  className="absolute -bottom-16 -right-16 w-64 h-64 text-white opacity-[0.08]"
                  strokeWidth={1}
                />

                <div className="flex items-center gap-4 mb-6 text-white relative z-20">
                  <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tighter uppercase">
                    Vision
                  </h2>
                </div>
                <p className="text-zinc-400 font-mono text-base md:text-lg leading-relaxed relative z-20">
                  To be the leading builder-focused tech community in Ghana and
                  across Africa, where anyone can grow their skills, contribute
                  meaningfully, and shape the future of technology.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative group text-left w-full h-full">
              {/* Hollow offset border shadow */}
              <div className="absolute inset-0 border-2 border-zinc-900 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Top Interactive Card */}
              <div className="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-12 bg-[#09090b] border-2 border-white transition-all duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px] overflow-hidden">
                {/* Abstract Background Icon */}
                <Target
                  className="absolute -bottom-16 -right-16 w-64 h-64 text-white opacity-[0.08]"
                  strokeWidth={1}
                />

                <div className="flex items-center gap-4 mb-6 text-white relative z-20">
                  <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tighter uppercase">
                    Mission
                  </h2>
                </div>
                <p className="text-zinc-400 font-mono text-base md:text-lg leading-relaxed relative z-20">
                  To empower learners and creators through mentorship,
                  collaboration, and hands-on experiences, turning potential
                  into practical impact across the tech ecosystem.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="w-full py-20 md:py-32 bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden text-white z-20 border-t border-zinc-900">
        <Container className="w-full px-4 max-w-7xl relative z-10 flex flex-col items-center">
          {/* Section Header */}
          <div className="flex flex-col items-center flex-1 text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 font-sans text-white">
              CORE VALUES
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-mono">
              The principles that define how we build, learn, and grow as a
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="relative group text-left w-full"
              >
                {/* Hollow offset border shadow */}
                <div className="absolute inset-0 border-2 border-white translate-x-[6px] translate-y-[6px] z-0 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px]" />

                {/* Top Interactive Card */}
                <div className="relative z-10 flex flex-col items-start justify-start p-8 bg-white border-2 border-zinc-900 transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <value.icon
                      className="w-6 h-6 text-zinc-900"
                      strokeWidth={2.5}
                    />
                    <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight text-zinc-900 uppercase">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-zinc-600 font-mono text-sm md:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
