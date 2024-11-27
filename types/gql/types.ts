export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: bigint; output: string; }
  DateTime: { input: string; output: string; }
}

export interface Participant {
  __typename?: 'Participant';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
}

export interface Query {
  __typename?: 'Query';
  elementorPage?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  locations: Array<Location>;
  page?: Maybe<Wp_Posts>;
  participantsCount?: Maybe<Scalars['Int']['output']>;
  participantsOnTrip?: Maybe<Array<Maybe<TripParticipant>>>;
  tripShorts?: Maybe<Array<TripShort>>;
  trips?: Maybe<Array<Wp_Posts>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
  tripsDetailList?: Maybe<Array<TripsDetail>>;
  tripsWithParticipants?: Maybe<Array<TripWithParticipants>>;
}


export interface QueryElementorPageArgs {
  id: Scalars['Int']['input'];
}


export interface QueryPageArgs {
  id: Scalars['Int']['input'];
}


export interface QueryParticipantsOnTripArgs {
  id: Scalars['Int']['input'];
}


export interface QueryTripShortsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryTripsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
}


export interface QueryTripsDetailListArgs {
  location?: InputMaybe<Scalars['String']['input']>;
}

export interface TripParticipant {
  __typename?: 'TripParticipant';
  answers?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  participant?: Maybe<Participant>;
  participant_id?: Maybe<Scalars['Int']['output']>;
  report_date?: Maybe<Scalars['DateTime']['output']>;
  trip?: Maybe<Wp_Posts>;
  trip_id?: Maybe<Scalars['Int']['output']>;
}

export interface TripWithParticipants {
  __typename?: 'TripWithParticipants';
  id: Scalars['Int']['output'];
  number?: Maybe<Scalars['String']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  pptCount?: Maybe<Scalars['BigInt']['output']>;
  report_date?: Maybe<Scalars['DateTime']['output']>;
  trip_id?: Maybe<Scalars['Int']['output']>;
}

export interface Location {
  __typename?: 'location';
  count: Scalars['BigInt']['output'];
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
}

export interface TripShort {
  __typename?: 'tripShort';
  ID: Scalars['BigInt']['output'];
  post_date: Scalars['DateTime']['output'];
  post_name: Scalars['String']['output'];
  post_title: Scalars['String']['output'];
  thumb_id?: Maybe<Scalars['Int']['output']>;
  thumb_url?: Maybe<Scalars['String']['output']>;
}

export interface TripsDetail {
  __typename?: 'tripsDetail';
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
}

export interface Wp_Postmeta {
  __typename?: 'wp_postmeta';
  meta_id: Scalars['Int']['output'];
  meta_key?: Maybe<Scalars['String']['output']>;
  meta_value?: Maybe<Scalars['String']['output']>;
  post_id: Scalars['Int']['output'];
}

export interface Wp_Posts {
  __typename?: 'wp_posts';
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
}
