import { SignJWT } from "jose";
import { describe, expect, it, vi } from "vitest";
import { decrypt } from "@/lib/auth/auth";
import { createConfirmToken, readConfirmToken } from "./token";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));

const DAY = 24 * 60 * 60 * 1000;

describe("confirm token", () => {
  it("round-trips the email", async () => {
    const token = await createConfirmToken("a@example.com");
    expect(await readConfirmToken(token)).toBe("a@example.com");
  });

  it("never verifies as an admin session", async () => {
    const token = await createConfirmToken("a@example.com");
    expect(await decrypt(token)).toBeNull();
  });

  it("rejects a token signed with the raw JWT secret", async () => {
    const forged = await new SignJWT({ email: "a@example.com" })
      .setProtectedHeader({ alg: "HS256" })
      .setAudience("dispatch-confirm")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode("test-secret"));
    expect(await readConfirmToken(forged)).toBeNull();
  });

  it("is identical within a window and differs in the next", async () => {
    const start = 1_800_000_000_000;
    const first = await createConfirmToken("a@example.com", start);
    expect(await createConfirmToken("a@example.com", start + 1000)).toBe(first);
    expect(
      await createConfirmToken("a@example.com", start + 10 * 60 * 1000),
    ).not.toBe(first);
  });

  it("expires after a day", async () => {
    const token = await createConfirmToken(
      "a@example.com",
      Date.now() - 2 * DAY,
    );
    expect(await readConfirmToken(token)).toBeNull();
  });

  it("rejects garbage and old hex tokens", async () => {
    expect(await readConfirmToken("abc123")).toBeNull();
  });
});
