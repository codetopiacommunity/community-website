import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import {
  Heading,
  InlineLink,
  LeadLink,
  Prose,
  Section,
} from "@/components/layout/Editorial";
import { CONTACT_EMAIL, CONTACT_URL, POST_ROLE_URL } from "@/lib/data/links";
import { organisations } from "@/lib/data/partners";

export const metadata: Metadata = {
  title: "Work With Us · Codetopia Community",
  description:
    "How organisations work with Codetopia Community: hire, share a challenge, speak, or host.",
};

const CODETOPIA_PARTNERS_URL = "https://codetopia.org/partners";

// Left-aligned, unlike the centred band on the home page, so the logos sit
// in the same column as the rest of this page's content.
const organisationGroups = [
  { label: "Sponsors", type: "sponsor" },
  { label: "Partners", type: "partner" },
  { label: "Worked with", type: "worked-with" },
]
  .map((group) => ({
    label: group.label,
    items: organisations.filter((org) => org.type === group.type),
  }))
  .filter((group) => group.items.length > 0);

const ways = [
  {
    title: "Hire",
    description:
      "Send us your role, internship or graduate opportunity and we'll list it on our careers board, where members see it. We check every role before listing it.",
  },
  {
    title: "Share a challenge",
    description:
      "Bring a real problem to the community. Members interested in it can take it on and grow through the work.",
  },
  {
    title: "Speak",
    description:
      "Share your expertise at our meetups, workshops and online sessions.",
  },
  {
    title: "Host",
    description:
      "Welcome the community to your space for a meetup, workshop or hackathon, or run one with us.",
  },
];

export default function WorkWithUsPage() {
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
              For Organisations
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.88] font-sans">
              Work With <br />
              <span className="text-zinc-400">Us.</span>
            </h1>
            <div className="flex flex-col gap-6">
              <Prose>
                Codetopia Community brings together people in tech doing real
                work across every discipline and level. We welcome organisations
                that want to work with our members: to hire, to collaborate, or
                to share what they know.
              </Prose>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 01 · Ways to work with us ────────────────────────── */}
      <Section num="01" label="Ways To Work With Us">
        <Heading>How organisations get involved.</Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
          {ways.map((way) => (
            <div key={way.title} className="flex flex-col gap-2.5">
              <h3 className="text-lg font-black uppercase tracking-tighter font-sans text-white">
                {way.title}
              </h3>
              <p className="font-mono text-sm leading-loose text-zinc-400 max-w-[42ch]">
                {way.description}
              </p>
            </div>
          ))}
        </div>

        <Prose>
          Write to us at{" "}
          <InlineLink href={CONTACT_URL}>{CONTACT_EMAIL}</InlineLink> and tell
          us what you have in mind.
        </Prose>

        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <LeadLink href={CONTACT_URL}>Get in touch</LeadLink>
          <LeadLink href={POST_ROLE_URL}>Post a role</LeadLink>
          <LeadLink href="/careers">See the careers board</LeadLink>
        </div>
      </Section>

      {/* ── 02 · Partnerships ────────────────────────────────── */}
      <Section num="02" label="Partnerships">
        <Heading>Partner with Codetopia.</Heading>
        <Prose>
          Sponsorships, partnerships and work with schools are handled by{" "}
          <InlineLink href="https://codetopia.org">Codetopia</InlineLink>, which
          leads the community. That gives you one point of contact across
          everything Codetopia does, and a look at who Codetopia works with
          across its initiatives.
        </Prose>
        <LeadLink href={CODETOPIA_PARTNERS_URL}>
          Partner with Codetopia
        </LeadLink>
      </Section>

      {/* ── 03 · How we work ─────────────────────────────────── */}
      <Section num="03" label="How We Work">
        <Heading>Welcome to a community built around you.</Heading>
        <div className="flex flex-col gap-6">
          <Prose>
            We are entirely volunteer-run, meaning every opportunity is an open
            invitation, not a requirement. You are always in control of what you
            take on, and your privacy is secure.
          </Prose>
          <Prose>
            Organisations will get to know you through the roles, challenges,
            and events you choose to join. Ultimately, this means the people you
            encounter are here because they truly want to be.
          </Prose>
        </div>
      </Section>

      {/* ── 04 · Who we work with ────────────────────────────── */}
      <Section num="04" label="Track Record">
        <Heading>Who we work with.</Heading>
        <div className="flex flex-col gap-10">
          {organisationGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                {group.label}
              </h3>
              <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                {group.items.map((org) => (
                  <a
                    key={org.id}
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <Image
                      src={org.logo}
                      alt={org.name}
                      width={224}
                      height={80}
                      className="h-14 md:h-16 w-auto max-w-48 object-contain"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
