import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getHowtosIntro } from "./howtos";

const readme = {
  content: Buffer.from("# Start here").toString("base64"),
};
const ok = () => new Response(JSON.stringify(readme), { status: 200 });

function authHeaders(fetchMock: ReturnType<typeof vi.fn>) {
  return fetchMock.mock.calls.map(
    ([, init]) => (init.headers as Record<string, string>).Authorization,
  );
}

describe("loading guides from GitHub", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends the token when one is set", async () => {
    vi.stubEnv("GITHUB_TOKEN", "secret");
    fetchMock.mockResolvedValueOnce(ok());

    await expect(getHowtosIntro()).resolves.toBe("# Start here");
    expect(authHeaders(fetchMock)).toEqual(["Bearer secret"]);
  });

  it("sends no token when none is set", async () => {
    vi.stubEnv("GITHUB_TOKEN", "");
    fetchMock.mockResolvedValueOnce(ok());

    await expect(getHowtosIntro()).resolves.toBe("# Start here");
    expect(authHeaders(fetchMock)).toEqual([undefined]);
  });

  it("retries without the token when GitHub rejects it", async () => {
    vi.stubEnv("GITHUB_TOKEN", "expired");
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock
      .mockResolvedValueOnce(new Response("", { status: 401 }))
      .mockResolvedValueOnce(ok());

    await expect(getHowtosIntro()).resolves.toBe("# Start here");
    expect(authHeaders(fetchMock)).toEqual(["Bearer expired", undefined]);
    expect(logged).toHaveBeenCalledOnce();
    expect(logged.mock.calls[0][0]).not.toContain("expired");
  });

  it("does not retry when the limit is used up", async () => {
    vi.stubEnv("GITHUB_TOKEN", "secret");
    fetchMock.mockResolvedValueOnce(new Response("", { status: 403 }));

    await expect(getHowtosIntro()).resolves.toBe("");
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
