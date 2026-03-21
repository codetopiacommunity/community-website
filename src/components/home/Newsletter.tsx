"use client";

import { type FormEvent, useState } from "react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";
import React, {useState} from "react";
import {subscribe} from "@/actions/SubscribeNewsletter";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function Newsletter() {

  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const res = await subscribe(email);

      alert(res.message);

      if (res.message === "Successfully subscribed!") {
        setEmail("");
      }
    }
  }

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#e4e4e7] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Typographic Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05]">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter text-black font-sans leading-none">
          CONNECT
        </h2>
      </div>

      <Container className="relative z-10 w-full px-4 max-w-7xl">
        <div className="bg-black p-12 md:p-24 lg:p-32 flex flex-col lg:flex-row items-center justify-between gap-12 border-2 border-zinc-900 shadow-2xl">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 font-sans leading-none">
              THE <span className="text-zinc-600">DISPATCH</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-sans max-w-xl">
              Project updates, engineering insights, and community
              announcements. Ship directly to your inbox.
            </p>
          </div>

          <form
            className="w-full lg:w-auto flex-1 max-w-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                className="flex-1 bg-zinc-900 text-white px-8 py-5 h-34 md:h-16 outline-none font-sans text-sm md:text-lg border border-zinc-800 transition-colors focus:border-white rounded-none"
                required
                disabled={status === "loading"}
              />
              <CtaButton
                type="submit"
                className="bg-white text-black hover:bg-zinc-200 px-10 h-14 md:h-16 disabled:opacity-50"
                offsetClassName="bg-zinc-400"
                disabled={status === "loading"}
              >
                {status === "loading" ? "SENDING…" : "SUBMIT"}
              </CtaButton>
            </div>

            {/* Feedback message */}
            {message && (
              <p
                className={`mt-4 text-sm font-sans ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
