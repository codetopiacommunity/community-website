import { createHash, createHmac } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

const AUDIENCE = "dispatch-confirm";
const TOKEN_LIFETIME_SECONDS = 24 * 60 * 60;

/**
 * Asking again inside this window produces the same token, so the same request
 * reaches Resend and its idempotency key stops a second email being sent.
 */
export const CONFIRM_WINDOW_SECONDS = 10 * 60;

/**
 * Derived rather than JWT_SECRET itself. The admin session check accepts any
 * JWT signed with JWT_SECRET, and this token is emailed to anyone who
 * subscribes, so it must never verify as an admin session.
 */
function getSigningKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not set");
  return createHmac("sha256", secret).update(AUDIENCE).digest();
}

export function currentConfirmWindow(now = Date.now()): number {
  return Math.floor(now / 1000 / CONFIRM_WINDOW_SECONDS);
}

export function hashEmail(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

export async function createConfirmToken(
  email: string,
  now = Date.now(),
): Promise<string> {
  const issuedAt = currentConfirmWindow(now) * CONFIRM_WINDOW_SECONDS;

  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(AUDIENCE)
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + TOKEN_LIFETIME_SECONDS)
    .sign(getSigningKey());
}

/** Returns the email the token was issued for, or null if it isn't valid. */
export async function readConfirmToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSigningKey(), {
      algorithms: ["HS256"],
      audience: AUDIENCE,
    });
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}
