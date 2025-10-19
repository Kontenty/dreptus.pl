"use client";

import React, { useRef, useState } from "react";
import { log } from "next-axiom";
import useSWR from "swr";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import EditParticipantOnTrip from "./EditParticipantOnTrip";
import { getTripParticipants } from "@/lib/actions/get-trip-participants";
import { removeTripParticipant } from "@/lib/actions/remove-trip-participant";
import { editTripParticipant } from "@/lib/actions/edit-trip-participant";

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

const ParticipantsOnTrip = ({ tripId }: Props) => {
  const toast = useRef<Toast>(null);

  // Fetcher function for SWR that uses the server action
  const fetchParticipants = async (tripId: number) => {
    return await getTripParticipants(tripId);
  };

  const { data, isLoading, mutate } = useSWR(
    tripId ? { tripId } : null,
    ({ tripId }) => fetchParticipants(tripId)
  );
  const [selectedTripParticipant, setSelectedTripParticipant] =
    useState<TripParticipant | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);

  const confirmDeleteParticipant = (participant: TripParticipant) => {
    setSelectedTripParticipant(participant);
    setDeleteDialog(true);
  };

  const deleteParticipant = async () => {
    if (!selectedTripParticipant?.id) return;

    try {
      await removeTripParticipant(selectedTripParticipant.id);
      setDeleteDialog(false);

      toast?.current?.show({
        severity: "success",
        summary: "Pomyślnie",
        detail: "usunięto uczestnika",
        life: 3000,
      });

      await mutate();
    } catch (error) {
      setDeleteDialog(false);
      log.error("admin: delete participant error", { message: error });

      toast?.current?.show({
        severity: "error",
        summary: "Błąd",
        detail:
          error instanceof Error
            ? error.message
            : "uczestnik nie został usunięty",
        life: 3000,
      });
    }
  };

  const saveParticipant = async (participant: TripParticipant) => {
    try {
      await editTripParticipant({
        id: participant.id,
        participant_id: participant.participant_id,
        trip_id: participant.trip_id,
        answers: participant.answers,
        report_date: participant.report_date.toISOString(),
        name: participant.name,
        origin: participant.origin,
      });

      setEditDialog(false);

      toast?.current?.show({
        severity: "success",
        summary: "Pomyślnie",
        detail: "zapisano zmiany",
        life: 3000,
      });

      await mutate();
    } catch (error) {
      setEditDialog(false);
      log.error("admin: edit participant error", { message: error });

      toast?.current?.show({
        severity: "error",
        summary: "Błąd",
        detail:
          error instanceof Error
            ? error.message
            : "zmiany nie zostały zapisane",
        life: 3000,
      });
    }
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
          value={data?.tripParticipants?.participants}
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

export default ParticipantsOnTrip;
