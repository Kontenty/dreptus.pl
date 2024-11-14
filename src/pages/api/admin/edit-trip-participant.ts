import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import prismaClient from "@/lib/prisma";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required(),
  origin: Yup.string().required(),
  answers: Yup.string().required(),
  id: Yup.number().required(),
  participant_id: Yup.number().required(),
  report_date: Yup.date().required(),
});

type Body = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  report_date: string;
  answers: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role !== "admin") {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(406).send("Inapriopriate data");
  }

  try {
    const body = req.body as Body;
    const { name, origin } = body;
    const user = await prismaClient.participant.findUnique({
      where: { id: body.participant_id },
    });
    if (user?.name !== name || user.origin !== origin) {
      await prismaClient.participant.update({
        where: {
          id: body.participant_id,
        },
        data: {
          name,
          origin,
        },
      });
    }
    const updatedPptOnTrip = await prismaClient.tripParticipant.update({
      where: {
        id: body.id,
      },
      data: {
        report_date: body.report_date,
        answers: body.answers,
      },
    });

    return res.status(200).send(updatedPptOnTrip);
  } catch (error) {
    return res.status(400).send(error);
  }
}
