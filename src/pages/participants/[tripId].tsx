import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { getParticipantBySlug, getParticipantSlugs } from "lib/db";
import MainLayout from "components/layout/MainLayout";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import { formatDate } from "lib/utils";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tripId = Number(params?.tripId);
  if (typeof tripId === "number") {
    const data = await getParticipantBySlug(tripId);
    if (!data) {
      return { notFound: true };
    }
    const list = data.map((el) => ({ ...el, ...el.participant }));
    return {
      props: {
        params,
        data: list ?? null,
      },
      revalidate: 60 * 60 * 12,
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getParticipantSlugs();
  return {
    paths:
      slugs?.map((slug) => ({
        params: {
          tripId: `${slug?.trip_id}`,
        },
      })) || [],
    fallback: "blocking",
  };
};

const cleantitle = (title: string) =>
  title.replace("<br>", " ").replaceAll("  ", " ");

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TripParticipants = ({ data }: Props) => {
  const { isFallback } = useRouter();

  return isFallback ? (
    <div className="w-full h-80 center-hv">
      <ProgressSpinner />
    </div>
  ) : (
    <MainLayout>
      <header>
        <h2 className="text-xl text-slate-700">Lista uczestników</h2>
        <h1 className="text-2xl">{cleantitle(data[0].trip.post_title)}</h1>
      </header>
      <DataTable
        className="min-w-[450px]"
        currentPageReportTemplate="{first} do {last} z {totalRecords}"
        dataKey="id"
        paginator={data.length > 50}
        // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        responsiveLayout="scroll"
        rows={50}
        // rowsPerPageOptions={[20, 50, 100, 200]}
        // size={isMd ? "normal" : "small"}
        value={data}
      >
        <Column
          body={(_, options) => options.rowIndex + 1}
          header="L.p."
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="name" header="Imię i nazwisko"></Column>
        <Column field="origin" header="Nazwa zespołu / miejscowość"></Column>
        <Column
          body={(d) => formatDate(d.report_date)}
          field="report_date"
          header="Data zgłoszenia"
        ></Column>
        <Column field="answers" header="Liczba odpowiedzi"></Column>
      </DataTable>
    </MainLayout>
  );
};

export default TripParticipants;
