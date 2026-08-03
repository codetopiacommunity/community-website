"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

type Status = "idle" | "loading" | "not_found" | "found" | "error";

interface VerifiedCertificate {
  recipientName: string;
  certificateType: string;
  title: string;
  issuedDate: string;
  artworkUrl: string;
  status: string;
}

// certificateType is free text a curator typed on issuance (like a
// Recognition award name), not a fixed enum -- just capitalize whatever's
// there rather than mapping a closed set of known values.
function formatCertificateType(value: string): string {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "Certificate";
}

function isPdfUrl(url: string): boolean {
  return url.toLowerCase().endsWith(".pdf");
}

export function VerifyCertificateForm({
  initialCode,
}: {
  initialCode?: string;
}) {
  const [code, setCode] = useState(initialCode ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [certificate, setCertificate] = useState<VerifiedCertificate | null>(
    null,
  );

  async function verify(value: string) {
    if (!value.trim()) return;
    setStatus("loading");
    setCertificate(null);
    try {
      const res = await fetch("/api/verify-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value.trim() }),
      });
      const data = await res.json();
      if (data.status === "found") {
        setCertificate(data.certificate);
        setStatus("found");
      } else if (data.status === "error") {
        setStatus("error");
      } else {
        setStatus("not_found");
      }
    } catch {
      setStatus("error");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: verify is redefined every render; only initialCode should retrigger this
  useEffect(() => {
    if (initialCode) verify(initialCode);
  }, [initialCode]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    verify(code);
  }

  return (
    <div className="mx-auto max-w-xl">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. CT-26-ABCD-EFGH-JKMN"
          className="flex-1 border border-zinc-800 bg-black px-4 py-3 text-center font-mono text-sm uppercase tracking-widest text-white placeholder:text-center placeholder:tracking-normal placeholder:text-zinc-600 placeholder:normal-case outline-none transition-colors focus:border-white sm:text-left sm:placeholder:text-left"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || !code.trim()}
          className="bg-white px-8 py-3 font-mono text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-zinc-200 disabled:opacity-40"
        >
          {status === "loading" ? "Checking…" : "Verify"}
        </button>
      </form>

      <div className="mt-8">
        {status === "not_found" && (
          <div className="border border-zinc-800 bg-zinc-950 px-5 py-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              No certificate matches that code. Check it and try again.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="border border-amber-900 bg-amber-950/20 px-5 py-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
              Verification service is temporarily unavailable. Please try again
              in a moment.
            </p>
          </div>
        )}

        {status === "found" && certificate && (
          <div className="border border-zinc-800 bg-zinc-950 px-6 py-10 md:px-10">
            <div className="mb-6 flex flex-col items-center text-center">
              {certificate.status === "revoked" ? (
                <XCircle
                  className="mb-3 h-14 w-14 text-red-500"
                  strokeWidth={1.5}
                />
              ) : (
                <CheckCircle2
                  className="mb-3 h-14 w-14 text-emerald-500"
                  strokeWidth={1.5}
                />
              )}
              <span
                className={`inline-flex items-center border px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest ${
                  certificate.status === "revoked"
                    ? "border-red-900 bg-red-950 text-red-400"
                    : "border-emerald-900 bg-emerald-950 text-emerald-400"
                }`}
              >
                {certificate.status === "revoked" ? "Revoked" : "Verified"}
              </span>
            </div>

            <div className="text-center">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {formatCertificateType(certificate.certificateType)}
              </p>
              <h3 className="mb-1 font-sans text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                {certificate.recipientName}
              </h3>
              <p className="mb-1 font-mono text-sm text-zinc-400">
                {certificate.title}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {certificate.issuedDate}
              </p>
            </div>

            {certificate.artworkUrl && (
              <div className="mx-auto mt-6 max-w-sm border border-zinc-900">
                {isPdfUrl(certificate.artworkUrl) ? (
                  <a
                    href={certificate.artworkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-6 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
                  >
                    View Certificate (PDF) &rarr;
                  </a>
                ) : (
                  <a
                    href={certificate.artworkUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {/* biome-ignore lint/performance/noImgElement: remote Cloudinary URL */}
                    <img
                      src={certificate.artworkUrl}
                      alt={`${certificate.title} certificate`}
                      className="w-full object-contain"
                    />
                  </a>
                )}
              </div>
            )}

            {certificate.status === "revoked" && (
              <p className="mt-6 border-t border-zinc-900 pt-6 text-center font-mono text-xs text-zinc-500">
                This certificate has been revoked and is no longer valid.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
