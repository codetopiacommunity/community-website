import { prisma } from "@/../prisma/prisma";
import type { Career } from "@/lib/careers";
import { CareersClient } from "./CareersClient";

export async function CareersListing() {
  const careers = await prisma.career.findMany({
    where: {
      status: "open",
      expiryDate: { gt: new Date() },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return <CareersClient initialCareers={careers as unknown as Career[]} />;
}
