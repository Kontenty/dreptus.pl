"use client";

import {
  Autocomplete,
  AutocompleteItem,
  addToast,
  Button,
  DateInput,
  Input,
} from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import type { Participant } from "@prisma/client";
import { I18nProvider } from "@react-aria/i18n";
import { log } from "next-axiom";

type Nullable<T> = T | null;

import { useReducer, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { addParticipant } from "@/lib/actions/add-participant";
import { getParticipants } from "@/lib/actions/get-participants";

type ExtParticipant = {
  nameExt: string;
  id: number;
  name: string;
  origin: string;
};
type TripOption = { label: string; value: number };
type Props = { tripsList: TripOption[] };

type State = {
  selectedTrip: number | null;
  participantName: string;
  origin: string;
  answers: string;
  date: Nullable<Date>;
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
    "get-participants",
    () => getParticipants(),
  );
  const [suggestions, setSuggestions] = useState<ExtParticipant[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (value: string) => {
    const name = value.toLowerCase();
    const filteredList = participantsList
      ?.filter((pp) => pp.name.toLowerCase().includes(name))
      .map((pp) => ({ ...pp, nameExt: `${pp.name} - ${pp.origin}` }));
    setSuggestions(filteredList ?? []);
  };

  const onParticipantSelect = ({ name, origin }: ExtParticipant) => {
    dispatch({
      type: "selectParticipant",
      value: { origin, participant: name },
    });
  };

  const showWrongData = () => {
    addToast({
      color: "danger",
      title: "Błąd",
      description: "Wysłano nieprawidłowe dane",
    });
  };
  const showSuccess = async () => {
    addToast({
      severity: "success",
      title: "Sukces",
      description: "Pomyślnie dodano nowego użytkownika",
    });
    await mutate({ tripId: state.selectedTrip });
    dispatch({ type: "reset" });
  };

  const onSubmit = async () => {
    try {
      await addParticipant({
        name: state.participantName,
        origin: state.origin,
        date: state.date as unknown as string,
        tripId: state.selectedTrip as number,
        answers: state.answers,
      });

      await showSuccess();
    } catch (error) {
      log.error("admin: add participant error", { message: error });
      if (
        error instanceof Error &&
        error.message.includes("Nieprawidłowe dane")
      ) {
        showWrongData();
      }
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl">Dodaj uczestnika trasy</h2>
      <div className="w-[1000px] grid grid-cols-3 gap-4">
        <div>
          <Autocomplete
            className="w-full"
            id="ppt-trip"
            label="Trasa"
            placeholder="Wybierz trasę"
            selectedKey={state.selectedTrip ? String(state.selectedTrip) : null}
            onSelectionChange={(key) => {
              dispatch({
                type: "trip",
                value: key ? Number(key) : null,
              });
            }}
          >
            {tripsList.map((trip) => (
              <AutocompleteItem key={String(trip.value)}>
                {trip.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="p-fluid">
          <Autocomplete
            id="ppt-name"
            label="Uczestnik"
            className="w-full"
            defaultItems={suggestions}
            selectedKey={state.participantName ? state.participantName : null}
            inputValue={state.participantName}
            onInputChange={(value) => {
              dispatch({ type: "participant", value });
              search(value);
            }}
            onSelectionChange={(key) => {
              if (key) {
                const selected = suggestions.find(
                  (s) => s.name === key || s.nameExt === key,
                );
                if (selected) {
                  onParticipantSelect(selected);
                }
              }
            }}
          >
            {(suggestion) => (
              <AutocompleteItem key={suggestion.name}>
                {suggestion.nameExt}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="flex flex-col">
          <Input
            id="ppt-origin"
            label="Klub / miasto"
            onValueChange={(value) => dispatch({ value, type: "origin" })}
            value={state.origin}
          />
        </div>
        <div className="flex flex-col">
          <Input
            id="ppt-answers"
            label="Odpowiedzi"
            onValueChange={(value) => dispatch({ value, type: "answers" })}
            isRequired
            value={state.answers}
          />
        </div>
        <div className="flex flex-col">
          <I18nProvider locale="pl-PL">
            <DateInput
              id="ppt-date"
              label="Data zgłoszenia"
              maxValue={
                new CalendarDate(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  new Date().getDate(),
                )
              }
              value={
                state.date
                  ? new CalendarDate(
                      state.date.getFullYear(),
                      state.date.getMonth() + 1,
                      state.date.getDate(),
                    )
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const jsDate = new Date(date.year, date.month - 1, date.day);
                  dispatch({ value: jsDate, type: "date" });
                } else {
                  dispatch({ value: null, type: "date" });
                }
              }}
            />
          </I18nProvider>
        </div>
        <div className="flex items-end">
          <Button onPress={onSubmit}>Zapisz</Button>
        </div>
      </div>
    </section>
  );
};

export default AddParticipantOnTrip;
