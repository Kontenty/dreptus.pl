"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState } from "react";
import AddParticipantOnTrip from "@/components/admin/AddParticipantOnTrip";
import ParticipantsOnTrip from "@/components/admin/ParticipantsOnTrip";

export default function TripParticipantsManager({
  tripsParticipants,
}: {
  tripsParticipants: {
    label: string;
    value: number;
  }[];
}) {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  return (
    <div>
      <AddParticipantOnTrip tripsList={tripsParticipants} />
      <div>
        <h2 className="text-2xl mb-2">Zarządzaj uczestnikami</h2>
        <div className="flex flex-col mb-4 w-[600px]">
          <Autocomplete
            id="trip-select"
            label="Trasa"
            placeholder="Wybierz trasę"
            selectedKey={selectedTripId ? String(selectedTripId) : null}
            onSelectionChange={(key) => {
              setSelectedTripId(key ? Number(key) : null);
            }}
          >
            {tripsParticipants.map((trip) => (
              <AutocompleteItem key={String(trip.value)}>
                {trip.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <ParticipantsOnTrip tripId={selectedTripId} />
      </div>
    </div>
  );
}
