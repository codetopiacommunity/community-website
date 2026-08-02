import { NextResponse } from "next/server";
import { verifyCertificate } from "@/lib/portal";

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);

  const code =
    typeof body === "object" &&
    body !== null &&
    "code" in body &&
    typeof body.code === "string"
      ? body.code.trim()
      : "";

  if (!code) {
    return NextResponse.json({ status: "not_found" }, { status: 200 });
  }

  try {
    const certificate = await verifyCertificate(code);
    if (!certificate) {
      return NextResponse.json({ status: "not_found" }, { status: 200 });
    }
    return NextResponse.json({ status: "found", certificate }, { status: 200 });
  } catch (error) {
    // Portal unreachable or misconfigured -- distinct from "not found" so the
    // page can tell a visitor "try again" instead of implying the code is
    // fake.
    console.error("Certificate verification error:", error);
    return NextResponse.json({ status: "error" }, { status: 200 });
  }
}
