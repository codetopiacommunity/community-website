import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { renderNewsletterHtml } from "@/lib/newsletter";

/**
 * POST: Render a newsletter preview as HTML
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { markdownContent, subject, previewText } = data;

    const html = await renderNewsletterHtml(
      markdownContent ?? "",
      subject ?? "",
      previewText,
      process.env.NEXT_PUBLIC_BASE_URL ?? "",
    );

    return NextResponse.json({ html });
  } catch (error) {
    console.error("POST Newsletter Preview Error:", error);
    return NextResponse.json(
      { error: "Failed to render newsletter preview" },
      { status: 500 },
    );
  }
}
