import type { TripParticipant } from "@prisma/client";

export interface Post {
  ID: number;
  post_author: number;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  post_modified: string;
  post_modified_gmt: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  meta_value?: string | number;
  thumb_id?: number;
  thumb_url?: string;
  number: string;
}
export interface PostResponse {
  ID: number;
  post_author: number;
  post_date: Date;
  post_date_gmt: Date;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  post_modified: string;
  post_modified_gmt: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  meta_value?: string | number;
  thumb_id: number;
  thumb_url?: string;
}

export interface TripListResponse
  extends Pick<Post, "ID" | "post_title" | "post_name" | "post_date"> {
  number: string;
}

export interface TripDetails extends Post {
  id: number;
  ID: number;
  images_str: string;
  images: { guid: string; post_title: string }[];
  pdf: string;
  pdf_images: string;
  pdfImages: { guid: string; post_title: string }[];
  author: string;
  length: string;
  pk: string;
  lat: string;
  lng: string;
  founding: string;
  type: string;
  number: string;
  title: string;
  slug: string;
  category_slugs?: string;
  dolinaBugu: boolean;
}

export interface TripFormMap extends TripListItem {
  id: number;
  ID: number;
  locations?: string;
  dolinaBugu: boolean;
  lat: string;
  lng: string;
  type: string;
  number: string;
  category_names?: string;
  category_slugs?: string;
}

export interface TripsForMapResponse {
  ID: number;
  title: string;
  slug: string;
  length: string;
  pk: string;
  lat: number;
  lng: number;
  type: string;
  number: string;
  category_names: string;
  category_slugs: string;
  thumb_url?: string;
}

export type ElementorElement = {
  id: string;
  elType: string;
  settings: {
    title: string;
    editor: string;
    align: string;
    title_color: string;
    _margin: {
      unit: string;
      top: string;
      right: string;
      bottom: string;
      left: string;
      isLinked: boolean;
    };
  };
  elements: ElementorElement[];
  widgetType: string;
};

export type ElementorData = {
  id: string;
  elements: ElementorElement[];
}[];

// GraphQL-compatible types for migration
export interface TripListItem {
  slug: string;
  thumb_url?: string;
  title: string;
}

export interface Location {
  name: string;
  slug: string;
  count: string;
}

export type ParticipantOnTrip = Omit<
  Pick<TripParticipant, "id" | "trip_id" | "report_date">,
  "trip_id"
> & {
  trip_id: number;
  pptCount: number | null;
  post_title: string;
  number: string;
};
