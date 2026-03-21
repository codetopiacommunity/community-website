export function verificationTemplate(verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#18181b;border:1px solid #27272a;border-radius:8px;overflow:hidden;">

          <tr>
            <td style="padding:40px 40px 24px 40px;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;">
                THE <span style="color:#71717a;">DISPATCH</span>
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px 40px;">
              <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#a1a1aa;">
                Thanks for signing up! Please confirm your email address to start receiving
                project updates, engineering insights, and community announcements.
              </p>
              <a href="${verifyUrl}"
                 style="display:inline-block;padding:14px 32px;background-color:#ffffff;color:#000000;font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">
                VERIFY EMAIL
              </a>
              <p style="margin:24px 0 0 0;font-size:13px;line-height:1.5;color:#52525b;">
                This link expires in <strong style="color:#a1a1aa;">24 hours</strong>.
                If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;border-top:1px solid #27272a;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                &copy; Codetopia Community &middot; You received this email because someone
                subscribed with this address.
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
