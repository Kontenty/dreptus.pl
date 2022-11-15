// import Link from "next/link";
import { GetStaticProps } from "next";
import LocationsList from "components/LocationsList";
import { getLocations } from "lib/db";
// import Map from "components/map/at-gmap-api";

export const getStaticProps: GetStaticProps = async () => {
  const trips = await getLocations();
  return {
    props: { trips: trips ? JSON.parse(JSON.stringify(trips)) : [] }, // will be passed to the page component as props
  };
};

interface Props {
  trips: { name: string; count: number; slug: string }[];
}

export default function Trips({ trips }: Props) {
  return (
    <div className="flex gap-6 w-[1100px] mx-auto py-4">
      <LocationsList list={trips} />
      <div className="flex-1 flex-grow w-10 bg-red-400">1</div>
    </div>
  );
}
