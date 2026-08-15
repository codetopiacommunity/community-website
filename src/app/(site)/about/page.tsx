import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/../prisma/prisma";
import {
  type AboutMemberRecord,
  MemberRecord,
} from "@/components/about/MemberRecord";
import { type AboutStat, NumbersBand } from "@/components/about/NumbersBand";
import { type AboutFace, TeamFaces } from "@/components/about/TeamFaces";
import { Container } from "@/components/layout/Container";
import { fetchPortalRecognitions, getPortalProfileUrl } from "@/lib/portal";
import { getTeamData } from "@/lib/team";
import { coreValues, programmes, reviewRules, whatYouGet } from "./data";

export const metadata: Metadata = {
  title: "About Us — Codetopia Community",
  description:
    "Who we are, what we do, and what we expect from each other. Read this before you join.",
};

export const revalidate = 60;

/** How many volunteer portraits to show before deferring to /team. */
const FACE_LIMIT = 8;

/**
 * The figures band and the volunteer portraits render live counts. Any figure
 * that comes back zero is dropped rather than published, so a section that has
 * nothing to say stays quiet instead of announcing an empty number.
 *
 * Set to false to hide both — worth doing if a local database is thin enough
 * that the small figures are distracting while working on the page.
 */
const SHOW_LIVE_FIGURES = true;

/**
 * Everything on this page that isn't prose is counted or fetched live. Each
 * source is isolated so an unreachable portal or database costs us one
 * section rather than the whole route — the same trade the Wall of Impact
 * makes.
 */
async function loadAboutData(): Promise<{
  record: AboutMemberRecord | null;
  faces: AboutFace[];
  stats: AboutStat[];
}> {
  const [recognitionsResult, teamResult, eventCountResult, mentorshipResult] =
    await Promise.allSettled([
      fetchPortalRecognitions(undefined, 60),
      getTeamData(),
      prisma.event.count(),
      prisma.mentorship.count(),
    ]);

  const recognitions =
    recognitionsResult.status === "fulfilled" ? recognitionsResult.value : [];
  if (recognitionsResult.status === "rejected") {
    console.error("About: recognitions unavailable", recognitionsResult.reason);
  }

  const members =
    teamResult.status === "fulfilled" ? teamResult.value.members : [];
  if (teamResult.status === "rejected") {
    console.error("About: team data unavailable", teamResult.reason);
  }

  // Prefer a featured recognition, then simply the first published one.
  const featured =
    recognitions.find((r) => r.featuredRank !== null) ??
    recognitions[0] ??
    null;

  const record: AboutMemberRecord | null = featured
    ? {
        name: featured.fullName || featured.username,
        username: featured.username,
        roleLabel: featured.roleLabel,
        awardName: featured.awardName,
        period: featured.period,
        domain: featured.domain,
        impactSummary: featured.impactSummary,
        achievements: featured.achievements,
        imageUrl: featured.profilePictureUrl,
        profileUrl: getPortalProfileUrl(featured.username),
      }
    : null;

  const faces: AboutFace[] = SHOW_LIVE_FIGURES
    ? members.slice(0, FACE_LIMIT).map((member) => ({
        slug: member.slug,
        name: member.name,
        role: member.role,
        imageUrl: member.imageUrl,
      }))
    : [];

  // A stat is only shown when it was actually counted, and never when it is
  // zero -- an empty figure reads as neglect rather than as information.
  const candidates: Array<{
    value: number | null;
    label: string;
    one: string;
  }> = [
    {
      value: members.length || null,
      label: "Volunteers running it",
      one: "Volunteer running it",
    },
    {
      value:
        eventCountResult.status === "fulfilled" ? eventCountResult.value : null,
      label: "Events run",
      one: "Event run",
    },
    {
      value:
        mentorshipResult.status === "fulfilled" ? mentorshipResult.value : null,
      label: "Mentorship programmes",
      one: "Mentorship programme",
    },
    {
      value: recognitions.length || null,
      label: "People recognised",
      one: "Person recognised",
    },
  ];

  const stats: AboutStat[] = SHOW_LIVE_FIGURES
    ? candidates
        .filter((stat): stat is AboutStat => Boolean(stat.value))
        .map((stat) => ({
          value: stat.value,
          label: stat.label,
          one: stat.one,
        }))
    : [];

  return { record, faces, stats };
}

// The mechanics of signing up — the portal, Discord, the order to do them in
// — live in the how-tos. This page says how the community works; the guides
// say which buttons to press.
const JOIN_GUIDE = "/howtos/Getting-Started/01-join-the-community";
const CONTRIBUTE_GUIDE =
  "/howtos/Contributing-and-Volunteering/01-ways-to-contribute-and-volunteer";

/** Left-hand rail label shared by every section. */
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-row lg:flex-col items-baseline lg:items-start gap-4 lg:gap-5 lg:sticky lg:top-28">
      <span className="font-sans font-black text-3xl lg:text-5xl tracking-tighter leading-none text-zinc-500 tabular-nums">
        {num}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-300 leading-relaxed">
        {label}
      </span>
    </div>
  );
}

function Section({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-24 md:py-32 bg-black text-white border-t border-zinc-900">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-8 lg:gap-16 items-start">
          <SectionLabel num={num} label={label} />
          <div className="flex flex-col gap-8 md:gap-10 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] font-sans text-balance">
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm md:text-base leading-loose text-zinc-400 max-w-[68ch]">
      {children}
    </p>
  );
}

/** Inline emphasis inside prose — lifts a phrase to full white. */
function Lit({ children }: { children: React.ReactNode }) {
  return <span className="text-white">{children}</span>;
}

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  const className =
    "text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LeadLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 self-start font-sans font-black text-[11px] uppercase tracking-[0.22em] text-white border-b border-zinc-800 pb-2 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export default async function AboutPage() {
  const { record, faces, stats } = await loadAboutData();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full pt-32 pb-20 md:pt-44 md:pb-28 bg-black overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, #000 20%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 20%, transparent 95%)",
          }}
        />
        <Container className="relative z-10 px-4">
          <div className="flex flex-col items-start gap-8 md:gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
              About Us
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88] font-sans">
              We are Codetopia <br />
              <span className="text-zinc-400">Community.</span>
            </h1>
            <div className="flex flex-col gap-6">
              <Prose>
                We&rsquo;re an initiative of{" "}
                <InlineLink href="https://codetopia.org">Codetopia</InlineLink>{" "}
                — a community of builders, learners, and creators figuring it
                out together. We learn in the open, build real things, and help
                each other level up.{" "}
                <Lit>
                  Everyone here started as a beginner, and nobody is expected to
                  know everything.
                </Lit>
              </Prose>
              <Prose>
                If you&rsquo;re reading this before signing up: good. This page
                is who we are, what we do, and what we expect from each other.
                If it&rsquo;s not the kind of place you want to be part of,
                better to know now than later.
              </Prose>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 01 · Who we are ──────────────────────────────────────────── */}
      <Section num="01" label="Who We Are">
        <Heading>People who make things.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            Developers, designers, writers, organisers, and people who are none
            of those yet. Some of us have worked in tech for years. Plenty
            joined without knowing where to start.{" "}
            <Lit>Both are normal here.</Lit>
          </Prose>
          <Prose>
            We&rsquo;re based in Ghana and anyone anywhere can join. We&rsquo;re
            not a course and we&rsquo;re not a networking group. People come
            because they want to build something and would rather not do it on
            their own.
          </Prose>
        </div>
      </Section>

      {/* ── 02 · How we started ──────────────────────────────────────── */}
      <Section num="02" label="How We Started">
        <Heading>It started small.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            Codetopia started us in 2020 as its first initiative — a small group
            meeting online to show each other what they were building. It grew
            from there.
          </Prose>
          <Prose>
            What we are now is bigger and better organised, but it&rsquo;s the
            same thing at heart:{" "}
            <Lit>
              people who want to build something, doing it somewhere other
              people can see it and help.
            </Lit>
          </Prose>
        </div>
      </Section>

      {/* ── 03 · What we run ─────────────────────────────────────────── */}
      <Section num="03" label="What We Do">
        <Heading>What we run.</Heading>
        <Prose>Members run all of it. Most of it is open to any member.</Prose>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
          {programmes.map((programme) => (
            <div key={programme.tag} className="flex flex-col gap-2.5">
              <h3 className="text-lg font-black uppercase tracking-tighter font-sans text-white">
                {programme.tag}
              </h3>
              <p className="font-mono text-sm leading-loose text-zinc-400 max-w-[42ch]">
                {programme.description}
              </p>
            </div>
          ))}
        </div>

        <Prose>
          One of those projects is the website you&rsquo;re reading. Members
          built it, members write the articles on it, and the how-to library was
          started by our June&ndash;July 2026 intern cohort.{" "}
          <Lit>
            The guides that teach you to join were written by people who joined
            before you — eventually you write one for whoever comes next.
          </Lit>{" "}
          The code is public if you want to check:{" "}
          <InlineLink href="https://github.com/codetopiacommunity/community-website">
            github.com/codetopiacommunity
          </InlineLink>
          .
        </Prose>

        <LeadLink href="/events">See upcoming events</LeadLink>
      </Section>

      {/* ── 04 · How it works ────────────────────────────────────────── */}
      <Section num="04" label="How It Works">
        <Heading>We write down what people do.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            This is the part that&rsquo;s different from most communities. When
            you make something — code, a guide, a design, an event you ran,
            someone you mentored — another member reviews it before it counts.
            If it isn&rsquo;t ready, you&rsquo;re told what&rsquo;s missing and
            you can fix it.
          </Prose>
          <Prose>
            What gets approved goes on your record: what it was, when you did
            it, and a link to the work itself. Over time that becomes a public
            track record of what you&rsquo;ve actually done,{" "}
            <Lit>including the work GitHub never sees</Lit> — teaching,
            organising, running events, design.
          </Prose>
        </div>

        <div className="flex flex-col gap-4">
          {reviewRules.map((item) => (
            <p
              key={item.rule}
              className="font-mono text-sm leading-loose text-zinc-400 max-w-[60ch]"
            >
              <span className="text-white">{item.rule}</span>
              {item.detail ? ` ${item.detail}` : null}
            </p>
          ))}
          <p className="font-mono text-sm leading-loose text-zinc-400 max-w-[60ch]">
            <span className="text-white">
              Certificates we issue can be checked by anyone
            </span>{" "}
            at{" "}
            <InlineLink href="/verify">
              community.codetopia.org/verify
            </InlineLink>
            , without asking us.
          </p>
        </div>

        {record ? <MemberRecord record={record} /> : null}

        <LeadLink href="/wall-of-impact">See the Wall of Impact</LeadLink>
      </Section>

      {/* A break in the page's rhythm, and the only figures on it. */}
      <NumbersBand stats={stats} />

      {/* ── 05 · What you get out of it ──────────────────────────────── */}
      <Section num="05" label="What You Get Out Of It">
        <Heading>Experience, mentorship, and a record.</Heading>
        <Prose>
          Every role here is voluntary and unpaid, team leads included. Nobody
          is paid to be part of this. What you get instead is real work to do,
          people further along who&rsquo;ll help you do it, and a public track
          record of everything you&rsquo;ve contributed —{" "}
          <Lit>one you didn&rsquo;t have to write about yourself.</Lit>
        </Prose>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
          {whatYouGet.map((item) => (
            <div key={item.title} className="flex flex-col gap-2.5">
              <h3 className="text-lg font-black uppercase tracking-tighter font-sans text-white">
                {item.title}
              </h3>
              <p className="font-mono text-sm leading-loose text-zinc-400 max-w-[42ch]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 06 · What we expect ──────────────────────────────────────── */}
      <Section num="06" label="What We Expect">
        <Heading>What we expect from each other.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            Every member agrees to our{" "}
            <InlineLink href="/code-of-conduct">code of conduct</InlineLink>{" "}
            when they sign up, and is held to it from day one. It&rsquo;s short.
            Read it properly rather than ticking a box.
          </Prose>
          <Prose>
            Sign up with your real name and real details. Accounts using
            information that doesn&rsquo;t belong to the person will be removed.
          </Prose>
          <Prose>
            Beyond that, we expect you to take part — build something, help
            somebody, teach somebody, or show up and keep the lights on.{" "}
            <Lit>Contribution starts with being present.</Lit> If you&rsquo;re
            not sure where you fit yet, that&rsquo;s completely fine. Hang out,
            join conversations, come to events. It&rsquo;ll still be here when
            you&rsquo;re ready.
          </Prose>
        </div>
      </Section>

      {/* ── 07 · Values ──────────────────────────────────────────────── */}
      <Section num="07" label="Values">
        <Heading>What we care about.</Heading>

        <div className="flex flex-col gap-10 max-w-3xl">
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-2 sm:gap-8"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter font-sans text-white">
                {value.title}
              </h3>
              <p className="font-mono text-sm leading-loose text-zinc-400 max-w-[50ch]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 08 · Who runs it ─────────────────────────────────────────── */}
      <Section num="08" label="Who Runs It">
        <Heading>People with day jobs.</Heading>
        <Prose>
          Engineers and organisers who do this on the side because they want it
          to exist. Teams are run by member volunteers, and the leads
          aren&rsquo;t paid either. The people reviewing your work are members
          who&rsquo;ve been doing this a while.
        </Prose>
        <TeamFaces faces={faces} />
        <LeadLink href="/team">Meet the team</LeadLink>
      </Section>

      {/* ── 09 · Joining ─────────────────────────────────────────────── */}
      <Section num="09" label="Joining">
        <Heading>How to join.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            Anyone can join and it&rsquo;s free. There&rsquo;s no application
            and no fee, and it only takes a few minutes —{" "}
            <InlineLink href={JOIN_GUIDE}>our joining guide</InlineLink> walks
            you through it step by step.
          </Prose>
          <Prose>
            You don&rsquo;t have to be a member to help, either. Our repos are
            public — if you spot a bug or a typo in our docs, you can fix it
            today.
          </Prose>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {[
            { label: "Join the community", href: JOIN_GUIDE },
            {
              label: "Ways to contribute and volunteer",
              href: CONTRIBUTE_GUIDE,
            },
            { label: "What's coming up", href: "/events" },
            { label: "Code of Conduct", href: "/code-of-conduct" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-zinc-400 border-b border-zinc-800 pb-1 hover:text-white hover:border-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
