import { randomBytes } from "node:crypto";

export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

export function getTokenExpiry(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}
