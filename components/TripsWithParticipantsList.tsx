"use client";
import { TripWithParticipants } from "@/types/gql/types";
import { useRouter } from "next/navigation";
import { Column } from "primereact/column";
import {
  DataTable,
  type DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { formatDate } from "@/lib/utils";

const titleTmpl = (row: TripWithParticipants) =>
  row.post_title &&
  (/^Z Dreptusiem/i.test(row.post_title) ? (
    <span className="font-bold text-lg">{row.post_title}</span>
  ) : (
    row.post_title.replace(/,? ?<br>/, ", ")
  ));

interface Props {
  trips: TripWithParticipants[];
}

const TripsWithParticipantsList = ({ trips }: Readonly<Props>) => {
  const router = useRouter();

  const handleSelect = (
    ev: DataTableSelectionSingleChangeEvent<TripWithParticipants[]>
  ) => {
    const value = ev.value;
    if (value.trip_id) {
      setTimeout(() => {
        router.push(`/participants/${value.trip_id}`);
      }, 300);
    }
  };
  return (
    <DataTable
      className="min-w-[450px]"
      currentPageReportTemplate="{first} do {last} z {totalRecords}"
      dataKey="id"
      onSelectionChange={handleSelect}
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      rows={50}
      rowsPerPageOptions={[20, 50, 100, 200]}
      selectionMode="single"
      // size={isMd ? "normal" : "small"}
      value={trips ?? undefined}
    >
      <Column field="number" header="Numer"></Column>
      <Column body={titleTmpl} header="Nazwa Trasy"></Column>
      <Column
        align="center"
        body={(d) => Number(d.pptCount) || ""}
        field="pptCount"
        header="Liczba Uczestników"
      ></Column>
      <Column
        body={(d) => formatDate(d.report_date)}
        header="Data Aktualizacji"
      ></Column>
    </DataTable>
  );
};

export default TripsWithParticipantsList;
