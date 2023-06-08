import React, { useRef, useState } from "react";
import { log } from "next-axiom";
import useSWR from "swr";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import EditParticipantOnTrip from "./EditParticipantOnTrip";

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
  const [editDialog, setEditDialog] = useState<boolean>(false);

  const confirmDeleteParticipant = (participant: TripParticipant) => {
    setSelectedTripParticipant(participant);
    setDeleteDialog(true);
  };

  const deleteParticipant = () => {
    fetch(
      `/api/admin/remove-trip-participant?id=${selectedTripParticipant?.id}`,
      {
        method: "DELETE",
      }
    )
      .then(async (res) => {
        setDeleteDialog(false);

        if (res.ok) {
          toast?.current &&
            toast.current.show({
              severity: "success",
              summary: "Pomyślnie",
              detail: "usunięto uczestnika",
              life: 3000,
            });
          await mutate();
        } else {
          toast?.current &&
            toast.current.show({
              severity: "error",
              summary: "Błąd",
              detail: "uczestnik nie został usunięty",
              life: 3000,
            });
        }
      })
      .catch((error) =>
        log.error("admin: delete participant error", { message: error })
      );
  };

  const saveParticipant = (participant: TripParticipant) => {
    fetch("/api/admin/edit-trip-participant", {
      method: "POST",
      body: JSON.stringify(participant),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setDeleteDialog(false);

        if (res.ok) {
          toast?.current &&
            toast.current.show({
              severity: "success",
              summary: "Pomyślnie",
              detail: "zapisano zmiany",
              life: 3000,
            });
          await mutate();
        } else {
          toast?.current &&
            toast.current.show({
              severity: "error",
              summary: "Błąd",
              detail: "zmiany nie zostały zapisane",
              life: 3000,
            });
        }
      })
      .catch((error) =>
        log.error("admin: add participant error", { message: error })
      )
      .finally(() => setEditDialog(false));
  };

  const editParticipant = (participant: TripParticipant) => {
    setEditDialog(true);
    setSelectedTripParticipant(participant);
  };

  const actionBodyTemplate = (participant: TripParticipant) => {
    return (
      <React.Fragment>
        <Button
          className="mr-2"
          icon="pi pi-pencil"
          onClick={() => editParticipant(participant)}
          outlined
          rounded
        />
        <Button
          icon="pi pi-trash"
          onClick={() => confirmDeleteParticipant(participant)}
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
              onClick={deleteParticipant}
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
      <Dialog
        onHide={() => setEditDialog(false)}
        style={{ width: "700px" }}
        visible={editDialog}
      >
        {selectedTripParticipant && (
          <EditParticipantOnTrip
            onAbort={() => setEditDialog(false)}
            onSubmit={saveParticipant}
            participant={selectedTripParticipant}
          />
        )}
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
};

export default UsersOnTrip;
