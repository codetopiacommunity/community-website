import { type NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { subscribeContact } from "@/lib/newsletter/contacts";
import { readConfirmToken } from "@/lib/newsletter/token";
import { getBaseUrl } from "@/lib/site-url";

// 303 makes the browser follow with a GET. The default 307 repeats the POST,
// and pages answer that with a 405 in production.
function redirectTo(path: string) {
  return NextResponse.redirect(`${getBaseUrl()}${path}`, { status: 303 });
}

function confirmPath(token: string) {
  return `/newsletter/confirm?token=${encodeURIComponent(token)}`;
}

// GET: validate the token and redirect to the confirmation page.
// No writes happen here. Email prefetchers and security scanners follow GET
// links automatically, so keeping this step read-only stops them subscribing
// someone who never clicked.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || !(await readConfirmToken(token))) {
    return redirectTo("/newsletter/expired");
  }

  return redirectTo(confirmPath(token));
}

// POST: called by the confirmation page form. Performs the actual subscribe.
export async function POST(req: NextRequest) {
  let token: FormDataEntryValue | null = null;

  try {
    token = (await req.formData()).get("token");
  } catch {
    return redirectTo("/newsletter/expired");
  }

  const email =
    typeof token === "string" ? await readConfirmToken(token) : null;

  if (typeof token !== "string" || !email) {
    return redirectTo("/newsletter/expired");
  }

  let isNew: boolean;

  try {
    isNew = await subscribeContact(email);
  } catch (error) {
    console.error("Newsletter confirmation error:", error);
    return redirectTo(`${confirmPath(token)}&error=1`);
  }

  if (isNew) {
    // They're on the list by now, so a failed welcome shouldn't show an error.
    try {
      await sendWelcomeEmail(email);
    } catch (error) {
      console.error("Newsletter welcome email error:", error);
    }
  }

  return redirectTo("/newsletter/verified");
}
