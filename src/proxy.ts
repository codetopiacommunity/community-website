import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/auth";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define route properties
  const isAdminPath = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  // Get and verify session
  const cookie = req.cookies.get("admin_session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Start first-party SSO immediately. The login page is reserved for showing
  // callback errors and offering a manual retry.
  if (isAdminPath && !session) {
    if (isLoginPage && req.nextUrl.searchParams.has("error")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/api/admin/auth/start", req.nextUrl));
  }

  // Redirect to /admin if authenticated and trying to access login
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Ensure middleware runs on all relevant routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
