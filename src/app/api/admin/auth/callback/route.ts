import { NextResponse } from "next/server";
import { login } from "@/lib/auth/auth";

const REQUIRED_PERMISSION = "admin.panel.access";

/** Minimal mirror of the portal's wildcard permission resolution. */
function hasPermission(perms: string[], permission: string): boolean {
  if (perms.includes(permission)) return true;
  if (perms.includes("*")) return true;
  const [resource, ...rest] = permission.split(".");
  const action = rest.join(".");
  if (perms.includes(`${resource}.*`)) return true;
  if (perms.includes(`*.${action}`)) return true;
  return false;
}

function fail(loginUrl: URL, reason: string) {
  loginUrl.searchParams.set("error", reason);
  return NextResponse.redirect(loginUrl.toString());
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginUrl = new URL("/admin/login", url.origin);

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError) return fail(loginUrl, oauthError);
  if (!code) return fail(loginUrl, "missing_code");

  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const idx = c.indexOf("=");
      return [c.slice(0, idx), decodeURIComponent(c.slice(idx + 1))];
    }),
  );
  const expectedState = cookies.sso_state;
  const codeVerifier = cookies.sso_verifier;

  if (!expectedState || expectedState !== returnedState || !codeVerifier) {
    return fail(loginUrl, "invalid_state");
  }

  const portalApiUrl = process.env.PORTAL_API_URL;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;
  if (!portalApiUrl || !clientId || !clientSecret || !redirectUri) {
    return fail(loginUrl, "sso_not_configured");
  }

  try {
    // 1. Exchange the authorization code for an access token (PKCE).
    const tokenRes = await fetch(`${portalApiUrl}/o/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenRes.ok) return fail(loginUrl, "token_exchange_failed");
    const token = await tokenRes.json();
    const accessToken = token.access_token;
    if (!accessToken) return fail(loginUrl, "token_exchange_failed");

    // 2. Read the user and their permissions from the portal.
    const meRes = await fetch(`${portalApiUrl}/api/v1/oauth/userinfo/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!meRes.ok) return fail(loginUrl, "userinfo_failed");
    const userinfo = await meRes.json();
    const me = userinfo?.data ?? userinfo;
    const permissions: string[] = Array.isArray(me?.permissions)
      ? me.permissions
      : [];

    // 3. Gate the admin center on the right permission.
    if (!hasPermission(permissions, REQUIRED_PERMISSION)) {
      return fail(loginUrl, "not_authorized");
    }

    // 4. Issue the local admin session and clean up the SSO cookies.
    await login({
      email: me.email,
      name: me.name || "Admin",
      avatarUrl: me.picture || "",
      roles: Array.isArray(me.roles) ? me.roles : [],
    });

    const response = NextResponse.redirect(
      new URL("/admin", url.origin).toString(),
    );
    response.cookies.set("sso_state", "", { path: "/", maxAge: 0 });
    response.cookies.set("sso_verifier", "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return fail(loginUrl, "sso_error");
  }
}
