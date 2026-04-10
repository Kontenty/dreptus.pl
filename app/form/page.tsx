import Report from "@/components/report";
import Main from "@/components/ui/Main";
import { getTrips } from "@/lib/db";
import { sortTrips } from "@/lib/utils";

const getData = async () => {
  const tripsData = await getTrips();
  const trips = tripsData.sort(sortTrips).map((t) => ({
    label: `${t.number} ${t.post_title.replace(/,?<br> ?/, ", ")}`,
    value: `${t.number} ${t.post_title.replace(/,?<br> ?/, ", ")}`,
  }));
  return trips;
};

export default async function StartForm() {
  const trips = await getData();
  return (
    <Main>
      <Report {...{ trips }} />
    </Main>
  );
}
