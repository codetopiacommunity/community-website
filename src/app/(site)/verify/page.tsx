import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { VerifyCertificateForm } from "@/components/verify/VerifyCertificateForm";

export const metadata: Metadata = {
  title: "Verify a Certificate — Codetopia Community",
  description:
    "Confirm whether a certificate is genuinely issued and recognized by Codetopia Community.",
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 border-b border-zinc-900">
        <Container className="px-4">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-sans mb-6">
              Verify a certificate
            </h1>
            <p className="text-zinc-400 text-lg font-mono leading-relaxed">
              Enter the code printed on a Codetopia Community certificate to
              confirm it&rsquo;s real.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 pb-32">
        <Container className="px-4">
          <VerifyCertificateForm initialCode={code} />
        </Container>
      </section>
    </div>
  );
}
