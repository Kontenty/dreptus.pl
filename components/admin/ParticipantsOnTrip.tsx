"use client";

import {
  CheckIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Modal, toast, useOverlayState } from "@heroui/react";
import { log } from "next-axiom";
import React, { useState } from "react";
import useSWR from "swr";
import { editTripParticipant } from "@/lib/actions/edit-trip-participant";
import { getTripParticipants } from "@/lib/actions/get-trip-participants";
import { removeTripParticipant } from "@/lib/actions/remove-trip-participant";
import PaginatedTable from "../PaginatedTable";
import EditParticipantOnTrip from "./EditParticipantOnTrip";

type Props = { tripId: number | null };
type TripParticipant = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  trip_id: number | bigint;
  answers: string;
  report_date: Date;
};

const ParticipantsOnTrip = ({ tripId }: Props) => {
  // Fetcher function for SWR that uses the server action
  const fetchParticipants = async (tripId: number) => {
    return await getTripParticipants(tripId);
  };

  const { data, isLoading, mutate } = useSWR(
    tripId ? { tripId } : null,
    ({ tripId }) => fetchParticipants(tripId),
  );
  const [selectedTripParticipant, setSelectedTripParticipant] =
    useState<TripParticipant | null>(null);
  const deleteState = useOverlayState();
  const editState = useOverlayState();

  const confirmDeleteParticipant = (participant: TripParticipant) => {
    setSelectedTripParticipant(participant);
    deleteState.open();
  };

  const deleteParticipant = async () => {
    if (!selectedTripParticipant?.id) return;

    try {
      await removeTripParticipant(selectedTripParticipant.id);
      deleteState.close();
      setSelectedTripParticipant(null);

      toast.success("Pomyślnie", { description: "usunięto uczestnika" });

      await mutate();
    } catch (error) {
      deleteState.close();
      log.error("admin: delete participant error", { message: error });

      toast.danger("Błąd", {
        description:
          error instanceof Error
            ? error.message
            : "uczestnik nie został usunięty",
      });
    }
  };

  const saveParticipant = async (participant: TripParticipant) => {
    try {
      await editTripParticipant({
        id: participant.id,
        participant_id: participant.participant_id,
        trip_id: Number(participant.trip_id),
        answers: participant.answers,
        report_date: participant.report_date.toISOString(),
        name: participant.name,
        origin: participant.origin,
      });

      editState.close();
      setSelectedTripParticipant(null);

      toast.success("Pomyślnie zapisano zmiany");

      await mutate();
    } catch (error) {
      editState.close();
      log.error("admin: edit participant error", { message: error });

      toast.danger("Błąd", {
        description:
          error instanceof Error
            ? error.message
            : "zmiany nie zostały zapisane",
      });
    }
  };

  const editParticipant = (participant: TripParticipant) => {
    editState.open();
    setSelectedTripParticipant(participant);
  };

  const actionBodyTemplate = (participant: TripParticipant) => {
    return (
      <React.Fragment>
        <Button
          className="mr-2"
          isIconOnly
          onPress={() => editParticipant(participant)}
          variant="secondary"
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          onPress={() => confirmDeleteParticipant(participant)}
          variant="danger-soft"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </React.Fragment>
    );
  };

  return (
    <div>
      {data?.tripParticipants?.participants || isLoading ? (
        isLoading ? (
          <div>Ładowanie...</div>
        ) : (
          <PaginatedTable
            items={data?.tripParticipants?.participants || []}
            keyExtractor={(item) => item.id}
            emptyMessage="Nie znaleziono uczestników"
            isLoading={isLoading}
            columns={[
              { key: "name", label: "Imię i Nazwisko" },
              { key: "origin", label: "Klub / miejscowość" },
              { key: "answers", label: "Odpowiedzi" },
              {
                key: "report_date",
                label: "Data zgłoszenia",
                render: (row) =>
                  new Intl.DateTimeFormat("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(row.report_date)),
              },
              {
                key: "actions",
                label: "Akcje",
                render: actionBodyTemplate,
              },
            ]}
          />
        )
      ) : (
        <h2>Wybierz trasę aby zoabczyć uczestników</h2>
      )}
      <Modal state={deleteState}>
        <Modal.Backdrop>
          <Modal.Container size="md">
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <Modal.Heading>
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-300" />
                        Zatwierdź
                      </div>
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <span>
                      Czy na pewno chcesz usunąć uczestnika
                      <br />
                      {selectedTripParticipant?.name} z trasy
                    </span>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onPress={close}>
                      <XMarkIcon className="w-4 h-4 mr-2" />
                      Nie
                    </Button>
                    <Button variant="danger" onPress={deleteParticipant}>
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Tak
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      <Modal state={editState}>
        <Modal.Backdrop>
          <Modal.Container size="lg">
            <Modal.Dialog>
              {({ close }) => (
                <Modal.Body>
                  {selectedTripParticipant && (
                    <EditParticipantOnTrip
                      onAbort={close}
                      onSubmit={saveParticipant}
                      participant={selectedTripParticipant}
                    />
                  )}
                </Modal.Body>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default ParticipantsOnTrip;
