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
  const trips = await getParticipantsPostsList();
  if (!trips) {
    throw new Error("lists of participants - fetch data error");
  }
  const chunked = trips.reduce((result: PostResponse[][], current) => {
    if (/^[A-Z][0-9]{2}/.test(current.post_title)) {
      result[0] ? result[0].push(current) : (result[0] = [current]);
    } else if (/^[0-9]{3}/.test(current.post_title)) {
      result[1] ? result[1].push(current) : (result[1] = [current]);
    } else if (/^#[0-9]{2}/.test(current.post_title)) {
      result[2] ? result[2].push(current) : (result[2] = [current]);
    }
    return result;
  }, []);
  chunked.unshift([
    { post_title: "Z Dreptusiem po Dolinie Bugu:" } as PostResponse,
  ]);
  chunked.splice(2, 0, [
    { post_title: "Z Dreptusiem po Polsce:" } as PostResponse,
  ]);
  return {
    props: {
      trips: JSON.parse(JSON.stringify(chunked.flat())) || null,
      revalidate: 60 * 60 * 12,
    },
  };
};

const dateTmpl = (row: PostResponse) =>
  row.post_modified
    ? new Intl.DateTimeFormat("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(row.post_modified))
    : "";
const titleTmpl = (row: PostResponse) =>
  /^Z Dreptusiem/i.test(row.post_title) ? (
    <span className="font-bold text-lg">{row.post_title}</span>
  ) : (
    row.post_title.replace(/,{0,1}<br>/, ", ")
  );

type List = (PostResponse & { participants: string })[];
type Props = { trips: List };

export default function Participants({ trips }: Props) {
  const router = useRouter();
  const handleSelect = (ev: DataTableSelectionChangeParams) => {
    if (ev.value.post_name) {
      setTimeout(() => {
        router.push(`/participants/${ev.value.post_name}`);
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
            dataKey="ID"
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
