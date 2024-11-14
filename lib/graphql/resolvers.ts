import { DateTimeResolver } from "graphql-scalars";
import { GraphQLContext } from "./context";

export const resolvers = {
  DateTime: DateTimeResolver,
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
  },
};
