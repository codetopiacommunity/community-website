import { Container } from "@/components/layout/Container";

const sections = [
  {
    title: "Who We Are",
    body: "Codetopia Community is an initiative of Codetopia (codetopia.org), based in Accra, Ghana. This policy explains how we handle personal data collected through this website.",
  },
  {
    title: "What We Collect",
    body: "The only personal data we collect is your email address, and only when you voluntarily subscribe to The Dispatch — our community newsletter. We do not collect names, phone numbers, or any other personal information.",
  },
  {
    title: "Why We Collect It",
    body: "Your email address is used solely to send you The Dispatch newsletter — project updates, community announcements, and engineering insights. We do not use it for advertising or share it with third parties for marketing purposes.",
  },
  {
    title: "How Long We Keep It",
    body: "We retain your email address for as long as you remain subscribed. When you unsubscribe, your email is removed from our mailing list. You can unsubscribe at any time via the unsubscribe link in any newsletter email.",
  },
  {
    title: "Analytics",
    body: "We use Vercel Analytics to understand how visitors use this site. Vercel Analytics is cookieless and does not collect personally identifiable information. No cookies are set, and no data is linked to individual users.",
  },
  {
    title: "Third-Party Services",
    body: "This site is hosted on Vercel. Email delivery is handled by our email service provider. These services may process data on our behalf under their own privacy policies. We do not sell your data to any third party.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at the email below.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this policy from time to time. Any changes will be posted on this page. Continued use of the site after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="px-2">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
              PRIVACY <br />
              <span className="text-zinc-700">POLICY</span>
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
            {/* Contact */}
            <div className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
              <p className="text-white font-black uppercase tracking-tight text-lg font-sans">
                Contact
              </p>
              <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                For any privacy-related questions or requests, email us at{" "}
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
