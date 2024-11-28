/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: bigint; output: string; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type ImageData = {
  __typename?: 'ImageData';
  guid: Scalars['String']['output'];
  post_title: Scalars['String']['output'];
};

export type Participant = {
  __typename?: 'Participant';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  TripDetails?: Maybe<TripDetails>;
  elementorPage?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  locations: Array<Location>;
  page?: Maybe<Wp_Post>;
  participantsCount?: Maybe<Scalars['Int']['output']>;
  participantsOnTrip?: Maybe<Array<Maybe<TripParticipant>>>;
  tripShorts?: Maybe<Array<TripPreview>>;
  trips?: Maybe<Array<Wp_Post>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
  tripsDetailList?: Maybe<Array<TripListItem>>;
  tripsWithParticipants?: Maybe<Array<TripWithParticipants>>;
};


export type QueryTripDetailsArgs = {
  trip_name: Scalars['String']['input'];
};


export type QueryElementorPageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryParticipantsOnTripArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTripShortsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTripsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTripsDetailListArgs = {
  location?: InputMaybe<Scalars['String']['input']>;
};

export type TripDetails = {
  __typename?: 'TripDetails';
  ID: Scalars['BigInt']['output'];
  author?: Maybe<Scalars['String']['output']>;
  category_names?: Maybe<Scalars['String']['output']>;
  category_slugs?: Maybe<Scalars['String']['output']>;
  founding?: Maybe<Scalars['String']['output']>;
  images: Array<ImageData>;
  images_str?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['String']['output']>;
  lng?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  pdf?: Maybe<Scalars['String']['output']>;
  pdfImages: Array<ImageData>;
  pdf_images_str?: Maybe<Scalars['String']['output']>;
  pk?: Maybe<Scalars['String']['output']>;
  post_content: Scalars['String']['output'];
  post_title: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  thumb_url?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TripParticipant = {
  __typename?: 'TripParticipant';
  answers?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  participant?: Maybe<Participant>;
  participant_id?: Maybe<Scalars['Int']['output']>;
  report_date?: Maybe<Scalars['DateTime']['output']>;
  trip?: Maybe<Wp_Post>;
  trip_id?: Maybe<Scalars['Int']['output']>;
};

export type TripPreview = {
  __typename?: 'TripPreview';
  ID: Scalars['BigInt']['output'];
  post_date: Scalars['DateTime']['output'];
  post_name: Scalars['String']['output'];
  post_title: Scalars['String']['output'];
  thumb_id?: Maybe<Scalars['Int']['output']>;
  thumb_url?: Maybe<Scalars['String']['output']>;
};

export type TripWithParticipants = {
  __typename?: 'TripWithParticipants';
  id: Scalars['Int']['output'];
  number?: Maybe<Scalars['String']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  pptCount?: Maybe<Scalars['BigInt']['output']>;
  report_date?: Maybe<Scalars['DateTime']['output']>;
  trip_id?: Maybe<Scalars['Int']['output']>;
};

export type Wp_Post = {
  __typename?: 'WP_Post';
  ID: Scalars['Int']['output'];
  comment_count: Scalars['Int']['output'];
  comment_status: Scalars['String']['output'];
  guid: Scalars['String']['output'];
  menu_order: Scalars['Int']['output'];
  ping_status: Scalars['String']['output'];
  pinged: Scalars['String']['output'];
  post_author: Scalars['Int']['output'];
  post_content?: Maybe<Scalars['String']['output']>;
  post_content_filtered: Scalars['String']['output'];
  post_date: Scalars['DateTime']['output'];
  post_date_gmt: Scalars['DateTime']['output'];
  post_excerpt?: Maybe<Scalars['String']['output']>;
  post_mime_type: Scalars['String']['output'];
  post_modified: Scalars['DateTime']['output'];
  post_modified_gmt: Scalars['DateTime']['output'];
  post_name: Scalars['String']['output'];
  post_parent: Scalars['Int']['output'];
  post_password?: Maybe<Scalars['String']['output']>;
  post_status: Scalars['String']['output'];
  post_title: Scalars['String']['output'];
  post_type: Scalars['String']['output'];
  to_ping: Scalars['String']['output'];
  wp_postmeta: Array<Wp_Postmeta>;
};

export type Location = {
  __typename?: 'location';
  count: Scalars['BigInt']['output'];
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type TripListItem = {
  __typename?: 'tripListItem';
  ID: Scalars['BigInt']['output'];
  category_names?: Maybe<Scalars['String']['output']>;
  category_slugs?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['String']['output']>;
  lng?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  pk?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  thumb_url?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type Wp_Postmeta = {
  __typename?: 'wp_postmeta';
  meta_id: Scalars['Int']['output'];
  meta_key?: Maybe<Scalars['String']['output']>;
  meta_value?: Maybe<Scalars['String']['output']>;
  post_id: Scalars['Int']['output'];
};

export type GetBadgePagesQueryVariables = Exact<{
  rulesPageId: Scalars['Int']['input'];
  scorersPageId: Scalars['Int']['input'];
}>;


export type GetBadgePagesQuery = { __typename?: 'Query', elementorPage?: string | null, page?: { __typename?: 'WP_Post', post_content?: string | null } | null };

export type GetTripShortsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTripShortsQuery = { __typename?: 'Query', tripShorts?: Array<{ __typename?: 'TripPreview', ID: string, post_name: string, post_title: string, thumb_url?: string | null, post_date: string }> | null, page?: { __typename?: 'WP_Post', post_content?: string | null } | null };

export type GetTripsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTripsQuery = { __typename?: 'Query', tripsCount?: number | null, participantsCount?: number | null, trips?: Array<{ __typename?: 'WP_Post', ID: number, post_name: string, post_date: string, post_title: string, wp_postmeta: Array<{ __typename?: 'wp_postmeta', meta_value?: string | null }> }> | null };

export type GetParticipantsOnTripQueryVariables = Exact<{
  trip_id: Scalars['Int']['input'];
}>;


export type GetParticipantsOnTripQuery = { __typename?: 'Query', participantsOnTrip?: Array<{ __typename?: 'TripParticipant', id?: number | null, report_date?: string | null, answers?: string | null, participant?: { __typename?: 'Participant', name?: string | null, origin?: string | null } | null, trip?: { __typename?: 'WP_Post', post_title: string } | null } | null> | null };

export type GetTripsWithParticipantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTripsWithParticipantsQuery = { __typename?: 'Query', tripsWithParticipants?: Array<{ __typename?: 'TripWithParticipants', id: number, trip_id?: number | null, report_date?: string | null, pptCount?: string | null, post_title?: string | null, number?: string | null }> | null };

export type GetTripsPageDataQueryVariables = Exact<{
  location?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTripsPageDataQuery = { __typename?: 'Query', tripsCount?: number | null, tripsDetailList?: Array<{ __typename?: 'tripListItem', ID: string, title: string, slug: string, length?: string | null, pk?: string | null, lat?: string | null, lng?: string | null, type?: string | null, number?: string | null, category_names?: string | null, category_slugs?: string | null, thumb_url?: string | null }> | null, locations: Array<{ __typename?: 'location', name?: string | null, count: string, slug?: string | null }> };


export const GetBadgePagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadgePages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rulesPageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorersPageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementorPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rulesPageId"}}}]},{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorersPageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_content"}}]}}]}}]} as unknown as DocumentNode<GetBadgePagesQuery, GetBadgePagesQueryVariables>;
export const GetTripShortsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripShorts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripShorts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"post_name"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_url"}},{"kind":"Field","name":{"kind":"Name","value":"post_date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_content"}}]}}]}}]} as unknown as DocumentNode<GetTripShortsQuery, GetTripShortsQueryVariables>;
export const GetTripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"post_name"}},{"kind":"Field","name":{"kind":"Name","value":"post_date"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"wp_postmeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta_value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tripsCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}}]}}]} as unknown as DocumentNode<GetTripsQuery, GetTripsQueryVariables>;
export const GetParticipantsOnTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetParticipantsOnTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trip_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participantsOnTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trip_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"report_date"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"participant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trip"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_title"}}]}}]}}]}}]} as unknown as DocumentNode<GetParticipantsOnTripQuery, GetParticipantsOnTripQueryVariables>;
export const GetTripsWithParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripsWithParticipants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripsWithParticipants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trip_id"}},{"kind":"Field","name":{"kind":"Name","value":"report_date"}},{"kind":"Field","name":{"kind":"Name","value":"pptCount"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<GetTripsWithParticipantsQuery, GetTripsWithParticipantsQueryVariables>;
export const GetTripsPageDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripsPageData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripsDetailList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"pk"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"category_names"}},{"kind":"Field","name":{"kind":"Name","value":"category_slugs"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tripsCount"}}]}}]} as unknown as DocumentNode<GetTripsPageDataQuery, GetTripsPageDataQueryVariables>;