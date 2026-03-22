import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { VerificationTemplate, WelcomeTemplate } from "@/lib/email-templates";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "verification";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
