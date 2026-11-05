import { describe, expect, it } from "vitest";
import { formatDateRange } from "./format-date";

describe("date ranges", () => {
  it("joins days in the same month with a word, not a dash", () => {
    expect(formatDateRange("2026-11-03", "2026-11-05")).toBe(
      "Nov 3 to 5, 2026",
    );
  });

  it("joins days across months with a word, not a dash", () => {
    expect(formatDateRange("2026-11-30", "2026-12-02")).toBe(
      "Nov 30, 2026 to Dec 2, 2026",
    );
  });
});
