import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import {
  requireAuth,
  serverError,
  validateRequired,
} from "@/lib/api/api-utils";

function toSlug(username: string, awardName: string, period: string): string {
  const base = `${username}-${awardName}-${period}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${Date.now().toString(36)}`;
}

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;
  try {
    const items = await prisma.recognition.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Recognition Error:", error);
    return serverError("Failed to fetch recognitions");
  }
}

export async function POST(request: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const data = await request.json();
    const validationError = validateRequired(data, [
      "portalUsername",
      "category",
      "awardName",
      "period",
      "impactSummary",
    ]);
    if (validationError) return validationError;

    const username = String(data.portalUsername).trim();
    const awardName = String(data.awardName).trim();
    const period = String(data.period).trim();

    const item = await prisma.recognition.create({
      data: {
        slug: toSlug(username, awardName, period),
        portalUsername: username,
        category: String(data.category).trim(),
        awardName,
        period,
        impactSummary: String(data.impactSummary).trim(),
        roleLabel: data.roleLabel?.trim() || null,
        domain: data.domain?.trim() || null,
        achievements: Array.isArray(data.achievements)
          ? data.achievements.map((a: string) => a.trim()).filter(Boolean)
          : [],
        isPublished: data.isPublished ?? true,
        order: Number(data.order) || 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("POST Recognition Error:", error);
    return serverError("Failed to create recognition");
  }
}
