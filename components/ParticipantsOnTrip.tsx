"use client";
import { formatDate } from "@/lib/utils";
import PaginatedTable from "./PaginatedTable";

interface Props {
  participantsList: Array<{
    id: string | number;
    name: string;
    origin: string;
    report_date: string | Date;
    answers: string | number;
  }>;
}

const ParticipantsOnTrip = ({ participantsList }: Readonly<Props>) => {
  return (
    <PaginatedTable
      items={participantsList}
      keyExtractor={(item) => String(item.id)}
      rowsPerPage={50}
      columns={[
        {
          key: "index",
          label: "L.p.",
          render: (_, globalIndex) => globalIndex + 1,
        },
        { key: "name", label: "Imię i nazwisko" },
        { key: "origin", label: "Nazwa zespołu / miejscowość" },
        {
          key: "report_date",
          label: "Data zgłoszenia",
          render: (item) => formatDate(item.report_date),
        },
        { key: "answers", label: "Liczba odpowiedzi" },
      ]}
    />
  );
};

export default ParticipantsOnTrip;
