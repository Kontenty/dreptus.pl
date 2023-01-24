import React, { useState } from "react";

import Main from "components/layout/MainLayout";
import TripReportForm from "components/tripReportForm";
import { getTrips } from "lib/db";
import { sortTrips } from "lib/utils";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
interface Props {
  trips: { value: string; label: string }[];
}
export default function StartForm({ trips }: Props) {
  const [formSent, setFormSent] = useState(false);
  return (
    <Main>
      {formSent ? (
        <div className="m-auto">
          <PaperAirplaneIcon className="w-12 h-12 text-brand-green-dark -rotate-45" />
          <h1 className="text-4xl text-brand-green-dark my-8">
            Dziękujemy za przesłanie zgłoszenia
          </h1>
          <p>
            Twoje zgłoszenie zostało przesłane i wkrótce zostanie zweryfikowane
          </p>
        </div>
      ) : (
        <TripReportForm onSuccess={() => setFormSent(true)} trips={trips} />
      )}
    </Main>
  );
}

export const getStaticProps = async () => {
  const tripsData = await getTrips(10000);
  const trips = tripsData
    .map((t) => ({ ...t, number: t.wp_postmeta[0].meta_value }))
    .sort(sortTrips)
    .map((t) => ({
      label: `${t.number} ${t.post_title.replace("<br>", ", ")}`,
      value: `${t.number} ${t.post_title.replace("<br>", ", ")}`,
    }));
  return {
    props: {
      trips: trips || [],
    },
  };
};
