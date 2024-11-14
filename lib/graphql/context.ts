import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";

export type GraphQLContext = {
  prisma: PrismaClient;
};

export async function createYogaContext(): Promise<GraphQLContext> {
  return { prisma };
}
