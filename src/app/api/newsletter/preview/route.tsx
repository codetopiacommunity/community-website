import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { VerificationTemplate, WelcomeTemplate } from "@/lib/email-templates";
import { getBaseUrl } from "@/lib/site-url";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "verification";
  const baseUrl = getBaseUrl();

  let html = "";

  if (type === "welcome") {
    html = await render(<WelcomeTemplate baseUrl={baseUrl} />);
  } else {
    const verifyUrl = `${baseUrl}/api/newsletter/verify?token=preview-token`;
    html = await render(
      <VerificationTemplate verifyUrl={verifyUrl} baseUrl={baseUrl} />,
    );
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
