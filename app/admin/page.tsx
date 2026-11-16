import { getTrips } from "@/lib/db";
import { sortTrips } from "@/lib/utils";
import TripParticipantsManager from "./TripParticipantsManager";

export default async function AdminPage() {
  // Fetch trips data in Server Component
  const tripsParticipantsData = await getTrips();
  const tripsParticipants = tripsParticipantsData
    .map((t) => ({
      ...t,
      value: t.ID,
      label: `${t.number} ${t.post_title.replace(/,?<br> ?/, ", ")}`,
    }))
    .sort(sortTrips);

  return (
    <section aria-labelledby="admin-trips-title" className="space-y-6">
      <header className="max-w-2xl space-y-2">
        <h2 id="admin-trips-title" className="text-3xl">
          Uczestnicy tras
        </h2>
        <p className="text-sm leading-6 text-[#566a6d] md:text-base">
          Dodawaj zgloszenia i porzadkuj listy uczestnikow dla wybranej trasy.
        </p>
      </header>
      <TripParticipantsManager tripsParticipants={tripsParticipants} />
    </section>
  );
}
