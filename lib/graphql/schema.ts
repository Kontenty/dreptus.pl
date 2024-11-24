import { BigIntTypeDefinition, DateTimeTypeDefinition } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    ${BigIntTypeDefinition}
    ${DateTimeTypeDefinition}

    type wp_posts {
      ID: Int!
      post_author: Int!
      post_date: DateTime!
      post_date_gmt: DateTime!
      post_content: String
      post_title: String!
      post_excerpt: String
      post_status: String!
      comment_status: String!
      ping_status: String!
      post_password: String
      post_name: String!
      to_ping: String!
      pinged: String!
      post_modified: DateTime!
      post_modified_gmt: DateTime!
      post_content_filtered: String!
      post_parent: Int!
      guid: String!
      menu_order: Int!
      post_type: String!
      post_mime_type: String!
      comment_count: Int!
      wp_postmeta: [wp_postmeta!]!
    }

    type wp_postmeta {
      meta_id: Int!
      post_id: Int!
      meta_key: String
      meta_value: String
    }

    type tripShort {
      ID: BigInt!
      post_date: DateTime!
      post_title: String!
      post_name: String!
      thumb_id: Int
      thumb_url: String
    }

    type tripsDetail {
      ID: BigInt!
      title: String!
      slug: String!
      length: String
      pk: String
      lat: String
      lng: String
      type: String
      number: String
      category_names: String
      category_slugs: String
      thumb_url: String
    }

    type location {
      name: String
      count: BigInt!
      slug: String
    }

    type Query {
      hello: String
      trips(limit: Int): [wp_posts!]
      tripsCount: Int
      participantsCount: Int
      tripShorts(limit: Int): [tripShort!]
      tripsDetailList(location: String): [tripsDetail!]
      page(id: Int!): wp_posts
      locations: [location!]!
    }
  `,
  resolvers,
});
