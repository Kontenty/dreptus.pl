import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import prismaClient from "src/lib/prisma";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("Pole jest wymagane"),
  origin: Yup.string().required("Pole jest wymagane"),
  answers: Yup.string().required("Pole jest wymagane"),
  tripId: Yup.number().required("Pole jest wymagane"),
  date: Yup.string().required("Pole jest wymagane"),
});

type Body = {
  name: string;
  origin: string;
  tripId: number;
  date: string;
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
    const user =
      (await prismaClient.participant.findFirst({
        where: { name, origin },
      })) ??
      (await prismaClient.participant.create({
        data: {
          name,
          origin,
        },
      }));
    const newPptOnTrip = await prismaClient.tripParticipant.create({
      data: {
        participant_id: user.id,
        report_date: body.date,
        trip_id: body.tripId,
        answers: body.answers,
      },
    });
    await Promise.all([
      res.revalidate("/"),
      res.revalidate("/participants"),
      res.revalidate("/participants/" + newPptOnTrip.trip_id),
    ]);

    return res.status(200).send(newPptOnTrip);
  } catch (error) {
    return res.status(400).send(error);
  }
}
