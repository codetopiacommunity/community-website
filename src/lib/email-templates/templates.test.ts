import { render } from "@react-email/render";
import { describe, expect, it } from "vitest";
import { VerificationTemplate } from "./verification";
import { WelcomeTemplate } from "./welcome";

const baseUrl = "https://example.test";

describe("email templates", () => {
  it("gives the confirm link as a button and as plain text", async () => {
    const verifyUrl = `${baseUrl}/api/newsletter/verify?token=abc`;
    const html = await render(VerificationTemplate({ verifyUrl, baseUrl }));

    expect(html.split(`href="${verifyUrl}"`).length - 1).toBe(2);
    expect(html).toContain(`>${verifyUrl}<`);
  });

  it("renders the same bytes each time, which the idempotency key relies on", async () => {
    const verifyUrl = `${baseUrl}/api/newsletter/verify?token=abc`;
    const props = { verifyUrl, baseUrl };

    expect(await render(VerificationTemplate(props))).toBe(
      await render(VerificationTemplate(props)),
    );
  });

  it("sets the background on the body, so dark mode can override it", async () => {
    const html = await render(WelcomeTemplate({ baseUrl }));

    expect(html).toMatch(/<body[^>]*background-color:#ffffff/);
    expect(html.split("#ffffff").length - 1).toBe(1);
  });

  it("sends new subscribers to the join guide", async () => {
    const html = await render(WelcomeTemplate({ baseUrl }));

    expect(html).toContain(
      `href="${baseUrl}/howtos/getting-started/join-the-community"`,
    );
    expect(html).not.toContain("discord.gg");
  });

  it("keeps to the design system and the copy rules", async () => {
    const emails = await Promise.all([
      render(VerificationTemplate({ verifyUrl: baseUrl, baseUrl })),
      render(WelcomeTemplate({ baseUrl })),
    ]);

    for (const html of emails) {
      expect(html).not.toContain("border-radius");
      expect(html).not.toContain("—");
    }
  });
});
