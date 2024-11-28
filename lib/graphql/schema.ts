import { BigIntTypeDefinition, DateTimeTypeDefinition } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    ${BigIntTypeDefinition}
    ${DateTimeTypeDefinition}

    type WP_Post {
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

    type TripPreview {
      ID: BigInt!
      post_date: DateTime!
      post_title: String!
      post_name: String!
      thumb_id: Int
      thumb_url: String
    }

    type tripListItem {
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

    type ImageData {
      guid: String!
      post_title: String!
    }

    type TripDetails {
      ID: BigInt!
      post_title: String!
      post_content: String!
      author: String
      category_names: String
      category_slugs: String
      founding: String
      images_str: String
      images: [ImageData!]!
      lat: String
      length: String
      lng: String
      number: String
      pdf_images_str: String
      pdf: String
      pdfImages: [ImageData!]!
      pk: String
      thumb_url: String
      type: String
    }

    type location {
      name: String
      count: BigInt!
      slug: String
    }

    type TripWithParticipants {
      id: Int!
      trip_id: Int
      report_date: DateTime
      pptCount: BigInt
      post_title: String
      number: String
    }

    type Participant {
      id: Int
      name: String
      origin: String
    }

    type TripParticipant {
      id: Int
      participant_id: Int
      trip_id: Int
      answers: String
      report_date: DateTime
      participant: Participant
      trip: WP_Post
    }

    type Query {
      hello: String
      trips(limit: Int): [WP_Post!]
      tripsCount: Int
      participantsCount: Int
      tripShorts(limit: Int): [TripPreview!]
      tripsDetailsList(location: String): [tripListItem!]
      tripDetails(trip_name: String!): TripDetails
      page(id: Int!): WP_Post
      elementorPage(id: Int!): String
      locations: [location!]!
      tripsWithParticipants: [TripWithParticipants!]
      participantsOnTrip(id: Int!): [TripParticipant]
    }
  `,
  resolvers,
});
