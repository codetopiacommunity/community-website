import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Begins the "Continue with Community Portal" SSO flow.
 *
 * Generates PKCE + state, stores the verifier/state in short-lived httpOnly
 * cookies, and redirects the browser to the portal's authorize screen.
 */
export async function GET() {
  const portalWebUrl = process.env.PORTAL_WEB_URL;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;

  if (!portalWebUrl || !clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "SSO is not configured. Set PORTAL_WEB_URL, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI.",
      },
      { status: 500 },
    );
  }

  const state = base64url(randomBytes(16));
  const codeVerifier = base64url(randomBytes(32));
  const codeChallenge = base64url(
    createHash("sha256").update(codeVerifier).digest(),
  );

  const authorizeUrl = new URL("/authorize", portalWebUrl);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("scope", "read");
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("app_name", "Community Admin Center");

  const response = NextResponse.redirect(authorizeUrl.toString());
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };
  response.cookies.set("sso_state", state, cookieOpts);
  response.cookies.set("sso_verifier", codeVerifier, cookieOpts);
  return response;
}
