"use client";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
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
      <div>
        <h2 className="text-2xl mb-2">Zarządzaj uczestnikami</h2>
        <div className="flex flex-col mb-4 w-[600px]">
          <label htmlFor="trip-select">Trasa</label>
          <Dropdown
            filter
            id="trip-select"
            onChange={(e) => setSelectedTripId(e.value)}
            options={tripsParticipants}
            placeholder="Wybierz trasę"
            value={selectedTripId}
          />
        </div>
        <ParticipantsOnTrip tripId={selectedTripId} />
      </div>
    </div>
  );
}
