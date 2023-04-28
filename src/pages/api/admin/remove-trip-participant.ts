import type { NextApiRequest, NextApiResponse } from "next";

import prismaClient from "src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (typeof id === "number") {
    try {
      await prismaClient.tripParticipant.delete({ where: { id } });

      return res.status(200).send("ok");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  return res.status(406);
}
