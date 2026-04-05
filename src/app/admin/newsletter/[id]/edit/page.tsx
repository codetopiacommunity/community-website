import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { NewsletterComposePage } from "@/components/admin/newsletter/NewsletterComposePage";

interface EditNewsletterPageProps {
  params: Promise<{ id: string }>;
}

async function getNewsletter(id: number) {
  return prisma.newsletter.findUnique({ where: { id } });
}

export default async function EditNewsletterPage({
  params,
}: EditNewsletterPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();

  const newsletter = await getNewsletter(numericId);
  if (!newsletter) notFound();

  // Only drafts are editable
  if (newsletter.status !== "draft") notFound();

  return (
    <NewsletterComposePage
      editingNewsletter={{
        ...newsletter,
        previewText: newsletter.previewText ?? null,
        errorMessage: newsletter.errorMessage ?? null,
      }}
    />
  );
}
