import { PrismaClient } from "@prisma/client";
import { log } from "@repo/logger";

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export async function testConnections() {
  try {
    await prisma.$connect();
    log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Connection error:", error);
  }
}
