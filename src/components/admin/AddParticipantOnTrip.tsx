import React, { useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
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
import { Toast } from "primereact/toast";

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
  const { mutate } = useSWRConfig();
  const { data: participantsList } = useSWR<Participant[]>(
    "/api/admin/get-participants"
  );
  const toast = useRef<Toast>(null);
  const [suggestions, setSuggestions] = useState<
    { name: string; id: number }[]
  >([]);
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [origin, setOrigin] = useState("");
  const [date, setDate] = useState<Nullable<string | Date | Date[]>>(null);
  const [answers, setAnswers] = useState("");

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

  const showWrongData = () => {
    toast.current?.show({
      severity: "error",
      summary: "Błąd",
      detail: "Wysłano nieprawidłowe dane",
      life: 3000,
    });
  };
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Sukces",
      detail: "Pomyślnie dodano nowego użytkownika",
      life: 3000,
    });
    mutate(`/api/admin/get-trip-participants?id=${selectedTrip}`);
    setSelectedTrip(null);
    setParticipantName("");
    setOrigin("");
    setDate("");
    setAnswers("");
  };

  const onSubmit = () => {
    fetch("/api/admin/add-participant", {
      method: "POST",
      body: JSON.stringify({
        name: participantName,
        origin,
        date,
        tripId: selectedTrip,
        answers,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return showSuccess();
      }
      if (res.status === 406) {
        showWrongData();
      }
    });
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
          <label htmlFor="ppt-answers">Odpowiedzi</label>

          <InputText
            id="ppt-answers"
            onChange={(e) => setAnswers(e.target.value)}
            required
            value={answers}
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
          <Button label="Zapisz" onClick={onSubmit} />
        </div>
      </div>
      <Toast ref={toast} />
    </section>
  );
};

export default AddParticipantOnTrip;
