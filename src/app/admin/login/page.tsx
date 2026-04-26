"use client";

import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (_err) {
      setError("Unable to connect. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col items-center mb-12">
        <div className="relative h-20 w-20 mb-6 group">
          <Image
            src={logo}
            alt="Codetopia"
            className="object-contain filter grayscale invert brightness-200 group-hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight mb-2 font-sans">
          Admin Login
        </h1>
        <p className="text-grey-500 text-xs font-medium">
          Enter your credentials to manage the community
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="email-login"
            className="text-[10px] font-black text-grey-500 uppercase tracking-widest ml-1"
          >
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-600 group-focus-within:text-white transition-colors" />
            <input
              id="email-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-900 h-12 pl-12 pr-4 rounded-none text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-white focus:bg-black transition-all"
              placeholder="admin@codetopia.community"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password-login"
            className="text-[10px] font-black text-grey-500 uppercase tracking-widest ml-1"
          >
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-600 group-focus-within:text-white transition-colors" />
            <input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-900 h-12 pl-12 pr-4 rounded-none text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-white focus:bg-black transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest py-3.5 px-4 rounded-none text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black font-black py-4 rounded-none flex items-center justify-center gap-2 hover:bg-grey-200 transition-all active:scale-[0.98] disabled:opacity-50 group uppercase tracking-widest text-[11px] mt-4"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin font-black" />
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <div className="mt-16 text-center border-t border-white/5 pt-8">
        <p className="text-[10px] font-medium text-grey-600 tracking-wide">
          © 2024 Codetopia Community. All rights reserved.
        </p>
      </div>
    </div>
  );
}
