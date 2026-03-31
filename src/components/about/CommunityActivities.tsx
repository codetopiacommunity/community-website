import { Activity, BookOpen, Code2, Presentation, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";

const activities = [
  {
    title: "Build Together Sessions",
    description:
      "Dedicated, silent or collaborative co-working hours. A focused arena where momentum is shared and early-stage builders unblock each other in real-time.",
    icon: Code2,
    colSpan: "lg:col-span-2",
  },
  {
    title: "Open Source Sprints",
    description:
      "Weekend hack days focused entirely on contributing to existing repo infrastructure or building tooling for the local African tech ecosystem.",
    icon: Activity,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Engineering Syncs",
    description:
      "Member-led tech talks breaking down monumental engineering challenges or doing deep technical dives into systems architecture and modern tooling.",
    icon: BookOpen,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Project Showcases",
    description:
      "A rigorous environment to demo completed applications. Members give and receive strict architectural feedback on code quality, scalability, and UX.",
    icon: Presentation,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Mentorship Hours",
    description:
      "Direct lines to core engineers and community leaders. Ad-hoc sessions designed to eliminate technical specific roadblocks for newer developers.",
    icon: Users,
    colSpan: "lg:col-span-1",
  },
];

export function CommunityActivities() {
  return (
    <section className="w-full py-32 bg-white text-black z-20 border-t border-zinc-200">
      <Container className="w-full px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="flex-1">
            <h2 className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Our Operations
            </h2>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
              COMMUNITY <br />
              <span className="text-zinc-400">ACTIVITIES</span>
            </h3>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-600 text-lg font-mono leading-relaxed">
              We don&apos;t just talk about tech. We engage in hands-on
              building, rigorous peer reviews, and consistent execution across
              multiple formats.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className={`group relative bg-white p-10 lg:p-14 flex flex-col justify-between min-h-[320px] transition-colors hover:bg-zinc-50 ${activity.colSpan}`}
            >
              {/* Massive subtle background number */}
              <span className="absolute right-6 top-6 text-[8rem] font-black text-black/[0.02] pointer-events-none select-none leading-none group-hover:text-black/[0.04] transition-colors">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="relative z-10 mb-12">
                <div className="w-12 h-12 flex items-center justify-center border border-zinc-200 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <activity.icon className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 mt-auto">
                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-sans mb-4">
                  {activity.title}
                </h4>
                <p className="text-zinc-600 font-mono text-sm leading-relaxed max-w-md">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
