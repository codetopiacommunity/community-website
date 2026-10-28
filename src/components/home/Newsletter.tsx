"use client";

import { type FormEvent, useState } from "react";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div>
        <p className="font-sans text-sm font-black text-white uppercase tracking-tighter mb-1">
          The Dispatch
        </p>
        <p className="font-mono text-sm text-zinc-400">
          Get a short email when something new happens in the community.
        </p>
      </div>

      <form className="w-full lg:max-w-md" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="email"
            aria-label="Your email"
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            className="min-w-0 flex-1 rounded-none border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-white"
            required
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className="shrink-0 bg-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-black transition-colors duration-200 hover:bg-zinc-200 disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-3 text-sm font-sans ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
