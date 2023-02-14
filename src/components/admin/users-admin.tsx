import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import useSWR from "swr";

const UsersAdmin = () => {
  const { data } = useSWR("/api/admin/get-trip-participants?id=11870");
  return (
    <div>
      <DataTable value={data?.participants}>
        <Column field="name" header="Imię i Nazwisko" />
        <Column field="origin" header="Klub / miejscowość" />
        <Column field="answers" header="Odpowiedzi" />
        <Column
          body={(row) =>
            new Intl.DateTimeFormat("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(row.report_date))
          }
          field="report_date"
          header="Data zgłoszenia"
        />
      </DataTable>
    </div>
  );
};

export default UsersAdmin;
