import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const participants = await prisma.participant.findMany();

    return res.status(200).send(participants);
  } catch (error) {
    return res.status(500).send(error);
  }
}
