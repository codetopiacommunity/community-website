import { NextResponse } from "next/server";
import { serverError } from "@/lib/api/api-utils";
import { getTeamData } from "@/lib/team";

export async function GET() {
  try {
    const data = await getTeamData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET public Team Error:", error);
    return serverError("Failed to fetch team members");
  }
}
