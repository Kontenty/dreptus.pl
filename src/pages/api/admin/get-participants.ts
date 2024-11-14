import type { NextApiRequest, NextApiResponse } from "next";

import prismaClient from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const participants = await prismaClient.participant.findMany();

    return res.status(200).send(participants);
  } catch (error) {
    return res.status(500).send(error);
  }
}
