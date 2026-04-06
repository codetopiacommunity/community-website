import { NextResponse } from "next/server";
import { requireAuth, serverError } from "@/lib/api/api-utils";
import { renderNewsletterHtml } from "@/lib/newsletter";

/**
 * POST: Render a newsletter preview as HTML
 */
export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

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
    return serverError("Failed to render newsletter preview");
  }
}
