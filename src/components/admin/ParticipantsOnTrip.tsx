import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

type Props = { tripId: number | null };
type TripParticipant = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  trip_id: number;
  answers: string;
  report_date: Date;
};

const UsersOnTrip = ({ tripId }: Props) => {
  const toast = useRef<Toast>(null);
  const { data, isLoading, mutate } = useSWR(
    tripId ? `/api/admin/get-trip-participants?id=${tripId}` : null
  );
  const [selectedTripParticipant, setSelectedTripParticipant] =
    useState<TripParticipant | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const confirmDeleteProduct = (participant: TripParticipant) => {
    setSelectedTripParticipant(participant);
    setDeleteDialog(true);
  };

  const deleteProduct = () => {
    fetch(
      `/api/admin/remove-trip-participant?id=${selectedTripParticipant?.id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      setDeleteDialog(false);

      if (res.ok) {
        toast?.current &&
          toast.current.show({
            severity: "success",
            summary: "Pomyślnie",
            detail: "usunięto uczestnika",
            life: 3000,
          });
        mutate();
      } else {
        toast?.current &&
          toast.current.show({
            severity: "error",
            summary: "Błąd",
            detail: "uczestnik nie został usunięty",
            life: 3000,
          });
      }
    });
  };

  const actionBodyTemplate = (participant: TripParticipant) => {
    return (
      <React.Fragment>
        <Button
          className="mr-2"
          disabled
          icon="pi pi-pencil"
          // onClick={() => editProduct(rowData)}
          outlined
          rounded
        />
        <Button
          icon="pi pi-trash"
          onClick={() => confirmDeleteProduct(participant)}
          outlined
          rounded
          severity="danger"
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      {data || isLoading ? (
        <DataTable
          emptyMessage="Nie znaleziono uczestników"
          loading={isLoading}
          value={data?.participants}
        >
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
      ) : (
        <h2>Wybierz trasę aby zoabczyć uczestników</h2>
      )}
      <Dialog
        footer={
          <>
            <Button
              icon="pi pi-times"
              label="Nie"
              onClick={() => setDeleteDialog(false)}
              outlined
            />
            <Button
              icon="pi pi-check"
              label="Tak"
              onClick={deleteProduct}
              severity="danger"
            />
          </>
        }
        header={
          <>
            <i className="pi pi-exclamation-triangle mr-2 text-red-300" />
            Zatwierdź
          </>
        }
        onHide={() => setDeleteDialog(false)}
        style={{ width: "400px" }}
        visible={deleteDialog}
      >
        <div className="confirmation-content">
          <span>
            Czy na pewno chcesz usunąć uczestnika
            <br />
            {selectedTripParticipant?.name} z trasy
          </span>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
};

export default UsersOnTrip;
