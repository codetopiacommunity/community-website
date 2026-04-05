import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { getSession } from "@/lib/auth";

/**
 * DELETE: Remove an admin account (cannot remove yourself)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const adminId = Number(id);

  const target = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!target)
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  if (target.email === session.email) {
    return NextResponse.json(
      { error: "You cannot remove your own account" },
      { status: 400 },
    );
  }

  // Prevent removing the last admin
  const count = await prisma.admin.count();
  if (count <= 1) {
    return NextResponse.json(
      { error: "Cannot remove the last admin account" },
      { status: 400 },
    );
  }

  await prisma.admin.delete({ where: { id: adminId } });
  return NextResponse.json({ success: true });
}
