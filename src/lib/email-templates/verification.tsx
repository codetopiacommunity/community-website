import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import logo from "@/assets/images/logos/codetopia-community.png";

const socialIcons = [
  {
    network: "discord",
    href: "https://discord.gg/3nBFMfdNmB",
    label: "Discord",
  },
  {
    network: "github",
    href: "https://github.com/codetopiacommunity",
    label: "GitHub",
  },
  { network: "x", href: "https://x.com/codetopiacom", label: "X (Twitter)" },
  {
    network: "linkedin",
    href: "https://www.linkedin.com/company/codetopiacommunity",
    label: "LinkedIn",
  },
  {
    network: "youtube",
    href: "https://www.youtube.com/@codetopiacommunity",
    label: "YouTube",
  },
  {
    network: "instagram",
    href: "https://www.instagram.com/codetopiacom/",
    label: "Instagram",
  },
  {
    network: "threads",
    href: "http://www.threads.com/codetopiacom/",
    label: "Threads",
  },
  {
    network: "bluesky",
    href: "https://bsky.app/profile/codetopiacommunity.bsky.social",
    label: "Bluesky",
  },
  {
    network: "mastodon",
    href: "https://mastodon.social/@codetopiacommunity",
    label: "Mastodon",
  },
  {
    network: "tiktok",
    href: "https://www.tiktok.com/@codetopiacommunity",
    label: "TikTok",
  },
  {
    network: "whatsapp",
    href: "https://chat.whatsapp.com/LiiirOwOnPz0XQ3vupioi9",
    label: "WhatsApp",
  },
];

function Socials({ baseUrl }: { baseUrl: string }) {
  return (
    <Section style={{ textAlign: "center", paddingBottom: "8px" }}>
      {socialIcons.map((social) => (
        <Link
          key={social.network}
          href={social.href}
          style={{
            display: "inline-block",
            margin: "0 8px 12px 8px",
          }}
        >
          <Img
            src={`${baseUrl}/assets/images/icons/socials/${social.network}.png`}
            alt={social.label}
            width="16"
            height="16"
            style={{ display: "block", border: 0 }}
          />
        </Link>
      ))}
    </Section>
  );
}

export function VerificationTemplate({
  verifyUrl,
  baseUrl,
}: {
  verifyUrl: string;
  baseUrl: string;
}) {
  const logoUrl = `${baseUrl}${logo.src}`;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <style>
          {`
            @font-face {
              font-family: 'Space Grotesk';
              font-style: normal;
              font-weight: 700;
              src: url('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf') format('truetype');
            }
          `}
        </style>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your Codetopia newsletter subscription</Preview>
      <Body
        style={{
          backgroundColor: "#09090b",
          margin: "0 auto",
          padding: "40px 0",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "8px",
            width: "560px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Section style={{ padding: "40px 40px 24px 40px" }}>
            <Img
              src={logoUrl}
              alt="Codetopia Community Logo"
              height="40"
              style={{ display: "block", marginBottom: "24px" }}
            />
            <Heading
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              }}
            >
              THE{" "}
              <span
                style={{
                  color: "#71717a",
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}
              >
                DISPATCH
              </span>
            </Heading>
          </Section>

          <Section style={{ padding: "0 40px 32px 40px" }}>
            <Text
              style={{
                margin: "0 0 20px 0",
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#a1a1aa",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Thanks for signing up! Please confirm your email address to start
              receiving project updates, engineering insights, and community
              announcements.
            </Text>
            <Link
              href={verifyUrl}
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderRadius: "4px",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              }}
            >
              VERIFY EMAIL
            </Link>
            <Text
              style={{
                margin: "24px 0 0 0",
                fontSize: "13px",
                lineHeight: 1.5,
                color: "#52525b",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              This link expires in{" "}
              <strong style={{ color: "#a1a1aa" }}>24 hours</strong>. If you did
              not request this, you can safely ignore this email.
            </Text>
          </Section>

          <Section
            style={{
              padding: "32px 40px",
              borderTop: "1px solid #27272a",
              textAlign: "center" as const,
            }}
          >
            <Socials baseUrl={baseUrl} />
            <Text
              style={{
                margin: "0 0 8px 0",
                fontSize: "12px",
                color: "#52525b",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              A Codetopia Initiative
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#52525b",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              © Codetopia Community · You received this email because someone
              subscribed with this address.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
