import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
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
      <PageHeader title="Verify a certificate">
        Enter the code printed on a Codetopia Community certificate to confirm
        it&rsquo;s real.
      </PageHeader>

      <section className="py-16 pb-32">
        <Container className="px-4">
          <VerifyCertificateForm initialCode={code} />
        </Container>
      </section>
    </div>
  );
}
