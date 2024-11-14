import type { NextApiRequest, NextApiResponse } from "next";

import prismaClient from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (typeof id === "number") {
    try {
      const data = await prismaClient.wp_posts.findUnique({
        include: {
          trip_participant: {
            include: { participant: true },
          },
        },
        where: { ID: id },
      });
      const tripParticipants = {
        name: data?.post_title.replace("<br>", " ").replaceAll("  ", ""),
        participants: data?.trip_participant.map((tp) => ({
          ...tp,
          name: tp.participant.name,
          origin: tp.participant.origin,
        })),
      };

      return res.status(200).send(tripParticipants);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  return res.status(404);
}
