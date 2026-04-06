import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/auth";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define route properties
  const isAdminPath = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  // Protect all /admin paths EXCEPT /admin/login
  const isProtectedRoute = isAdminPath && !isLoginPage;

  // Get and verify session
  const cookie = req.cookies.get("admin_session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Redirect to /admin/login if not authenticated
  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/admin/login", req.nextUrl);
    // Optionally add a redirect-to parameter
    return NextResponse.redirect(loginUrl);
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
