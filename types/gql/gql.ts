/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetBadgePages($rulesPageId: Int!, $scorersPageId: Int!) {\n    elementorPage(id: $rulesPageId)\n    page(id: $scorersPageId) {\n      post_content\n    }\n  }\n": types.GetBadgePagesDocument,
    "\n  query GetTripShorts($id: Int!, $limit: Int) {\n    tripShorts(limit: $limit) {\n      ID\n      post_name\n      post_title\n      thumb_url\n      post_date\n    }\n    page(id: $id) {\n      post_content\n    }\n  }\n": types.GetTripShortsDocument,
    "\n  query GetTrips($limit: Int) {\n    trips(limit: $limit) {\n      ID\n      post_name\n      post_date\n      post_title\n      wp_postmeta {\n        meta_value\n      }\n    }\n    tripsCount\n    participantsCount\n  }\n": types.GetTripsDocument,
    "\n  query GetParticipantsOnTrip($trip_id: Int!) {\n    participantsOnTrip(id: $trip_id) {\n      id\n      report_date\n      answers\n      participant {\n        name\n        origin\n      }\n      trip {\n        post_title\n      }\n    }\n  }\n": types.GetParticipantsOnTripDocument,
    "\n  query GetTripsWithParticipants {\n    tripsWithParticipants {\n      id\n      trip_id\n      report_date\n      pptCount\n      post_title\n      number\n    }\n  }\n": types.GetTripsWithParticipantsDocument,
    "\n  query GetTripDetailedList($location: String) {\n    tripsDetailList(location: $location) {\n      ID\n      title\n      slug\n      length\n      pk\n      lat\n      lng\n      type\n      number\n      category_names\n      category_slugs\n      thumb_url\n    }\n    locations {\n      name\n      count\n      slug\n    }\n    tripsCount\n  }\n": types.GetTripDetailedListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBadgePages($rulesPageId: Int!, $scorersPageId: Int!) {\n    elementorPage(id: $rulesPageId)\n    page(id: $scorersPageId) {\n      post_content\n    }\n  }\n"): (typeof documents)["\n  query GetBadgePages($rulesPageId: Int!, $scorersPageId: Int!) {\n    elementorPage(id: $rulesPageId)\n    page(id: $scorersPageId) {\n      post_content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTripShorts($id: Int!, $limit: Int) {\n    tripShorts(limit: $limit) {\n      ID\n      post_name\n      post_title\n      thumb_url\n      post_date\n    }\n    page(id: $id) {\n      post_content\n    }\n  }\n"): (typeof documents)["\n  query GetTripShorts($id: Int!, $limit: Int) {\n    tripShorts(limit: $limit) {\n      ID\n      post_name\n      post_title\n      thumb_url\n      post_date\n    }\n    page(id: $id) {\n      post_content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTrips($limit: Int) {\n    trips(limit: $limit) {\n      ID\n      post_name\n      post_date\n      post_title\n      wp_postmeta {\n        meta_value\n      }\n    }\n    tripsCount\n    participantsCount\n  }\n"): (typeof documents)["\n  query GetTrips($limit: Int) {\n    trips(limit: $limit) {\n      ID\n      post_name\n      post_date\n      post_title\n      wp_postmeta {\n        meta_value\n      }\n    }\n    tripsCount\n    participantsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetParticipantsOnTrip($trip_id: Int!) {\n    participantsOnTrip(id: $trip_id) {\n      id\n      report_date\n      answers\n      participant {\n        name\n        origin\n      }\n      trip {\n        post_title\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetParticipantsOnTrip($trip_id: Int!) {\n    participantsOnTrip(id: $trip_id) {\n      id\n      report_date\n      answers\n      participant {\n        name\n        origin\n      }\n      trip {\n        post_title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTripsWithParticipants {\n    tripsWithParticipants {\n      id\n      trip_id\n      report_date\n      pptCount\n      post_title\n      number\n    }\n  }\n"): (typeof documents)["\n  query GetTripsWithParticipants {\n    tripsWithParticipants {\n      id\n      trip_id\n      report_date\n      pptCount\n      post_title\n      number\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTripDetailedList($location: String) {\n    tripsDetailList(location: $location) {\n      ID\n      title\n      slug\n      length\n      pk\n      lat\n      lng\n      type\n      number\n      category_names\n      category_slugs\n      thumb_url\n    }\n    locations {\n      name\n      count\n      slug\n    }\n    tripsCount\n  }\n"): (typeof documents)["\n  query GetTripDetailedList($location: String) {\n    tripsDetailList(location: $location) {\n      ID\n      title\n      slug\n      length\n      pk\n      lat\n      lng\n      type\n      number\n      category_names\n      category_slugs\n      thumb_url\n    }\n    locations {\n      name\n      count\n      slug\n    }\n    tripsCount\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;