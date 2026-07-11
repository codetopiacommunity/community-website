import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { RecognitionForm } from "@/components/admin/recognition/RecognitionForm";

export default async function EditRecognitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.recognition.findUnique({
    where: { id: Number(id) },
  });
  if (!item) notFound();

  return (
    <RecognitionForm
      editing={{
        id: item.id,
        portalUsername: item.portalUsername,
        category: item.category,
        awardName: item.awardName,
        period: item.period,
        impactSummary: item.impactSummary,
        roleLabel: item.roleLabel,
        domain: item.domain,
        achievements: item.achievements as string[],
        isPublished: item.isPublished,
        order: item.order,
      }}
    />
  );
}
