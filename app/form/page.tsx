import Main from "@/components/layout/MainLayout";
import { getTrips } from "@/lib/db";
import { sortTrips } from "@/lib/utils";
import Report from "@/components/report";

const getData = async () => {
  const tripsData = await getTrips();
  const trips = tripsData
    .map((t) => ({ ...t, number: t.wp_postmeta[0].meta_value }))
    .sort(sortTrips)
    .map((t) => ({
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
