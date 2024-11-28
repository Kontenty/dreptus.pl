import TripDetail from "@/components/TripDetail";
import { GoogleProvider } from "@/lib/context";
import { graphql, ssrClient } from "@/lib/graphql/urqlClient";
import { notFound } from "next/navigation";

const query = graphql(`
  query GetTripData($trip_name: String!) {
    tripDetails(trip_name: $trip_name) {
      ID
      author
      post_title
      post_content
      category_names
      category_slugs
      founding
      images_str
      images {
        guid
        post_title
      }
      lat
      lng
      length
      number
      pdf_images_str
      pdf
      pdfImages {
        guid
        post_title
      }
      pk
      thumb_url
      type
    }
    tripsDetailsList {
      ID
      category_names
      lat
      lng
      slug
      thumb_url
      title
    }
  }
`);

type Props = {
  params: Promise<{
    tripName: string;
  }>;
};

export default async function TripDetailsPage({ params }: Readonly<Props>) {
  const tripName = (await params).tripName;

  if (typeof tripName !== "string") notFound();

  const { data } = await ssrClient.query(query, {
    trip_name: tripName ?? "",
  });

  const tripDetails = data?.tripDetails;

  // if (!tripDetails) return notFound();

  return (
    <GoogleProvider>
      {tripDetails ? (
        <TripDetail
          trip={tripDetails}
          tripsList={data?.tripsDetailsList ?? []}
        />
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </GoogleProvider>
  );
}
