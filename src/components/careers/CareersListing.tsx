import { prisma } from "@/../prisma/prisma";
import type { Career } from "@/lib/careers";
import { CareersClient } from "./CareersClient";

export async function CareersListing() {
  let careers: Career[] = [];
  try {
    const rows = await prisma.career.findMany({
      where: {
        status: "open",
        expiryDate: { gt: new Date() },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    careers = rows as unknown as Career[];
  } catch (error) {
    console.error("CareersListing: failed to fetch careers", error);
  }

  return <CareersClient initialCareers={careers} />;
}
