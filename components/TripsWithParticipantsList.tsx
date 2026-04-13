"use client";
import { useRouter } from "next/navigation";
import { sectionTitles } from "@/lib/constants/tripSections";
import { formatDate, sortTrips } from "@/lib/utils";
import type { ParticipantOnTrip } from "@/types";
import PaginatedTable from "./PaginatedTable";

interface Props {
  trips: ParticipantOnTrip[];
}

interface TableRow {
  type: "section" | "trip";
  sectionIndex?: number;
  data: ParticipantOnTrip;
}

const organizeIntoSections = (trips: ParticipantOnTrip[]): TableRow[] => {
  const sections = [[], [], [], [], []] as ParticipantOnTrip[][];
  const sorted = [...trips].sort(sortTrips);

  for (const current of sorted) {
    const num = String(current.number || "");
    if (/^A[0-9]{2}/i.test(num)) {
      sections[0].push(current);
    } else if (/^B[0-9]{2}/i.test(num)) {
      sections[1].push(current);
    } else if (/^C[0-9]{2}/i.test(num)) {
      sections[2].push(current);
    } else if (/^[0-9]{3}/.test(num)) {
      sections[3].push(current);
    } else if (/^#[0-9]{2}/.test(num)) {
      sections[4].push(current);
    }
  }

  const result: TableRow[] = [];

  sections.forEach((sectionTrips, sectionIndex) => {
    if (sectionTrips.length > 0) {
      // Add section header
      result.push({
        type: "section",
        sectionIndex,
        data: {
          id: 100001 + sectionIndex,
          trip_id: 0,
          pptCount: null,
          number: "",
          report_date: new Date(),
          post_title: sectionTitles[sectionIndex],
        } as ParticipantOnTrip,
      });

      // Add section trips
      sectionTrips.forEach((trip) => {
        result.push({
          type: "trip",
          data: trip,
        });
      });
    }
  });

  return result;
};

const titleTmpl = (row: TableRow) =>
  row.data.post_title &&
  (row.type === "section" || sectionTitles.includes(row.data.post_title) ? (
    <span className="font-semibold text-lg">{row.data.post_title}</span>
  ) : (
    row.data.post_title.replace(/,? ?<br>/, ", ")
  ));

const TripsWithParticipantsList = ({ trips }: Readonly<Props>) => {
  const router = useRouter();

  // Organize data into sections
  const organizedData = organizeIntoSections(trips || []);

  const handleSelect = (row: TableRow) => {
    if (row.type === "trip" && row.data.trip_id) {
      router.push(`/participants/${row.data.trip_id}`);
    }
  };

  return (
    <PaginatedTable
      items={organizedData}
      keyExtractor={(row) => row.data.id}
      onRowClick={(row) =>
        row.type === "trip" ? handleSelect(row) : undefined
      }
      rowsPerPage={50}
      rowsPerPageOptions={[20, 50, 100, 200]}
      color="primary"
      selectionMode="single"
      columns={[
        {
          key: "number",
          label: "Numer",
          render: (row) => (row.type === "trip" ? row.data.number : ""),
        },
        {
          key: "title",
          label: "Nazwa Trasy",
          render: titleTmpl,
        },
        {
          key: "pptCount",
          label: "Liczba Uczestników",
          render: (row) =>
            row.type === "trip" ? Number(row.data.pptCount) || "" : "",
        },
        {
          key: "report_date",
          label: "Data Aktualizacji",
          render: (row) =>
            row.type === "trip" ? formatDate(row.data.report_date) : "",
        },
      ]}
    />
  );
};

export default TripsWithParticipantsList;
