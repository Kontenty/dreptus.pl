"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TripReportForm from "./TripReportForm";

interface Props {
  trips: {
    label: string;
    value: string;
  }[];
}

const CreateReport = ({ trips }: Readonly<Props>) => {
  const [formSent, setFormSent] = useState(false);

  if (formSent) {
    return (
      <div className="m-auto">
        <PaperAirplaneIcon className="w-12 h-12 text-brand-green-dark -rotate-45" />
        <h1 className="page-title my-8">Dziękujemy za przesłanie zgłoszenia</h1>
        <p>
          Twoje zgłoszenie zostało przesłane i wkrótce zostanie zweryfikowane
        </p>
      </div>
    );
  }

  return <TripReportForm onSuccess={() => setFormSent(true)} trips={trips} />;
};

export default CreateReport;
