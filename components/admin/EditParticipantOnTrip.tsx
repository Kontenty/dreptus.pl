import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import RHFInput, { type RHFField } from "@/components/RHFInput";
import { Button } from "primereact/button";

type TripParticipant = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  trip_id: number;
  answers: string;
  report_date: Date;
};

const fields: RHFField[] = [
  { name: "name", label: "Imię i nazwisko" },
  { name: "origin", label: "Klub / miejscowość" },
  { name: "answers", label: "Odpowiedzi" },
  { name: "report_date", label: "Data przebycia trasy", type: "date" },
];

type Props = {
  participant: TripParticipant;
  onSubmit: (value: TripParticipant) => void;
  onAbort: () => void;
};

const EditParticipantOnTrip = ({ participant, onSubmit, onAbort }: Props) => {
  const methods = useForm<TripParticipant>({
    defaultValues: {
      ...participant,
      report_date: new Date(participant.report_date),
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 pt-6 p-fluid"
      >
        {fields.map((f, i) => (
          <RHFInput key={i + "_" + f.name} {...f} />
        ))}
        <div className="flex gap-4 items-start">
          <Button type="submit">Zapisz</Button>
          <Button
            onClick={() => onAbort()}
            outlined
            severity="secondary"
            type="button"
          >
            Anuluj
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditParticipantOnTrip;
