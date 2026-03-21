import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Expired — Codetopia",
  description: "The verification link you used has expired or is invalid.",
};

export default function ExpiredPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-32 px-4 bg-black">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Error icon (X mark) */}
        <div className="mx-auto w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
          LINK <span className="text-zinc-600">EXPIRED</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto">
          The verification link you used has expired or is invalid. Please{" "}
          <strong className="text-white">subscribe again</strong> to receive a
          new one.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="inline-block bg-white text-black font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-zinc-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
