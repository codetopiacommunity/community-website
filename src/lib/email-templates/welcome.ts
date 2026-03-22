import logo from "@/assets/images/logos/codetopia-community.png";

export function welcomeTemplate(baseUrl: string): string {
  const logoUrl = `${baseUrl}${logo.src}`;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <!-- Use both link and @import for maximum email client compatibility -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&family=Inter:wght@400;500;700&display=swap');
    .font-sans { font-family: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important; }
    .font-mono { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important; }
  </style>
</head>
<body class="font-mono" style="margin:0;padding:0;background-color:#09090b;font-family:'Inter',system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#18181b;border:1px solid #27272a;border-radius:8px;overflow:hidden;">

          <tr>
            <td style="padding:40px 40px 24px 40px;">
              <img src="${logoUrl}" alt="Codetopia Community Logo" height="40" style="display:block;margin-bottom:24px;" />
              <h1 class="font-sans" style="font-family:'Space Grotesk',system-ui,-apple-system,sans-serif;margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;">
                YOU'RE <span style="color:#71717a;">IN</span>
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px 40px;">
              <p class="font-mono" style="font-family:'Inter',system-ui,-apple-system,sans-serif;margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#a1a1aa;">
                Your email has been verified. You're now subscribed to <strong style="color:#ffffff;">The Dispatch</strong>
                — Codetopia Community's newsletter for project updates, engineering insights, and
                community announcements.
              </p>
              <a href="${baseUrl}"
                 class="font-sans"
                 style="font-family:'Space Grotesk',system-ui,-apple-system,sans-serif;display:inline-block;padding:14px 32px;background-color:#ffffff;color:#000000;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">
                VISIT CODETOPIA COMMUNITY
              </a>
              <p class="font-mono" style="font-family:'Inter',system-ui,-apple-system,sans-serif;margin:24px 0 0 0;font-size:13px;line-height:1.5;color:#52525b;">
                We only email when we have something worth sharing. No spam, ever.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px;border-top:1px solid #27272a;text-align:center;">
              <p class="font-mono" style="font-family:'Inter',system-ui,-apple-system,sans-serif;margin:0 0 16px 0;font-size:12px;color:#a1a1aa;line-height:2;">
                <a href="https://discord.gg/3nBFMfdNmB" style="color:#a1a1aa;text-decoration:none;">Discord</a> &nbsp;&middot;&nbsp; 
                <a href="https://github.com/codetopiacommunity" style="color:#a1a1aa;text-decoration:none;">GitHub</a> &nbsp;&middot;&nbsp; 
                <a href="https://x.com/codetopiacom" style="color:#a1a1aa;text-decoration:none;">X (Twitter)</a> &nbsp;&middot;&nbsp; 
                <a href="https://www.linkedin.com/company/codetopiacommunity" style="color:#a1a1aa;text-decoration:none;">LinkedIn</a> &nbsp;&middot;&nbsp; 
                <a href="https://www.youtube.com/@codetopiacommunity" style="color:#a1a1aa;text-decoration:none;">YouTube</a><br/>
                <a href="https://www.instagram.com/codetopiacom/" style="color:#a1a1aa;text-decoration:none;">Instagram</a> &nbsp;&middot;&nbsp; 
                <a href="http://www.threads.com/codetopiacom/" style="color:#a1a1aa;text-decoration:none;">Threads</a> &nbsp;&middot;&nbsp; 
                <a href="https://bsky.app/profile/codetopiacommunity.bsky.social" style="color:#a1a1aa;text-decoration:none;">Bluesky</a><br/>
                <a href="https://mastodon.social/@codetopiacommunity" style="color:#a1a1aa;text-decoration:none;">Mastodon</a> &nbsp;&middot;&nbsp; 
                <a href="https://www.tiktok.com/@codetopiacommunity" style="color:#a1a1aa;text-decoration:none;">TikTok</a> &nbsp;&middot;&nbsp; 
                <a href="https://chat.whatsapp.com/LiiirOwOnPz0XQ3vupioi9" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a>
              </p>
              <p class="font-mono" style="font-family:'Inter',system-ui,-apple-system,sans-serif;margin:0 0 8px 0;font-size:12px;color:#52525b;text-transform:uppercase;letter-spacing:0.1em;">
                A Codetopia Initiative
              </p>
              <p class="font-mono" style="font-family:'Inter',system-ui,-apple-system,sans-serif;margin:0;font-size:11px;color:#52525b;">
                &copy; Codetopia Community &middot; You received this email because you subscribed to The Dispatch.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
