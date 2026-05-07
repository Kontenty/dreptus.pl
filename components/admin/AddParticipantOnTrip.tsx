"use client";

import {
  Button,
  ComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  TextField,
  toast,
} from "@heroui/react";
import type { Participant } from "@prisma/client";
import { log } from "next-axiom";

type Nullable<T> = T | null;

import { useReducer, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { addParticipant } from "@/lib/actions/add-participant";
import { getParticipants } from "@/lib/actions/get-participants";
import { formatDateTimeForDB } from "@/lib/utils";

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
  selectedParticipantId: number | null;
  participantName: string;
  origin: string;
  answers: string;
  date: Nullable<Date>;
};
const initialState: State = {
  selectedTrip: null,
  selectedParticipantId: null,
  participantName: "",
  origin: "",
  answers: "",
  date: null,
};
type Action =
  | { type: "trip"; value: State["selectedTrip"] }
  | { type: "selectedParticipantId"; value: State["selectedParticipantId"] }
  | { type: "participant"; value: State["participantName"] }
  | {
      type: "selectParticipant";
      value: {
        id: number;
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
    case "selectedParticipantId":
      return { ...state, selectedParticipantId: action.value };
    case "participant":
      return {
        ...state,
        participantName: action.value,
        selectedParticipantId: null,
      };
    case "selectParticipant":
      return {
        ...state,
        participantName: action.value.participant,
        origin: action.value.origin,
        selectedParticipantId: action.value.id,
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

  const onParticipantSelect = ({ id, name, origin }: ExtParticipant) => {
    dispatch({
      type: "selectParticipant",
      value: { id, origin, participant: name },
    });
  };

  const showWrongData = () => {
    toast.danger("Błąd", { description: "Wysłano nieprawidłowe dane" });
  };
  const showSuccess = async () => {
    toast.success("Sukces", {
      description: "Pomyślnie dodano nowego użytkownika",
    });
    await mutate({ tripId: state.selectedTrip });
    dispatch({ type: "reset" });
  };

  const onSubmit = async () => {
    if (
      !state.selectedTrip ||
      !state.participantName ||
      !state.answers ||
      !state.date
    ) {
      showWrongData();
      return;
    }
    try {
      await addParticipant({
        name: state.participantName,
        origin: state.origin,
        date: formatDateTimeForDB(state.date),
        tripId: state.selectedTrip,
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
      } else {
        toast.danger("Błąd", {
          description: "Wystąpił błąd podczas dodawania uczestnika",
        });
      }
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl">Dodaj uczestnika trasy</h2>
      <div className="grid w-[250px] grid-cols-3 gap-4">
        <div>
          <ComboBox
            id="ppt-trip"
            selectedKey={state.selectedTrip ? String(state.selectedTrip) : null}
            onSelectionChange={(key) => {
              dispatch({
                type: "trip",
                value: key ? Number(key) : null,
              });
            }}
          >
            <Label>Trasa</Label>
            <ComboBox.InputGroup>
              <Input placeholder="Wybierz trasę" />
              <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
              <ListBox>
                {tripsList.map((trip) => (
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
        <div>
          <ComboBox
            id="ppt-name"
            selectedKey={
              state.selectedParticipantId
                ? String(state.selectedParticipantId)
                : null
            }
            inputValue={state.participantName}
            onInputChange={(value) => {
              dispatch({ type: "participant", value });
              search(value);
            }}
            onSelectionChange={(key) => {
              if (key) {
                const selected = suggestions.find((s) => s.id === Number(key));
                if (selected) {
                  onParticipantSelect(selected);
                }
              }
            }}
          >
            <Label>Uczestnik</Label>
            <ComboBox.InputGroup>
              <Input placeholder="Wpisz lub wybierz uczestnika" />
              <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
              <ListBox>
                {suggestions.map((suggestion) => (
                  <ListBox.Item
                    id={String(suggestion.id)}
                    key={suggestion.id}
                    textValue={suggestion.nameExt}
                  >
                    {suggestion.nameExt}
                  </ListBox.Item>
                ))}
              </ListBox>
            </ComboBox.Popover>
          </ComboBox>
        </div>
        <div className="flex flex-col">
          <TextField name="ppt-origin">
            <Label>Klub / miasto</Label>
            <Input
              id="ppt-origin"
              onChange={(event) =>
                dispatch({ value: event.target.value, type: "origin" })
              }
              value={state.origin}
            />
          </TextField>
        </div>
        <div className="flex flex-col">
          <TextField isRequired name="ppt-answers">
            <Label>Odpowiedzi</Label>
            <Input
              id="ppt-answers"
              onChange={(event) =>
                dispatch({ value: event.target.value, type: "answers" })
              }
              value={state.answers}
            />
          </TextField>
        </div>
        <div className="flex flex-col">
          <TextField name="ppt-date" isRequired>
            <Label>Data zgłoszenia</Label>
            <Input
              id="ppt-date"
              onChange={(event) => {
                dispatch({
                  value: event.target.value
                    ? new Date(event.target.value)
                    : null,
                  type: "date",
                });
              }}
              type="date"
              value={state.date ? state.date.toISOString().slice(0, 10) : ""}
            />
            <FieldError>Pole jest wymagane</FieldError>
          </TextField>
        </div>
        <div className="flex items-end">
          <Button onPress={onSubmit} variant="primary">
            Zapisz
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddParticipantOnTrip;
