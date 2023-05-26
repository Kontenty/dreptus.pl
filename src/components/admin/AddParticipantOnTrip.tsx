import React, { useReducer, useRef, useState } from "react";
import { log } from "next-axiom";
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

type State = {
  selectedTrip: number | null;
  participantName: string;
  origin: string;
  answers: string;
  date: Nullable<string | Date | Date[]>;
};
const initialState: State = {
  selectedTrip: null,
  participantName: "",
  origin: "",
  answers: "",
  date: null,
};
type Action =
  | { type: "trip"; value: State["selectedTrip"] }
  | { type: "participant"; value: State["participantName"] }
  | {
      type: "selectParticipant";
      value: {
        participant: State["participantName"];
        origin: State["origin"];
      };
    }
  | { type: "origin"; value: State["origin"] }
  | { type: "answers"; value: State["answers"] }
  | { type: "date"; value: State["date"] }
  | { type: "reset" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "trip":
      return { ...state, selectedTrip: action.value };
    case "participant":
      return { ...state, participantName: action.value };
    case "selectParticipant":
      return {
        ...state,
        participantName: action.value.participant,
        origin: action.value.origin,
      };
    case "origin":
      return { ...state, origin: action.value };
    case "answers":
      return { ...state, answers: action.value };
    case "date":
      return { ...state, date: action.value };

    default:
      return state;
  }
}

const AddParticipantOnTrip = ({ tripsList }: Props) => {
  const { mutate } = useSWRConfig();
  const { data: participantsList } = useSWR<Participant[]>(
    "/api/admin/get-participants"
  );
  const toast = useRef<Toast>(null);
  const [suggestions, setSuggestions] = useState<
    { name: string; id: number }[]
  >([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (event: AutoCompleteCompleteEvent) => {
    const name = event.query.toLowerCase();
    const filteredList = participantsList
      ?.filter((pp) => pp.name.toLowerCase().includes(name))
      .map((pp) => ({ ...pp, nameExt: `${pp.name} - ${pp.origin}` }));
    setSuggestions(filteredList ?? []);
  };

  const onParticipantSelect = ({ name, origin }: ExtParticpant) => {
    dispatch({
      type: "selectParticipant",
      value: { origin, participant: name },
    });
  };

  const showWrongData = () => {
    toast.current?.show({
      severity: "error",
      summary: "Błąd",
      detail: "Wysłano nieprawidłowe dane",
      life: 3000,
    });
  };
  const showSuccess = async () => {
    toast.current?.show({
      severity: "success",
      summary: "Sukces",
      detail: "Pomyślnie dodano nowego użytkownika",
      life: 3000,
    });
    await mutate(`/api/admin/get-trip-participants?id=${state.selectedTrip}`);
    dispatch({ type: "reset" });
  };

  const onSubmit = () => {
    fetch("/api/admin/add-participant", {
      method: "POST",
      body: JSON.stringify({
        name: state.participantName,
        origin: state.origin,
        date: state.date,
        tripId: state.selectedTrip,
        answers: state.answers,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return showSuccess();
        }
        if (res.status === 406) {
          showWrongData();
        }
      })
      .catch((error) =>
        log.error("admin: add participant error", { message: error })
      );
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
            onChange={(e) => dispatch({ type: "trip", value: e.value })}
            options={tripsList}
            placeholder="Wybierz trasę"
            value={state.selectedTrip}
          />
        </div>
        <div className="p-fluid">
          <label htmlFor="ppt-name">Uczestnik</label>
          <AutoComplete
            completeMethod={search}
            field="nameExt"
            inputClassName="w-full"
            inputId="ppt-name"
            onChange={(e) => dispatch({ type: "participant", value: e.value })}
            onSelect={(e) => onParticipantSelect(e.value)}
            suggestions={suggestions}
            value={state.participantName}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ppt-origin">Klub / miasto</label>

          <InputText
            id="ppt-origin"
            onChange={(e) =>
              dispatch({ value: e.target.value, type: "origin" })
            }
            value={state.origin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ppt-answers">Odpowiedzi</label>

          <InputText
            id="ppt-answers"
            onChange={(e) =>
              dispatch({ value: e.target.value, type: "answers" })
            }
            required
            value={state.answers}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ppt-date">Data zgłoszenia</label>

          <Calendar
            dateFormat="dd-mm-yy"
            id="ppt-date"
            locale="pl"
            maxDate={new Date()}
            onChange={(e) => dispatch({ value: e.value, type: "date" })}
            value={state.date}
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
