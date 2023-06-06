import React from "react";
import { useRouter } from "next/router";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { TripFormMap } from "src/types";
import { getIcon, useMediaQuery } from "lib/index";

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
  const isMd = useMediaQuery("min-width: 768px");

  const handleTripSelect = (
    ev: DataTableSelectionChangeEvent<TripFormMap[]>
  ) => {
    const value = ev.value as TripFormMap;
    setTimeout(() => {
      router.push(`/trips/${value.slug}`);
    }, 300);
  };
  return (
    <DataTable
      className="min-w-[450px]"
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
      size={isMd ? "normal" : "small"}
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
