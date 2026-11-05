import {
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { BODY_FONT, HEADING_FONT } from "./styles";

// Mirrors the portal's emails (portal-core apps/common/email_templates.py) so
// everything Codetopia Community sends looks the same. The light palette is
// the inline base, and readers in dark mode get the overrides below.

const STYLES = `
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 800;
  src: url('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf') format('truetype');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  src: url('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
}
@media (prefers-color-scheme: dark) {
  body { background-color: #0a0a0b !important; }
  .logo-light, .icons-light { display: none !important; }
  .logo-dark, .icons-dark { display: block !important; }
  .heading { color: #fafafa !important; }
  .body-text, .body-text a { color: #d4d4d8 !important; }
  .cta-button { border-color: #fafafa !important; color: #fafafa !important; }
  .reassurance, .reassurance a { color: #a1a1aa !important; }
  .footer { border-color: #27272a !important; }
  .footer-byline, .footer-byline a { color: #a1a1aa !important; }
  .footer-copyright { color: #71717a !important; }
}
`;

const SOCIAL_LINKS = [
  {
    name: "github",
    label: "GitHub",
    href: "https://github.com/codetopiacommunity",
  },
  { name: "x", label: "X", href: "https://x.com/codetopiacom" },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/codetopiacommunity",
  },
  {
    name: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/codetopiacommunity",
  },
  {
    name: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@codetopiacommunity",
  },
  {
    name: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/codetopiacommunity/",
  },
  {
    name: "threads",
    label: "Threads",
    href: "http://www.threads.com/codetopiacommunity/",
  },
  {
    name: "bluesky",
    label: "Bluesky",
    href: "https://bsky.app/profile/codetopiacommunity.bsky.social",
  },
  {
    name: "mastodon",
    label: "Mastodon",
    href: "https://mastodon.social/@codetopiacommunity",
  },
  {
    name: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@codetopiacom",
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VaFHtkR8KMqpEVu24v2o",
  },
];

export function EmailButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="cta-button"
      style={{
        display: "inline-block",
        marginBottom: "32px",
        padding: "13px 28px",
        border: "1.5px solid #18181b",
        color: "#18181b",
        fontFamily: HEADING_FONT,
        fontSize: "13px",
        fontWeight: 800,
        letterSpacing: "0.08em",
        textDecoration: "none",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Link>
  );
}

function SocialIcons({
  baseUrl,
  suffix,
  className,
  display,
}: {
  baseUrl: string;
  suffix: string;
  className: string;
  display: "block" | "none";
}) {
  return (
    <div className={className} style={{ display, margin: "0 0 18px 0" }}>
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          style={{ display: "inline-block", margin: "0 9px 0 0" }}
        >
          <Img
            src={`${baseUrl}/assets/images/icons/socials/${social.name}${suffix}.png`}
            alt={social.label}
            width="20"
            height="20"
            style={{ display: "block", border: 0 }}
          />
        </Link>
      ))}
    </div>
  );
}

export function EmailLayout({
  baseUrl,
  preview,
  title,
  children,
}: {
  baseUrl: string;
  /** The line inboxes show beside the subject. */
  preview: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a constant, and React would otherwise escape the quotes and break the CSS */}
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      </Head>
      {/* A plain <body>: React Email's Body moves these styles to an inner
          table, where the dark mode override can't reach the background. */}
      <body
        style={{
          margin: 0,
          padding: "40px 20px",
          backgroundColor: "#ffffff",
          fontFamily: BODY_FONT,
        }}
      >
        <Preview>{preview}</Preview>
        <Container
          style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}
        >
          <Img
            src={`${baseUrl}/assets/images/logos/community-logo-outlined.png`}
            alt="Codetopia Community"
            height="38"
            className="logo-light"
            style={{ display: "block", marginBottom: "28px" }}
          />
          <Img
            src={`${baseUrl}/assets/images/logos/community-logo-white.png`}
            alt="Codetopia Community"
            height="38"
            className="logo-dark"
            style={{ display: "none", marginBottom: "28px" }}
          />
          <Heading
            as="h1"
            className="heading"
            style={{
              margin: "0 0 22px 0",
              fontFamily: HEADING_FONT,
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#18181b",
            }}
          >
            {title}
          </Heading>

          {children}

          <Section
            className="footer"
            style={{
              marginTop: "8px",
              paddingTop: "24px",
              borderTop: "1px solid #e4e4e7",
            }}
          >
            <SocialIcons
              baseUrl={baseUrl}
              suffix=""
              className="icons-light"
              display="block"
            />
            <SocialIcons
              baseUrl={baseUrl}
              suffix="-white"
              className="icons-dark"
              display="none"
            />
            <Text
              className="footer-byline"
              style={{
                margin: "0 0 6px 0",
                fontFamily: BODY_FONT,
                fontSize: "11px",
                color: "#71717a",
              }}
            >
              A{" "}
              <Link
                href="https://codetopia.org"
                style={{ color: "#71717a", textDecoration: "underline" }}
              >
                Codetopia
              </Link>{" "}
              Initiative
            </Text>
            <Text
              className="footer-copyright"
              style={{
                margin: 0,
                fontFamily: BODY_FONT,
                fontSize: "10px",
                color: "#a1a1aa",
              }}
            >
              © Codetopia Community. All rights reserved.
            </Text>
          </Section>
        </Container>
      </body>
    </Html>
  );
}
