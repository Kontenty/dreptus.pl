export const revalidate = 86400; // 24 hours

import { notFound } from "next/navigation";
import TripDetail from "@/components/TripDetail";
import { getTripBySlug, getTripsForMap } from "@/lib/db";
import type { TripDetails } from "@/types";

type Props = {
  params: Promise<{
    tripName: string;
  }>;
};

export default async function TripDetailsPage({ params }: Readonly<Props>) {
  const tripName = (await params).tripName;
  if (typeof tripName !== "string") return notFound();
  // Fetch main trip details
  const rawDetails = await getTripBySlug(tripName);
  if (!rawDetails) return notFound();
  const tripDetails: TripDetails = {
    id: Number(rawDetails.ID),
    ID: Number(rawDetails.ID),
    post_author: 0, // Default value since we don't have this from rawDetails
    post_date: "", // Default value since we don't have this from rawDetails
    post_date_gmt: "", // Default value since we don't have this from rawDetails
    post_content: rawDetails.post_content,
    post_title: rawDetails.post_title,
    post_excerpt: "", // Default value since we don't have this from rawDetails
    post_status: "publish", // Default value
    comment_status: "open", // Default value
    ping_status: "open", // Default value
    post_password: "", // Default value
    post_name: tripName, // Use the tripName as post_name
    post_modified: "", // Default value since we don't have this from rawDetails
    post_modified_gmt: "", // Default value since we don't have this from rawDetails
    post_parent: 0, // Default value
    guid: "", // Default value since we don't have this from rawDetails
    menu_order: 0, // Default value
    post_type: "post", // Default value
    post_mime_type: "", // Default value
    comment_count: 0, // Default value
    meta_value: undefined, // Default value
    thumb_id: undefined, // Default value
    thumb_url: undefined,
    number: rawDetails.number,
    author: rawDetails.author,
    length: rawDetails.length,
    pk: rawDetails.pk,
    lat: rawDetails.lat,
    lng: rawDetails.lng,
    founding: rawDetails.founding,
    type: rawDetails.type,
    images_str: rawDetails.images_str,
    images: rawDetails.images,
    pdf: rawDetails.pdf,
    pdf_images: rawDetails.pdf_images,
    pdfImages: rawDetails.pdfImages,
    slug: rawDetails.post_name,
    title: rawDetails.post_title,
    dolinaBugu: rawDetails.category_slugs?.includes("dolina-bugu") ?? false,
  };
  // Fetch list of all trips for sidebar
  const rawTrips = await getTripsForMap();
  const tripsList = rawTrips.map((t) => ({
    ID: Number(t.ID),
    slug: t.slug,
    title: t.title,
    thumb_url: t.thumb_url,
    category_names: t.category_names,
    lat: t.lat.toString(),
    lng: t.lng.toString(),
  }));

  return <TripDetail trip={tripDetails} tripsList={tripsList} />;
}
