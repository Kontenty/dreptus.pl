"use client";
import React from "react";
import { DataTable, type DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";

import { formatDate } from "@/lib/utils";
interface Props {
  participantsList: DataTableValue[];
}

const ParticipantsOnTrip = ({ participantsList }: Readonly<Props>) => {
  return (
    <DataTable
      className="min-w-[450px]"
      currentPageReportTemplate="{first} do {last} z {totalRecords}"
      dataKey="id"
      paginator={participantsList.length > 50}
      // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      rows={50}
      // rowsPerPageOptions={[20, 50, 100, 200]}
      // size={isMd ? "normal" : "small"}
      value={participantsList}
    >
      <Column
        body={(_, options) => options.rowIndex + 1}
        header="L.p."
        headerStyle={{ width: "3rem" }}
      ></Column>
      <Column field="name" header="Imię i nazwisko"></Column>
      <Column field="origin" header="Nazwa zespołu / miejscowość"></Column>
      <Column
        body={(d) => formatDate(d.report_date)}
        field="report_date"
        header="Data zgłoszenia"
      ></Column>
      <Column field="answers" header="Liczba odpowiedzi"></Column>
    </DataTable>
  );
};

export default ParticipantsOnTrip;
