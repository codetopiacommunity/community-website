import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendVerificationEmail } from "@/lib/email";
import { isSubscribed } from "@/lib/newsletter/contacts";
import { POST } from "./route";

vi.mock("@/lib/email", () => ({ sendVerificationEmail: vi.fn() }));
vi.mock("@/lib/newsletter/contacts", () => ({ isSubscribed: vi.fn() }));

function subscribe(body: unknown) {
  return POST(
    new Request("https://example.test/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  );
}

beforeEach(() => vi.resetAllMocks());

describe("POST subscribe", () => {
  it("emails a new address", async () => {
    vi.mocked(isSubscribed).mockResolvedValue(false);
    const res = await subscribe({ email: " A@Example.com " });

    expect(res.status).toBe(200);
    expect(sendVerificationEmail).toHaveBeenCalledWith("a@example.com");
  });

  it("answers an existing subscriber identically without emailing", async () => {
    vi.mocked(isSubscribed).mockResolvedValue(false);
    const fresh = await (await subscribe({ email: "a@example.com" })).json();
    vi.mocked(sendVerificationEmail).mockClear();

    vi.mocked(isSubscribed).mockResolvedValue(true);
    const res = await subscribe({ email: "a@example.com" });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(fresh);
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("reports failure when Resend rejects the email", async () => {
    vi.mocked(isSubscribed).mockResolvedValue(false);
    vi.mocked(sendVerificationEmail).mockRejectedValue(new Error("rejected"));

    expect((await subscribe({ email: "a@example.com" })).status).toBe(500);
  });

  it("drops honeypot submissions silently", async () => {
    const res = await subscribe({ email: "a@example.com", website: "spam" });

    expect(res.status).toBe(200);
    expect(isSubscribed).not.toHaveBeenCalled();
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("rejects an invalid address", async () => {
    expect((await subscribe({ email: "nope" })).status).toBe(400);
  });
});
