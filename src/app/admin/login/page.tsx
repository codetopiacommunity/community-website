"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";

const ERROR_MESSAGES: Record<string, string> = {
  not_authorized: "Your community account doesn't have admin access.",
  invalid_state: "Your sign-in session expired. Please try again.",
  token_exchange_failed: "We couldn't complete sign-in. Please try again.",
  userinfo_failed: "We couldn't read your account. Please try again.",
  access_denied: "Sign-in was cancelled.",
  sso_not_configured:
    "Admin sign-in is not configured. Contact an administrator.",
  sso_error: "Something went wrong during sign-in. Please try again.",
};

function LoginInner() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const error = errorCode
    ? (ERROR_MESSAGES[errorCode] ?? "Sign-in failed. Please try again.")
    : "";

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
          Admin Access
        </h1>
        <p className="text-grey-500 text-xs font-medium text-center">
          Sign in with your Codetopia Community account to manage the community.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest py-3.5 px-4 rounded-none text-center mb-5">
          {error}
        </div>
      )}

      <a
        href="/api/admin/auth/start"
        className="w-full bg-white text-black font-black py-4 rounded-none flex items-center justify-center gap-2 hover:bg-grey-200 transition-all active:scale-[0.98] group uppercase tracking-widest text-[11px]"
      >
        Continue with Community Portal
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>

      <div className="mt-16 text-center border-t border-white/5 pt-8">
        <p className="text-[10px] font-medium text-grey-600 tracking-wide">
          © 2024 Codetopia Community. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
