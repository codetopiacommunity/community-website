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
    <div style={{ textAlign: "center", paddingBottom: "8px" }}>
      {socialIcons.map((social) => (
        <a
          key={social.network}
          href={social.href}
          style={{
            textDecoration: "none",
            display: "inline-block",
            margin: "0 8px 12px 8px",
          }}
          title={social.label}
        >
          {/* biome-ignore lint/performance/noImgElement: Email template requires native img */}
          <img
            src={`${baseUrl}/assets/images/icons/socials/${social.network}.png`}
            alt={social.label}
            width={16}
            height={16}
            style={{ display: "block", border: 0 }}
          />
        </a>
      ))}
    </div>
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
    <html lang="en" dir="ltr">
      {/* biome-ignore lint/style/noHeadElement: Email template requires native head */}
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&family=Inter:wght@400;500;700&display=swap');
          .font-sans { font-family: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important; }
          .font-mono { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important; }
          `}
        </style>
      </head>
      <body
        className="font-mono"
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#09090b",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#09090b", padding: "40px 0" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="560"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "40px 40px 24px 40px" }}>
                        {/* biome-ignore lint/performance/noImgElement: Email template requires native img */}
                        <img
                          src={logoUrl}
                          alt="Codetopia Community Logo"
                          height="40"
                          style={{ display: "block", marginBottom: "24px" }}
                        />
                        <h1
                          className="font-sans"
                          style={{
                            margin: 0,
                            fontSize: "28px",
                            fontWeight: 800,
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          THE <span style={{ color: "#71717a" }}>DISPATCH</span>
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0 40px 32px 40px" }}>
                        <p
                          className="font-mono"
                          style={{
                            margin: "0 0 20px 0",
                            fontSize: "16px",
                            lineHeight: 1.6,
                            color: "#a1a1aa",
                          }}
                        >
                          Thanks for signing up! Please confirm your email
                          address to start receiving project updates,
                          engineering insights, and community announcements.
                        </p>
                        <a
                          href={verifyUrl}
                          className="font-sans"
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
                          }}
                        >
                          VERIFY EMAIL
                        </a>
                        <p
                          className="font-mono"
                          style={{
                            margin: "24px 0 0 0",
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: "#52525b",
                          }}
                        >
                          This link expires in{" "}
                          <strong style={{ color: "#a1a1aa" }}>24 hours</strong>
                          . If you did not request this, you can safely ignore
                          this email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "32px 40px",
                          borderTop: "1px solid #27272a",
                          textAlign: "center",
                        }}
                      >
                        <Socials baseUrl={baseUrl} />
                        <p
                          className="font-mono"
                          style={{
                            margin: "0 0 8px 0",
                            fontSize: "12px",
                            color: "#52525b",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          A Codetopia Initiative
                        </p>
                        <p
                          className="font-mono"
                          style={{
                            margin: 0,
                            fontSize: "11px",
                            color: "#52525b",
                          }}
                        >
                          &copy; Codetopia Community &middot; You received this
                          email because someone subscribed with this address.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
