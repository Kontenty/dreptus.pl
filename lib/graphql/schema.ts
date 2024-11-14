import { DateTimeTypeDefinition } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    ${DateTimeTypeDefinition}

    type wp_posts {
      ID: ID!
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
      meta_id: ID!
      post_id: ID!
      meta_key: String
      meta_value: String
    }

    type Query {
      hello: String
      trips(limit: Int): [wp_posts!]
      tripsCount: Int
      participantsCount: Int
    }
  `,
  resolvers,
});
