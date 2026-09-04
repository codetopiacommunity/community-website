import {
  BadgeCheck,
  Compass,
  GitPullRequest,
  Layers,
  Shapes,
  Signal,
  Ticket,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const reasons = [
  {
    title: "A Record, Not Just Access",
    description:
      "Badges, certificates and recognitions earned through reviewed work, written by the people you worked with.",
    icon: BadgeCheck,
  },
  {
    title: "Every Discipline",
    description:
      "Engineering, design, product, data, machine learning, security, cloud, mobile, QA, technical writing, hardware and robotics. Twelve disciplines, one community.",
    icon: Shapes,
  },
  {
    title: "Every Level, Honestly",
    description:
      "Complete beginners sit alongside senior practitioners. Say where you actually are and get matched accordingly. Nobody has to pretend.",
    icon: Signal,
  },
  {
    title: "Mentorship, Assigned",
    description:
      "Not join and hope. One-on-one guidance from people who have already done the thing you are trying to do.",
    icon: Compass,
  },
  {
    title: "Members Run It",
    description:
      "The projects, the events, the reviews, the writing. Most of it is open to any member who wants to pick it up.",
    icon: Users,
  },
];

const everyday = [
  {
    title: "Collaborative Projects",
    description:
      "Real-world work on community-led systems and open-source contributions.",
    icon: GitPullRequest,
  },
  {
    title: "Technical Training",
    description:
      "Structured learning paths and workshops, from fundamentals to advanced architecture.",
    icon: Layers,
  },
  {
    title: "Community Events",
    description:
      "Meetups, technical sessions, and hackathons to connect and build together.",
    icon: Ticket,
  },
];

export function WhyJoinUs() {
  return (
    <section className="relative w-full py-32 bg-black text-white border-t border-zinc-900 overflow-hidden">
      <Container className="relative z-10 w-full px-4">
        <div className="mb-16 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
            Why <span className="text-zinc-400">Join Us</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            There are a lot of communities out there. Here is what makes this
            one different.
          </p>
        </div>

        {/* The claim */}
        <div className="mb-24 flex flex-col gap-8 max-w-4xl">
          <p className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight font-sans">
            Most communities give you access.
            <br />
            <span className="text-zinc-400">
              Codetopia Community gives you a record.
            </span>
          </p>

          <div className="flex flex-col gap-6 font-mono text-zinc-400 text-base md:text-lg max-w-3xl">
            <p>
              Anyone can send you an invite link. What happens after is usually
              up to you, and six months later you have nothing to show for the
              time you put in.
            </p>
            <p>
              Here, the work gets written down. You join a team, you do real
              work, practitioners review it, and what you did becomes part of
              who you are in the community. A record you never had to write
              about yourself, because the people you worked with wrote it for
              you.
            </p>
            <p>
              And it counts the contributions that normally leave no trace: the
              review you gave a teammate, the session you ran, the person you
              unblocked, the thing you designed, wrote, tested, planned or
              shipped.
            </p>
          </div>
        </div>
      </Container>

      {/* Reasons */}
      <div className="flex flex-col border-t border-zinc-900">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="group relative border-b border-zinc-900 transition-all duration-300 hover:bg-zinc-900/40 cursor-default"
          >
            <Container className="relative z-10 w-full px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 lg:py-16 gap-6 lg:gap-0">
              <div className="relative z-10 flex items-center gap-5 lg:gap-8 flex-1">
                <reason.icon
                  className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-400 shrink-0 transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter font-sans transition-colors duration-300">
                  {reason.title}
                </h3>
              </div>

              <div className="relative z-10 flex items-center gap-8 lg:max-w-xl lg:justify-end">
                <p className="text-zinc-400 font-mono text-sm lg:text-base lg:text-right transition-colors duration-300 group-hover:text-white">
                  {reason.description}
                </p>
              </div>
            </Container>
          </div>
        ))}
      </div>

      {/* Everyday things */}
      <Container className="relative z-10 w-full px-4 pt-24">
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-10">
          And the everyday things
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {everyday.map((item) => (
            <div key={item.title} className="flex flex-col gap-4">
              <item.icon
                className="w-6 h-6 text-zinc-400 shrink-0"
                strokeWidth={1.5}
              />
              <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter font-sans">
                {item.title}
              </h3>
              <p className="text-zinc-400 font-mono text-sm lg:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
