import { BigIntResolver, DateTimeResolver } from "graphql-scalars";
import { GraphQLContext } from "@/lib/graphql/context";
import { PostResponse } from "@/types";
import { getTripDetailList } from "./getTripDetailList";
import { participantResolvers } from "./getParticipants";

export const resolvers = {
  DateTime: DateTimeResolver,
  BigInt: BigIntResolver,
  Query: {
    hello: () => "Hello World!",
    trips: (
      _parent: unknown,
      args: { limit: number },
      { prisma }: GraphQLContext
    ) =>
      prisma.wp_posts.findMany({
        where: { post_type: "listing", post_status: "publish" },
        select: {
          ID: true,
          post_date: true,
          post_title: true,
          post_name: true,
          wp_postmeta: {
            where: { meta_key: "_cth_cus_field_zxr0feyjz" },
            select: { meta_value: true },
          },
        },
        orderBy: { post_date: "desc" },
        take: args.limit,
      }),
    tripsCount: (
      _parent: unknown,
      _args: unknown,
      { prisma }: GraphQLContext
    ) =>
      prisma.wp_posts.count({
        where: { post_type: "listing", post_status: "publish" },
      }),
    participantsCount: (
      _parent: unknown,
      _args: unknown,
      { prisma }: GraphQLContext
    ) => prisma.participant.count(),
    tripShorts: (
      _parent: unknown,
      { limit = 6 }: { limit: number },
      { prisma }: GraphQLContext
    ) =>
      prisma.$queryRaw<
        PostResponse[]
      >`SELECT p.ID, p.post_title, p.post_name, p.post_date, pm.meta_value as 'thumb_id', (SELECT p2.guid  FROM wp_posts p2 WHERE p2.ID=pm.meta_value) 'thumb_url' FROM wp_posts p JOIN wp_postmeta pm ON pm.post_id = p.ID WHERE pm.meta_key = '_thumbnail_id' AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT ${limit}`,
    page: (
      _parent: unknown,
      { id }: { id: number },
      { prisma }: GraphQLContext
    ) => prisma.wp_posts.findUnique({ where: { ID: id } }),
    locations: (_parent: unknown, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.$queryRaw<
        { name: string; count: number; slug: string }[]
      >`SELECT a.name, b.count, a.slug from wp_term_taxonomy b LEFT JOIN wp_terms a ON a.term_id = b.term_id WHERE b.taxonomy like "%listing_location%" ORDER BY b.count DESC;`,
    tripsDetailList: getTripDetailList,
    ...participantResolvers,
  },
};
