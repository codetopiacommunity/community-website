import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export interface AdminSession extends JWTPayload {
  email: string;
  name?: string;
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-for-development",
);

export async function login(payload: { email: string; name?: string }) {
  // Create the session
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  // Set the cookie
  (await cookies()).set("admin_session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("admin_session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<AdminSession | null> {
  const session = (await cookies()).get("admin_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function decrypt(input: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ["HS256"],
    });
    return payload as AdminSession;
  } catch (_error) {
    return null;
  }
}
