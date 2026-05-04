import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "DATABASE_URL is not set. Database features will be unavailable.",
  );
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  console.log("Initializing new PrismaClient instance...");
  // Hardened pool for flaky connections
  const pool = new Pool({
    connectionString: connectionString ?? "",
    connectionTimeoutMillis: 10000, // 10s timeout
    idleTimeoutMillis: 30000, // 30s idle before closing
    max: 10, // Max 10 connections
    ssl: {
      rejectUnauthorized: false, // Often needed for Neon in some environments
    },
  });
  // biome-ignore lint/suspicious/noExplicitAny: pg type mismatch overrides
  const adapter = new PrismaPg(pool as any);
  prisma = new PrismaClient({ adapter });
}

export { prisma };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
