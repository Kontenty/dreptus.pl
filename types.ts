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
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  meta_value?: string | number;
  thumb_id?: number;
  thumb_url?: string;
}

export interface Trip extends Post {
  images: { url: string; title: string }[];
  pdf: string;
  pdf_images: string;
  pdfImages: { url: string; title: string }[];
  author: string;
  length: string;
  pk: string;
  lat: string;
  lon: string;
  founding: string;
  type: string;
  number: string;
}

export interface TripFormMap extends TripsForMapResponse {
  locations: string[];
  dolinaBugu: boolean;
}

export interface TripsForMapResponse {
  ID: number;
  title: string;
  slug: string;
  length: string;
  pk: string;
  lat: number;
  lon: number;
  type: string;
  number: string;
  category_names: string;
  category_slugs: string;
}
