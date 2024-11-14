import { PrismaClient } from "@prisma/client";

class PrismaInstance {
  private static _prisma: PrismaClient;
  private constructor() {}

  static get prisma() {
    if (!this._prisma) {
      this._prisma = new PrismaClient();
    }
    return this._prisma;
  }
}

export const prisma = PrismaInstance.prisma;
