// Completely skip Prisma when DATABASE_URL is not set
// This prevents any Prisma-related crashes in demo mode

type PrismaClientType = {
  user: any;
  adAccount: any;
  campaign: any;
  [key: string]: any;
};

let prismaInstance: PrismaClientType | null = null;
let initialized = false;

function initPrisma(): PrismaClientType | null {
  if (initialized) return prismaInstance;
  initialized = true;

  if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL - running in demo mode without database");
    return null;
  }

  try {
    // Only require Prisma when we actually have a database URL
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    prismaInstance = new PrismaClient();
    return prismaInstance;
  } catch (error) {
    console.error("Failed to initialize Prisma:", error);
    return null;
  }
}

export const prisma = initPrisma();
export default prisma;
