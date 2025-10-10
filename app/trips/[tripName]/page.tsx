import TripDetail from "@/components/TripDetail";
import { GoogleProvider } from "@/lib/context";
import { getTripBySlug, getTripsForMap } from "@/lib/db";
import { notFound } from "next/navigation";

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
  // Convert raw details to GraphQL TripDetails shape
  const tripDetails = {
    ID: rawDetails.ID.toString(),
    author: rawDetails.author,
    post_title: rawDetails.post_title,
    post_content: rawDetails.post_content,
    category_names: null,
    category_slugs: null,
    founding: rawDetails.founding,
    images_str: rawDetails.images_str,
    lat: rawDetails.lat,
    lng: rawDetails.lng,
    length: rawDetails.length,
    number: rawDetails.number,
    pdf_images_str: rawDetails.pdf_images,
    pdf: rawDetails.pdf,
    images: rawDetails.images,
    pdfImages: rawDetails.pdfImages,
    pk: rawDetails.pk,
    thumb_url: null,
    type: rawDetails.type,
  };
  // Fetch list of all trips for sidebar
  const rawTrips = await getTripsForMap();
  const tripsList = rawTrips.map((t) => ({
    ID: t.ID.toString(),
    slug: t.slug,
    title: t.title,
    thumb_url: t.thumb_url,
    category_names: t.category_names,
    lat: t.lat.toString(),
    lng: t.lng.toString(),
  }));

  return (
    <GoogleProvider>
      <TripDetail trip={tripDetails} tripsList={tripsList} />
    </GoogleProvider>
  );
}
