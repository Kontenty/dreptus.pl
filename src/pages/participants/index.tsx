import {
  DataTable,
  DataTableSelectionChangeParams,
} from "primereact/datatable";
import { Column } from "primereact/column";
import Main from "components/layout/MainLayout";
import { getParticipantsPostsList } from "lib/db";
import { PostResponse } from "src/types";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const { atrips, nonATrips } = await getParticipantsPostsList();
  if (!atrips || !nonATrips) {
    throw new Error("lists of participants - fetch data error");
  }
  return {
    props: {
      atrips: JSON.parse(JSON.stringify(atrips)) || null,
      nonATrips: JSON.parse(JSON.stringify(nonATrips)) || null,
      revalidate: 60 * 60 * 12,
    },
  };
};

const dateTmpl = (row: PostResponse) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(row.post_modified));
const titleTmpl = (row: PostResponse) =>
  row.post_title.replace(/,{0,1}<br>/, ", ");

type List = (PostResponse & { participants: string })[];
type Props = { atrips: List; nonATrips: List };

export default function Participants({ atrips, nonATrips }: Props) {
  const router = useRouter();
  const handleSelect = (ev: DataTableSelectionChangeParams) => {
    setTimeout(() => {
      router.push(`/participants/${ev.value.post_name}`);
    }, 300);
  };
  return (
    <Main>
      <article
        className="flex flex-col gap-2 min-w-[670px] overflow-x-auto"
        data-aos="fade-up"
      >
        <div>
          <h2 className="text-3xl">Z Dreptusiem po Dolinie Bugu</h2>
          <DataTable
            className="min-w-[450px]"
            currentPageReportTemplate="{first} do {last} z {totalRecords}"
            dataKey="ID"
            onSelectionChange={handleSelect}
            responsiveLayout="scroll"
            selectionMode="single"
            // size={isMd ? "normal" : "small"}
            value={atrips}
          >
            <Column body={titleTmpl} header="Nazwa Trasy"></Column>
            <Column
              align="center"
              field="participants"
              header="Liczba Uczestników"
            ></Column>
            <Column body={dateTmpl} header="Data Aktualizacji"></Column>
          </DataTable>
        </div>
        <div>
          <h2 className="text-3xl">Z Dreptusiem po Polsce</h2>
          <DataTable
            className="min-w-[450px]"
            currentPageReportTemplate="{first} do {last} z {totalRecords}"
            dataKey="ID"
            onSelectionChange={handleSelect}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            responsiveLayout="scroll"
            rows={50}
            rowsPerPageOptions={[20, 50, 100, 200]}
            selectionMode="single"
            // size={isMd ? "normal" : "small"}
            value={nonATrips}
          >
            <Column body={titleTmpl} header="Nazwa Trasy"></Column>
            <Column
              align="center"
              field="participants"
              header="Liczba Uczestników"
            ></Column>
            <Column body={dateTmpl} header="Data Aktualizacji"></Column>
          </DataTable>
        </div>
        ;
      </article>
    </Main>
  );
}
