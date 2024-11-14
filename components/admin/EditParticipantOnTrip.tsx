import React from "react";
import { Form, Formik } from "formik";
import FormikInput from "@/components/FormikInput";
import { Button } from "primereact/button";

type FField = {
  name: string;
  label: string;
  type?: "date";
};

type TripParticipant = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  trip_id: number;
  answers: string;
  report_date: Date;
};

const fields: FField[] = [
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
  return (
    <>
      <Formik
        initialValues={{
          ...participant,
          report_date: new Date(participant.report_date),
        }}
        onSubmit={(v) => onSubmit(v)}
      >
        {() => (
          <Form className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 pt-6 p-fluid">
            {fields.map((f, i) => (
              <FormikInput key={i + "_" + f.name} {...f} />
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditParticipantOnTrip;
