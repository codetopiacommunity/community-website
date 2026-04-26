import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { CareerForm } from "@/components/admin/careers/CareerForm";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const careerId = Number.parseInt(id, 10);
  if (Number.isNaN(careerId)) notFound();

  const career = await prisma.career.findUnique({ where: { id: careerId } });
  if (!career) notFound();

  return (
    <CareerForm
      editingCareer={{
        ...career,
        status: career.status as "open" | "closed",
        expiryDate: career.expiryDate.toISOString(),
        createdAt: career.createdAt.toISOString(),
        updatedAt: career.updatedAt.toISOString(),
        link: career.link ?? null,
      }}
    />
  );
}
