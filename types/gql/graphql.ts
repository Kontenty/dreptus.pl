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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type GetTripsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTripsQuery = { __typename?: 'Query', tripsCount?: number | null, participantsCount?: number | null, trips?: Array<{ __typename?: 'wp_posts', ID: string, post_name: string, post_date: string, post_title: string, wp_postmeta: Array<{ __typename?: 'wp_postmeta', meta_value?: string | null }> }> | null };


export const GetTripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"post_name"}},{"kind":"Field","name":{"kind":"Name","value":"post_date"}},{"kind":"Field","name":{"kind":"Name","value":"post_title"}},{"kind":"Field","name":{"kind":"Name","value":"wp_postmeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta_value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tripsCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}}]}}]} as unknown as DocumentNode<GetTripsQuery, GetTripsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  participantsCount?: Maybe<Scalars['Int']['output']>;
  trips?: Maybe<Array<Wp_Posts>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryTripsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Wp_Postmeta = {
  __typename?: 'wp_postmeta';
  meta_id: Scalars['ID']['output'];
  meta_key?: Maybe<Scalars['String']['output']>;
  meta_value?: Maybe<Scalars['String']['output']>;
  post_id: Scalars['ID']['output'];
};

export type Wp_Posts = {
  __typename?: 'wp_posts';
  ID: Scalars['ID']['output'];
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
