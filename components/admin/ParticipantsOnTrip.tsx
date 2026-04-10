"use client";

import {
  CheckIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
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
  const [_item] = useState(null);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const confirmDeleteParticipant = (participant: TripParticipant) => {
    setSelectedTripParticipant(participant);
    onDeleteOpen();
  };

  const deleteParticipant = async () => {
    if (!selectedTripParticipant?.id) return;

    try {
      await removeTripParticipant(selectedTripParticipant.id);
      onDeleteClose();

      addToast({
        color: "success",
        title: "Pomyślnie",
        description: "usunięto uczestnika",
      });

      await mutate();
    } catch (error) {
      onDeleteClose();
      log.error("admin: delete participant error", { message: error });

      addToast({
        color: "danger",
        title: "Błąd",
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

      onEditClose();

      addToast({
        color: "success",
        title: "Pomyślnie zapisano zmiany",
      });

      await mutate();
    } catch (error) {
      onEditClose();
      log.error("admin: edit participant error", { message: error });

      addToast({
        color: "danger",
        title: "Błąd",
        description:
          error instanceof Error
            ? error.message
            : "zmiany nie zostały zapisane",
      });
    }
  };

  const editParticipant = (participant: TripParticipant) => {
    onEditOpen();
    setSelectedTripParticipant(participant);
  };

  const actionBodyTemplate = (participant: TripParticipant) => {
    return (
      <React.Fragment>
        <Button
          className="mr-2"
          isIconOnly
          onPress={() => editParticipant(participant)}
          variant="bordered"
          radius="full"
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          onPress={() => confirmDeleteParticipant(participant)}
          variant="bordered"
          radius="full"
          color="danger"
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
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-300" />
                  Zatwierdź
                </div>
              </ModalHeader>
              <ModalBody>
                <span>
                  Czy na pewno chcesz usunąć uczestnika
                  <br />
                  {selectedTripParticipant?.name} z trasy
                </span>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  <XMarkIcon className="w-4 h-4 mr-2" />
                  Nie
                </Button>
                <Button color="danger" onPress={deleteParticipant}>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Tak
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {selectedTripParticipant && (
                  <EditParticipantOnTrip
                    onAbort={onClose}
                    onSubmit={saveParticipant}
                    participant={selectedTripParticipant}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ParticipantsOnTrip;
