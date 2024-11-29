import { TripListItem } from "./gql/graphql";

export type GoogleMapsT = typeof google.maps;

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
  thumb_url: string;
}

export interface TripDetails extends Post {
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
  position: google.maps.LatLngLiteral;
}

export interface TripFormMap extends TripListItem {
  locations?: string;
  dolinaBugu: boolean;
  position: google.maps.LatLngLiteral;
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
  thumb_url: string;
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

export type ParticipantOnTrip = {
  id: number;
  trip_id: number;
  report_date: Date | null;
  pptCount: bigint | null;
  post_title: string;
  number: string;
};
