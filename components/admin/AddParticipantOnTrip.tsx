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
import { log } from "next-axiom";
import { useReducer } from "react";
import { useSWRConfig } from "swr";
import { addParticipant } from "@/lib/actions/add-participant";
import { formatDateTimeForDB } from "@/lib/utils";
import ParticipantSearch from "./ParticipantSearch";

type Nullable<T> = T | null;
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
  const [state, dispatch] = useReducer(reducer, initialState);

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
      <div className="grid w-230 grid-cols-3 gap-4">
        <div>
          <ComboBox
            id="ppt-trip"
            value={state.selectedTrip ?? null}
            onChange={(key) => {
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
                    id={trip.value}
                    key={trip.value}
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
          <ParticipantSearch
            selectedParticipantId={state.selectedParticipantId}
            participantName={state.participantName}
            onSelect={(participant) => {
              dispatch({
                type: "selectParticipant",
                value: {
                  id: participant.id,
                  origin: participant.origin,
                  participant: participant.name,
                },
              });
            }}
            onInputChange={(value) => {
              dispatch({ type: "participant", value });
            }}
          />
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
