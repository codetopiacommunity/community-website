import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verified — Codetopia",
  description: "Your newsletter subscription has been confirmed.",
};

export default function VerifiedPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-32 px-4 bg-black font-mono">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Checkmark icon */}
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white font-sans">
          YOU&apos;RE <span className="text-zinc-600">VERIFIED</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto">
          Your email has been confirmed. You&apos;re now subscribed to{" "}
          <strong className="text-white">The Dispatch</strong>. Check your inbox
          for a welcome email.
        </p>

        <Link
          href="/"
          className=" font-sans inline-block bg-white text-black font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-zinc-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
