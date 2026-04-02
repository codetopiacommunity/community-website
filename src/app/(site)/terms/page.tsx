import { Container } from "@/components/layout/Container";

const sections = [
  {
    title: "Acceptance",
    body: "By accessing or using this website, you agree to these Terms. If you do not agree, please do not use the site.",
  },
  {
    title: "Use of the Site",
    body: "You may use this site for lawful purposes only. You must not misuse, scrape, reverse-engineer, or attempt to disrupt the site or its services in any way.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this site — including text, graphics, logos, and code — is the property of Codetopia Community unless otherwise stated. You may not reproduce or redistribute it without permission.",
  },
  {
    title: "Newsletter",
    body: "By subscribing to The Dispatch, you agree to receive periodic emails from Codetopia Community. You can unsubscribe at any time via the link in any email. We reserve the right to remove subscribers at our discretion.",
  },
  {
    title: "Community Conduct",
    body: "Participation in any Codetopia Community space is subject to our Code of Conduct. We reserve the right to remove anyone who violates it.",
  },
  {
    title: "No Warranties",
    body: "This site is provided as-is, without warranties of any kind. We do not guarantee that the site will be available, error-free, or up to date at all times.",
  },
  {
    title: "Changes",
    body: "We may update these Terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated Terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="px-2">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
              TERMS OF <br />
              <span className="text-zinc-700">SERVICE</span>
            </h1>
            <p className="text-zinc-500 font-mono text-sm">
              Last updated: April 2026
            </p>
          </div>
        </Container>
      </section>

      {/* Sections */}
      <section className="border-t border-zinc-900 pb-32">
        <Container className="px-4">
          <div className="flex flex-col gap-px bg-zinc-900">
            {sections.map((s) => (
              <div
                key={s.title}
                className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16"
              >
                <p className="text-white font-black uppercase tracking-tight text-lg font-sans">
                  {s.title}
                </p>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
            <div className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
              <p className="text-white font-black uppercase tracking-tight text-lg font-sans">
                Contact
              </p>
              <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                Questions about these Terms? Reach us at{" "}
                <a
                  href="mailto:hello@codetopia.org"
                  className="text-white underline underline-offset-4"
                >
                  hello@codetopia.org
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
