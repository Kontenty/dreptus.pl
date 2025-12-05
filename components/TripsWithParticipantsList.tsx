"use client";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import type { ParticipantOnTrip } from "@/types";
import PaginatedTable from "./PaginatedTable";

interface Props {
  trips: ParticipantOnTrip[];
}

const titleTmpl = (row: ParticipantOnTrip) =>
  row.post_title &&
  (/^Z Dreptusiem/i.test(row.post_title) ? (
    <span className="font-bold text-lg">{row.post_title}</span>
  ) : (
    row.post_title.replace(/,? ?<br>/, ", ")
  ));

const TripsWithParticipantsList = ({ trips }: Readonly<Props>) => {
  const router = useRouter();

  const handleSelect = (trip: ParticipantOnTrip) => {
    if (trip.trip_id) {
      router.push(`/participants/${trip.trip_id}`);
    }
  };

  return (
    <PaginatedTable
      items={trips ?? []}
      keyExtractor={(trip) => trip.id}
      onRowClick={handleSelect}
      rowsPerPage={50}
      rowsPerPageOptions={[20, 50, 100, 200]}
      columns={[
        { key: "number", label: "Numer" },
        {
          key: "title",
          label: "Nazwa Trasy",
          render: titleTmpl,
        },
        {
          key: "pptCount",
          label: "Liczba Uczestników",
          render: (trip) => Number(trip.pptCount) || "",
        },
        {
          key: "report_date",
          label: "Data Aktualizacji",
          render: (trip) => formatDate(trip.report_date),
        },
      ]}
    />
  );
};

export default TripsWithParticipantsList;
