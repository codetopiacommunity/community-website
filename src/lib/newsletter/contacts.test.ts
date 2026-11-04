import { beforeEach, describe, expect, it, vi } from "vitest";
import { resend } from "@/lib/email";
import { subscribeContact } from "./contacts";

vi.mock("@/lib/email", () => ({
  resend: {
    contacts: {
      get: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      segments: { list: vi.fn(), add: vi.fn() },
    },
  },
}));

const contacts = vi.mocked(resend.contacts, { deep: true });
const ok = { error: null } as never;
const notFound = { data: null, error: { name: "not_found" } } as never;
const contact = (unsubscribed: boolean) =>
  ({ data: { unsubscribed }, error: null }) as never;
const segments = (...ids: string[]) =>
  ({ data: { data: ids.map((id) => ({ id })) }, error: null }) as never;

beforeEach(() => {
  vi.resetAllMocks();
  contacts.create.mockResolvedValue(ok);
  contacts.update.mockResolvedValue(ok);
  contacts.segments.add.mockResolvedValue(ok);
});

describe("subscribeContact", () => {
  it("creates a new contact in the segment", async () => {
    contacts.get.mockResolvedValue(notFound);

    expect(await subscribeContact("a@example.com")).toBe(true);
    expect(contacts.create).toHaveBeenCalledWith({
      email: "a@example.com",
      unsubscribed: false,
      segments: [{ id: "segment-1" }],
    });
  });

  it("changes nothing for someone already subscribed", async () => {
    contacts.get.mockResolvedValue(contact(false));
    contacts.segments.list.mockResolvedValue(segments("segment-1"));

    expect(await subscribeContact("a@example.com")).toBe(false);
    expect(contacts.update).not.toHaveBeenCalled();
    expect(contacts.segments.add).not.toHaveBeenCalled();
  });

  it("resubscribes someone who left and came back", async () => {
    contacts.get.mockResolvedValue(contact(true));
    contacts.segments.list.mockResolvedValue(segments("segment-1"));

    expect(await subscribeContact("a@example.com")).toBe(true);
    expect(contacts.update).toHaveBeenCalledWith({
      email: "a@example.com",
      unsubscribed: false,
    });
  });

  it("adds an existing contact that isn't in the segment", async () => {
    contacts.get.mockResolvedValue(contact(false));
    contacts.segments.list.mockResolvedValue(segments("other"));

    expect(await subscribeContact("a@example.com")).toBe(true);
    expect(contacts.segments.add).toHaveBeenCalledWith({
      email: "a@example.com",
      segmentId: "segment-1",
    });
  });

  it("throws when Resend returns an error", async () => {
    contacts.get.mockResolvedValue(notFound);
    contacts.create.mockResolvedValue({
      data: null,
      error: { name: "invalid_api_key" },
    } as never);

    await expect(subscribeContact("a@example.com")).rejects.toThrow(
      "invalid_api_key",
    );
  });
});
