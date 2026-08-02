/**
 * One-time export of the local Recognition table for the move into portal-core.
 *
 * Wall of Impact entries are keyed here by a loose `portalUsername` string.
 * portal-core's importer resolves each one to a real user FK, so this export
 * should be taken and imported in the same sitting — a member renaming
 * themselves in between turns a matched row into a manual fix.
 *
 *   DATABASE_URL=... node scripts/export-recognitions.mjs > recognitions.json
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
  const recognitions = await prisma.recognition.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  // stdout carries the payload, stderr the human-readable count, so the
  // command stays pipe-safe.
  console.error(`Exported ${recognitions.length} recognition(s).`);
  process.stdout.write(`${JSON.stringify(recognitions, null, 2)}\n`);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
