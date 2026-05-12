import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { serverError } from "@/lib/api/api-utils";

/**
 * GET: List all open career opportunities
 */
export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      where: {
        status: "open",
        expiryDate: {
          gt: new Date(),
        },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("GET Careers Public Error:", error);
    return serverError("Failed to fetch opportunities");
  }
}
