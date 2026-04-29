"use client";
import { ComboBox, Input, Label, ListBox } from "@heroui/react";
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
        <div className="flex flex-col mb-4 w-150">
          <ComboBox
            id="trip-select"
            selectedKey={selectedTripId ? String(selectedTripId) : null}
            onSelectionChange={(key) => {
              setSelectedTripId(key ? Number(key) : null);
            }}
          >
            <Label>Trasa</Label>
            <ComboBox.InputGroup>
              <Input placeholder="Wybierz trasę" />
              <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
              <ListBox>
                {tripsParticipants.map((trip) => (
                  <ListBox.Item
                    id={String(trip.value)}
                    key={String(trip.value)}
                    textValue={trip.label}
                  >
                    {trip.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </ComboBox.Popover>
          </ComboBox>
        </div>
        <ParticipantsOnTrip tripId={selectedTripId} />
      </div>
    </div>
  );
}
