import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { sendWelcomeEmail } from "./email";
import { CONFIRM_WINDOW_SECONDS } from "./newsletter/token";

const fail = (name: string) => ({ data: null, error: { name } });

function welcomeKey(): string {
  return send.mock.lastCall?.[1].idempotencyKey;
}

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue({ data: { id: "1" }, error: null });
  vi.useRealTimers();
});

describe("sendWelcomeEmail", () => {
  it("uses the same key for a double click", async () => {
    vi.useFakeTimers({ now: 1_800_000_000_000 });
    await sendWelcomeEmail("a@example.com");
    const first = welcomeKey();

    vi.advanceTimersByTime(1000);
    await sendWelcomeEmail("a@example.com");

    expect(welcomeKey()).toBe(first);
  });

  it("can welcome someone again when they come back later", async () => {
    vi.useFakeTimers({ now: 1_800_000_000_000 });
    await sendWelcomeEmail("a@example.com");
    const first = welcomeKey();

    vi.advanceTimersByTime(CONFIRM_WINDOW_SECONDS * 1000);
    await sendWelcomeEmail("a@example.com");

    expect(welcomeKey()).not.toBe(first);
  });

  it("raises a rejected key instead of treating the email as sent", async () => {
    send.mockResolvedValue(fail("invalid_idempotent_request"));

    await expect(sendWelcomeEmail("a@example.com")).rejects.toThrow(
      "invalid_idempotent_request",
    );
  });

  it("accepts a duplicate that's still in progress", async () => {
    send.mockResolvedValue(fail("concurrent_idempotent_requests"));

    await expect(sendWelcomeEmail("a@example.com")).resolves.toBeUndefined();
  });

  it("raises any other Resend error", async () => {
    send.mockResolvedValue(fail("rate_limit_exceeded"));

    await expect(sendWelcomeEmail("a@example.com")).rejects.toThrow(
      "rate_limit_exceeded",
    );
  });
});
