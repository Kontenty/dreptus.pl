import { useRouter } from "next/router";
import React from "react";
import {
  DataTable,
  DataTableSelectionChangeParams,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { TripFormMap } from "types";
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
      value={trips}
      paginator
      header="Lista tras"
      responsiveLayout="scroll"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="{first} do {last} z {totalRecords}"
      rows={10}
      rowsPerPageOptions={[10, 50, 100]}
      onSelectionChange={handleTripSelect}
      selectionMode="single"
      dataKey="ID"
      size="small"
    >
      <Column header="Numer" body={tripNumBodyTemplate}></Column>
      <Column header="Tytuł" body={tripTitleBodyTemplate}></Column>
      <Column field="locations" header="Lokalizacja"></Column>
      <Column field="pk" header="PK"></Column>
      <Column field="length" header="Długość"></Column>
    </DataTable>
  );
};

export default TripsList;
