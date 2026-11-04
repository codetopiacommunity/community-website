import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendWelcomeEmail } from "@/lib/email";
import { subscribeContact } from "@/lib/newsletter/contacts";
import { createConfirmToken } from "@/lib/newsletter/token";
import { GET, POST } from "./route";

vi.mock("@/lib/email", () => ({ sendWelcomeEmail: vi.fn() }));
vi.mock("@/lib/newsletter/contacts", () => ({ subscribeContact: vi.fn() }));

function post(token?: string) {
  const body = new URLSearchParams(token ? { token } : {});
  return new NextRequest("https://example.test/api/newsletter/verify", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

beforeEach(() => vi.resetAllMocks());

describe("POST verify", () => {
  it("subscribes, welcomes and redirects with a 303 and no double slash", async () => {
    vi.mocked(subscribeContact).mockResolvedValue(true);
    const res = await POST(post(await createConfirmToken("a@example.com")));

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe(
      "https://example.test/newsletter/verified",
    );
    expect(subscribeContact).toHaveBeenCalledWith("a@example.com");
    expect(sendWelcomeEmail).toHaveBeenCalledWith("a@example.com");
  });

  it("doesn't welcome twice on a repeat click", async () => {
    vi.mocked(subscribeContact).mockResolvedValue(false);
    const res = await POST(post(await createConfirmToken("a@example.com")));

    expect(res.headers.get("location")).toContain("/newsletter/verified");
    expect(sendWelcomeEmail).not.toHaveBeenCalled();
  });

  it("still succeeds when the welcome email fails", async () => {
    vi.mocked(subscribeContact).mockResolvedValue(true);
    vi.mocked(sendWelcomeEmail).mockRejectedValue(new Error("down"));
    const res = await POST(post(await createConfirmToken("a@example.com")));

    expect(res.headers.get("location")).toContain("/newsletter/verified");
  });

  it("returns to the confirm page with an error when Resend fails", async () => {
    vi.mocked(subscribeContact).mockRejectedValue(new Error("down"));
    const res = await POST(post(await createConfirmToken("a@example.com")));

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("/newsletter/confirm?token=");
    expect(res.headers.get("location")).toContain("&error=1");
  });

  it("sends a bad token to the expired page without subscribing", async () => {
    const res = await POST(post("not-a-token"));

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("/newsletter/expired");
    expect(subscribeContact).not.toHaveBeenCalled();
  });
});

describe("GET verify", () => {
  it("never subscribes, so link scanners can't confirm anyone", async () => {
    const token = await createConfirmToken("a@example.com");
    const res = await GET(
      new NextRequest(
        `https://example.test/api/newsletter/verify?token=${token}`,
      ),
    );

    expect(res.headers.get("location")).toContain("/newsletter/confirm?token=");
    expect(subscribeContact).not.toHaveBeenCalled();
  });
});
