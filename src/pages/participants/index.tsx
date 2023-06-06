import { InferGetStaticPropsType } from "next";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import Main from "components/layout/MainLayout";
import { getTripsParticipants } from "lib/db";
import { PostResponse } from "src/types";
import { useRouter } from "next/router";
import { formatDate } from "lib/utils";

const dummyListEl = {
  id: 0,
  trip_id: 0,
  report_date: null,
  pptCount: null,
};

export const getStaticProps = async () => {
  const trips = await getTripsParticipants();
  if (!trips) {
    throw new Error("lists of participants - fetch data error");
  }
  const chunked = trips.reduce((result, current) => {
    if (/^[A-Z][0-9]{2}/.test(current.post_title)) {
      result[0] ? result[0].push(current) : (result[0] = [current]);
    } else if (/^[0-9]{3}/.test(current.post_title)) {
      result[1] ? result[1].push(current) : (result[1] = [current]);
    } else if (/^#[0-9]{2}/.test(current.post_title)) {
      result[2] ? result[2].push(current) : (result[2] = [current]);
    }
    return result;
  }, [] as (typeof trips)[]);
  chunked.unshift([
    { ...dummyListEl, post_title: "Z Dreptusiem po Dolinie Bugu:", id: 100001 },
  ]);
  chunked.splice(2, 0, [
    { ...dummyListEl, post_title: "Z Dreptusiem po Polsce:", id: 100002 },
  ]);
  return {
    props: {
      trips: chunked.flat() || null,
      revalidate: 60 * 60 * 12,
    },
  };
};

const titleTmpl = (row: PostResponse) =>
  /^Z Dreptusiem/i.test(row.post_title) ? (
    <span className="font-bold text-lg">{row.post_title}</span>
  ) : (
    row.post_title.replace(/,{0,1}<br>/, ", ")
  );

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type Trip = Props["trips"][0];

export default function Participants({ trips }: Props) {
  const router = useRouter();

  const handleSelect = (ev: DataTableSelectionChangeEvent<Trip[]>) => {
    const value = ev.value as Trip;
    if (value.trip_id) {
      setTimeout(() => {
        router.push(`/participants/${value.trip_id}`);
      }, 300);
    }
  };
  return (
    <Main>
      <article
        className="flex flex-col gap-2 min-w-[670px] overflow-x-auto"
        data-aos="fade-up"
      >
        <div>
          <h2 className="text-3xl">Lista uczestników tras</h2>
          <DataTable
            className="min-w-[450px]"
            currentPageReportTemplate="{first} do {last} z {totalRecords}"
            dataKey="id"
            onSelectionChange={handleSelect}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            responsiveLayout="scroll"
            rows={50}
            rowsPerPageOptions={[20, 50, 100, 200]}
            selectionMode="single"
            // size={isMd ? "normal" : "small"}
            value={trips}
          >
            <Column body={titleTmpl} header="Nazwa Trasy"></Column>
            <Column
              align="center"
              body={(d) => Number(d.pptCount) || ""}
              field="pptCount"
              header="Liczba Uczestników"
            ></Column>
            <Column
              body={(d) => formatDate(d.report_date)}
              header="Data Aktualizacji"
            ></Column>
          </DataTable>
        </div>
      </article>
    </Main>
  );
}
