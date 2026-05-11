import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

function parseDatabaseUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ""),
  };
}

class PrismaInstance {
  private static _prisma: PrismaClient;
  private constructor() {}

  static get prisma() {
    if (!PrismaInstance._prisma) {
      const dbUrl = process.env.DATABASE_CON_URL;
      if (!dbUrl) {
        throw new Error("DATABASE_CON_URL environment variable is not set");
      }
      const adapter = new PrismaMariaDb(parseDatabaseUrl(dbUrl));
      PrismaInstance._prisma = new PrismaClient({ adapter });
    }
    return PrismaInstance._prisma;
  }
}

export const prisma = PrismaInstance.prisma;
