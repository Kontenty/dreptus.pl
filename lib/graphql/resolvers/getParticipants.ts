import { GraphQLContext } from "../context";

type TResponse = {
  id: number;
  trip_id: number;
  report_date: Date | null;
  pptCount: bigint | null;
  post_title: string;
  number: string;
}[];

const getTripsWithParticipants = (
  _parent: unknown,
  _args: unknown,
  { prisma }: GraphQLContext
) => {
  return prisma.$queryRaw<TResponse>`
  SELECT tp.id,  tp.trip_id, m.meta_value AS number, p.post_title, MAX(tp.report_date) as report_date, COUNT(tp.trip_id) as pptCount  FROM TripParticipant tp
  JOIN wp_posts p ON p.ID = tp.trip_id
  JOIN wp_postmeta m ON m.post_id = p.ID WHERE m.meta_key = '_cth_cus_field_zxr0feyjz'
  GROUP  BY tp.trip_id ORDER BY p.post_title;`;
};
const getParticipantById = (
  _parent: unknown,
  { id }: { id: number },
  { prisma }: GraphQLContext
) => {
  return prisma.tripParticipant.findMany({
    where: {
      trip_id: id,
    },
    include: {
      participant: true,
      trip: {
        select: {
          post_title: true,
        },
      },
    },
  });
};
/* const getParticipantSlugs = (
  _parent: unknown,
  _args: unknown,
  { prisma }: GraphQLContext
) => {
  return prisma.tripParticipant.groupBy({
    by: ["trip_id"],
  });
}; */

export const participantResolvers = {
  tripsWithParticipants: getTripsWithParticipants,
  // participantSlugs: getParticipantSlugs,
  participantsOnTrip: getParticipantById,
};
