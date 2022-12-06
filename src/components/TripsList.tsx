import { useRouter } from "next/router";
import React from "react";
import {
  DataTable,
  DataTableSelectionChangeParams,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { TripFormMap } from "src/types";
// import css from "./tripsList.module.css";
import { getIcon } from "lib/utils";

type Props = {
  trips: TripFormMap[];
};

const tripTitleBodyTemplate = (trip: TripFormMap) => {
  return (
    <span
      className="text-teal-900 font-semibold"
      dangerouslySetInnerHTML={{ __html: trip.title }}
    ></span>
  );
};
const tripNumBodyTemplate = (trip: TripFormMap) => {
  return (
    <div className="flex flex-col items-center">
      {trip.number} {getIcon(trip.type, { height: 30 })}
    </div>
  );
};

const TripsList = ({ trips }: Props) => {
  const router = useRouter();
  const handleTripSelect = (ev: DataTableSelectionChangeParams) => {
    setTimeout(() => {
      router.push(`/trips/${ev.value.slug}`);
    }, 300);
  };
  return (
    <DataTable
      currentPageReportTemplate="{first} do {last} z {totalRecords}"
      dataKey="ID"
      header="Lista tras"
      onSelectionChange={handleTripSelect}
      paginator
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      responsiveLayout="scroll"
      rows={50}
      rowsPerPageOptions={[20, 50, 100, 200]}
      selectionMode="single"
      size="small"
      value={trips}
    >
      <Column body={tripNumBodyTemplate} header="Numer"></Column>
      <Column body={tripTitleBodyTemplate} header="Tytuł"></Column>
      <Column field="locations" header="Lokalizacja"></Column>
      <Column field="pk" header="PK"></Column>
      <Column field="length" header="Długość"></Column>
    </DataTable>
  );
};

export default TripsList;
