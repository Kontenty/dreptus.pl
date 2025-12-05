"use client";
import { useRouter } from "next/navigation";
import { getIcon } from "@/lib/utils";
import type { TripFormMap } from "@/types";
import PaginatedTable from "./PaginatedTable";

type Props = {
  trips: TripFormMap[];
};

const TripsList = ({ trips }: Props) => {
  const router = useRouter();

  const handleTripSelect = (trip: TripFormMap) => {
    router.push(`/trips/${trip.slug}`);
  };

  return (
    <PaginatedTable
      items={trips}
      keyExtractor={(trip) => trip.ID}
      header="Lista tras"
      onRowClick={handleTripSelect}
      selectionMode="single"
      color="primary"
      rowsPerPage={50}
      rowsPerPageOptions={[20, 50, 100, 200]}
      columns={[
        {
          key: "number",
          label: "Numer",
          render: (trip) => (
            <div className="flex flex-col items-center">
              {trip.number} {getIcon(trip?.type, { height: 30 })}
            </div>
          ),
        },
        {
          key: "title",
          label: "Tytuł",
          render: (trip) => (
            <span
              className="text-teal-900 font-semibold"
              dangerouslySetInnerHTML={{ __html: trip.title }}
            />
          ),
        },
        { key: "locations", label: "Lokalizacja" },
        { key: "pk", label: "PK" },
        { key: "length", label: "Długość" },
      ]}
    />
  );
};

export default TripsList;
