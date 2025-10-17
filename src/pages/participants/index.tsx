import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import Main from "components/layout/MainLayout";
import { getTripsParticipants } from "lib/db";
import { formatDate, sortTrips } from "lib/utils";
import { PostResponse } from "src/types";

const dummyListEl = {
  id: 0,
  trip_id: 0,
  report_date: null,
  pptCount: null,
  number: "",
};

const sectionTitles = [
  "Z Dreptusiem po Dolinie Bugu:",
  "Z Dreptusiem na Szlaku Jabłkowym:",
  "Z Dreptusiem po Polsce:",
  "Z Dreptusiem po Europie:",
];

export const getStaticProps = async () => {
  const trips = await getTripsParticipants();
  if (!trips) {
    throw new Error("lists of participants - fetch data error");
  }
  // safer chunking: initialize explicit section arrays and coerce number to string
  const sections = [[], [], [], []] as (typeof trips)[];
  const sorted = [...trips].sort(sortTrips);

  for (const current of sorted) {
    const num = String(current.number || "");
    if (/^A[0-9]{2}/i.test(num)) {
      sections[0].push(current);
    } else if (/^B[0-9]{2}/i.test(num)) {
      sections[1].push(current);
    } else if (/^[0-9]{3}/.test(num)) {
      sections[2].push(current);
    } else if (/^#[0-9]{2}/.test(num)) {
      sections[3].push(current);
    }
  }

  const chunked = [] as (typeof trips)[0][];
  // inject section headers and concatenate
  chunked.push({ ...dummyListEl, post_title: sectionTitles[0], id: 100001 });
  chunked.push(...sections[0]);
  chunked.push({ ...dummyListEl, post_title: sectionTitles[1], id: 100002 });
  chunked.push(...sections[1]);
  chunked.push({ ...dummyListEl, post_title: sectionTitles[2], id: 100003 });
  chunked.push(...sections[2]);
  chunked.push({ ...dummyListEl, post_title: sectionTitles[3], id: 100004 });
  chunked.push(...sections[3]);

  return {
    props: {
      trips: chunked || null,
    },
    revalidate: 60 * 60 * 12,
  };
};

const titleTmpl = (row: PostResponse) =>
  sectionTitles.includes(row.post_title) ? (
    <span className="font-semibold text-lg">{row.post_title}</span>
  ) : (
    row.post_title.replace(/,? ?<br>/, ", ")
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
          <h1 className="page-title">Lista uczestników tras</h1>
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
            <Column field="number" header="Numer"></Column>
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
