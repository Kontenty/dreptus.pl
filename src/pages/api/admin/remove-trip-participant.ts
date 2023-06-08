import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import prismaClient from "src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role !== "admin") {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const id = Number(req.query.id);
  if (typeof id === "number") {
    try {
      const deleted = await prismaClient.tripParticipant.delete({
        where: { id },
      });

      await Promise.all([
        res.revalidate("/"),
        res.revalidate("/participants"),
        res.revalidate("/participants/" + deleted.trip_id),
      ]);

      res.status(200).send("ok");
      return;
    } catch (error) {
      res.status(500).send(error);
      return;
    }
  }
  return res.status(406);
}
