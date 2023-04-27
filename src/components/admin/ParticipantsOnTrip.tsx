import React from "react";
import useSWR from "swr";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

type Props = { tripId: number };

const UsersOnTrip = ({ tripId }: Props) => {
  const { data } = useSWR(`/api/admin/get-trip-participants?id=${tripId}`);

  const actionBodyTemplate = () => {
    return (
      <React.Fragment>
        <Button
          className="mr-2"
          icon="pi pi-pencil"
          // onClick={() => editProduct(rowData)}
          outlined
          rounded
        />
        <Button
          icon="pi pi-trash"
          // onClick={() => confirmDeleteProduct(rowData)}
          outlined
          rounded
          severity="danger"
        />
      </React.Fragment>
    );
  };
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
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default UsersOnTrip;
