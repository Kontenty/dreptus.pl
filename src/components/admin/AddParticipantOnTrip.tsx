import React, { useState } from "react";
import useSWR from "swr";
import type { Participant } from "@prisma/client";
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";

type ExtParticpant = {
  nameExt: string;
  id: number;
  name: string;
  origin: string;
  de: Nullable;
};
type TripOption = { label: string; value: number };
type Props = { tripsList: TripOption[] };

const AddParticipantOnTrip = ({ tripsList }: Props) => {
  const { data: participantsList } = useSWR<Participant[]>(
    "/api/admin/get-participants"
  );
  const [suggestions, setSuggestions] = useState<
    { name: string; id: number }[]
  >([]);
  const [selectedTrip, setSelectedTrip] = useState<TripOption | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [origin, setOrigin] = useState("");
  const [date, setDate] = useState<string | Date | Date[] | null | undefined>(
    null
  );

  const search = (event: AutoCompleteCompleteEvent) => {
    const name = event.query.toLowerCase();
    const filteredList = participantsList
      ?.filter((pp) => pp.name.toLowerCase().includes(name))
      .map((pp) => ({ ...pp, nameExt: `${pp.name} - ${pp.origin}` }));
    setSuggestions(filteredList || []);
  };

  const onParticipantSelect = (value: ExtParticpant) => {
    setOrigin(value.origin);
    setParticipantName(value.name);
  };
  return (
    <section className="mb-8">
      <h2 className="text-2xl">Dodaj uczestnika trasy</h2>
      <div className="w-[1000px] grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="ppt-trip">Trasa</label>
          <Dropdown
            className="w-full"
            filter
            id="ppt-trip"
            onChange={(e) => setSelectedTrip(e.value)}
            options={tripsList}
            placeholder="Wybierz trasę"
            value={selectedTrip}
          />
        </div>
        <div className="p-fluid">
          <label htmlFor="ppt-name">Uczestnik</label>
          <AutoComplete
            completeMethod={search}
            field="nameExt"
            inputClassName="w-full"
            inputId="ppt-name"
            onChange={(e) => setParticipantName(e.value)}
            onSelect={(e) => onParticipantSelect(e.value)}
            suggestions={suggestions}
            value={participantName}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ppt-origin">Klub / miasto</label>

          <InputText
            id="ppt-origin"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ppt-date">Data zgłoszenia</label>

          <Calendar
            dateFormat="dd-mm-yy"
            id="ppt-date"
            locale="pl"
            maxDate={new Date()}
            onChange={(e) => setDate(e.value)}
            value={date}
          />
        </div>
        <div className="flex items-end">
          <Button label="Zapisz" />
        </div>
      </div>
    </section>
  );
};

export default AddParticipantOnTrip;
