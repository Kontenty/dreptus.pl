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

export type GetBadgePagesQueryVariables = Exact<{
  rulesPageId: Scalars['Int']['input'];
  scorersPageId: Scalars['Int']['input'];
}>;


export type GetBadgePagesQuery = { __typename?: 'Query', elementorPage?: string | null, page?: { __typename?: 'wp_posts', post_content?: string | null } | null };

export type GetTripShortsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTripShortsQuery = { __typename?: 'Query', tripShorts?: Array<{ __typename?: 'tripShort', ID: string, post_name: string, post_title: string, thumb_url?: string | null, post_date: string }> | null, page?: { __typename?: 'wp_posts', post_content?: string | null } | null };

export type GetTripsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTripsQuery = { __typename?: 'Query', tripsCount?: number | null, participantsCount?: number | null, trips?: Array<{ __typename?: 'wp_posts', ID: number, post_name: string, post_date: string, post_title: string, wp_postmeta: Array<{ __typename?: 'wp_postmeta', meta_value?: string | null }> }> | null };

export type GetParticipantsOnTripQueryVariables = Exact<{
  trip_id: Scalars['Int']['input'];
}>;


export type GetParticipantsOnTripQuery = { __typename?: 'Query', participantsOnTrip?: Array<{ __typename?: 'TripParticipant', id?: number | null, report_date?: string | null, answers?: string | null, participant?: { __typename?: 'Participant', name?: string | null, origin?: string | null } | null, trip?: { __typename?: 'wp_posts', post_title: string } | null } | null> | null };

export type GetTripsWithParticipantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTripsWithParticipantsQuery = { __typename?: 'Query', tripsWithParticipants?: Array<{ __typename?: 'TripWithParticipants', id: number, trip_id?: number | null, report_date?: string | null, pptCount?: string | null, post_title?: string | null, number?: string | null }> | null };

export type GetTripDetailedListQueryVariables = Exact<{
  location?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTripDetailedListQuery = { __typename?: 'Query', tripsCount?: number | null, tripsDetailList?: Array<{ __typename?: 'tripsDetail', ID: string, title: string, slug: string, length?: string | null, pk?: string | null, lat?: string | null, lng?: string | null, type?: string | null, number?: string | null, category_names?: string | null, category_slugs?: string | null, thumb_url?: string | null }> | null, locations: Array<{ __typename?: 'location', name?: string | null, count: string, slug?: string | null }> };


export const GetBadgePagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadgePages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rulesPageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scorersPageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementorPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rulesPageId"}}}]},{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scorersPageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_content"}}]}}]}}]} as unknown as DocumentNode<GetBadgePagesQuery, GetBadgePagesQueryVariables>;
export const GetTripShortsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripShorts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripShorts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"post_name"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_url"}},{"kind":"Field","name":{"kind":"Name","value":"post_date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_content"}}]}}]}}]} as unknown as DocumentNode<GetTripShortsQuery, GetTripShortsQueryVariables>;
export const GetTripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"post_name"}},{"kind":"Field","name":{"kind":"Name","value":"post_date"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"wp_postmeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta_value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tripsCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}}]}}]} as unknown as DocumentNode<GetTripsQuery, GetTripsQueryVariables>;
export const GetParticipantsOnTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetParticipantsOnTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trip_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participantsOnTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trip_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"report_date"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"participant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trip"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_title"}}]}}]}}]}}]} as unknown as DocumentNode<GetParticipantsOnTripQuery, GetParticipantsOnTripQueryVariables>;
export const GetTripsWithParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripsWithParticipants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripsWithParticipants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trip_id"}},{"kind":"Field","name":{"kind":"Name","value":"report_date"}},{"kind":"Field","name":{"kind":"Name","value":"pptCount"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<GetTripsWithParticipantsQuery, GetTripsWithParticipantsQueryVariables>;
export const GetTripDetailedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTripDetailedList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripsDetailList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"pk"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"category_names"}},{"kind":"Field","name":{"kind":"Name","value":"category_slugs"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tripsCount"}}]}}]} as unknown as DocumentNode<GetTripDetailedListQuery, GetTripDetailedListQueryVariables>;