import { PrismaClient } from "@prisma/client";

class PrismaInstance {
  private static _prisma: PrismaClient;
  private constructor() {}

  static get prisma() {
    if (!PrismaInstance._prisma) {
      PrismaInstance._prisma = new PrismaClient();
    }
    return PrismaInstance._prisma;
  }
}

export const prisma = PrismaInstance.prisma;
