import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { NewsletterPreviewPage } from "@/components/admin/newsletter/NewsletterPreviewPage";

interface PreviewNewsletterPageProps {
  params: Promise<{ id: string }>;
}

export default async function PreviewNewsletterPage({
  params,
}: PreviewNewsletterPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();

  const newsletter = await prisma.newsletter.findUnique({
    where: { id: numericId },
  });

  if (!newsletter) notFound();
  if (newsletter.status !== "draft") notFound();

  return (
    <NewsletterPreviewPage
      newsletter={{
        ...newsletter,
        previewText: newsletter.previewText ?? null,
        errorMessage: newsletter.errorMessage ?? null,
      }}
    />
  );
}
