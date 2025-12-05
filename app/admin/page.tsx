import { LogInButton } from "@/components/auth/LogInButton";
import Main from "@/components/ui/Main";
import { auth } from "@/lib/auth";
import { getTrips } from "@/lib/db";
import { sortTrips } from "@/lib/utils";
import TripParticipantsManager from "./TripParticipantsManager";

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="center-hv grow">
        <LogInButton />
      </div>
    );
  }
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
    <Main>
      <TripParticipantsManager tripsParticipants={tripsParticipants} />
    </Main>
  );
}
