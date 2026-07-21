import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Subscription — Codetopia",
  description: "Confirm your newsletter subscription.",
};

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <section className="flex-1 flex items-center justify-center py-32 px-4 bg-black font-mono">
        <div className="max-w-lg w-full text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white font-sans">
            INVALID <span className="text-zinc-400">LINK</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            This confirmation link is missing a token. Please check your email
            and try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex items-center justify-center py-32 px-4 bg-black font-mono">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white font-sans">
          CONFIRM <span className="text-zinc-400">SUBSCRIPTION</span>
        </h1>

        <p className="text-zinc-400 text-lg max-w-md mx-auto">
          Click the button below to confirm your email address and subscribe to{" "}
          <strong className="text-white">The Dispatch</strong>.
        </p>

        <form method="POST" action="/api/newsletter/verify">
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            className="font-sans inline-block bg-white text-black font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Confirm Subscription
          </button>
        </form>
      </div>
    </section>
  );
}
