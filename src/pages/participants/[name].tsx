import React from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { InferGetStaticPropsType } from "next";
import { getParticipantBySlug, getParticipantSlugs } from "lib/db";
import MainLayout from "components/layout/MainLayout";
import css from "src/styles//Participant.module.css";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.name && typeof params.name === "string") {
    const data = await getParticipantBySlug(params.name);
    if (!data) {
      // If there is a server error, you might want to
      // throw an error instead of returning so that the cache is not updated
      // until the next successful request.
      throw new Error("Failed to fetch participants data");
    }
    return {
      props: {
        params,
        data: data ? JSON.parse(JSON.stringify(data)) : null,
      },
      revalidate: 60,
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
          name: `${slug?.post_name}`,
          id: slug?.ID,
        },
      })) || [],
    fallback: true,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TripParticipants = ({ data }: Props) => {
  const { isFallback } = useRouter();

  return isFallback ? (
    <div className="w-full h-80 center-hv">
      <ProgressSpinner />
    </div>
  ) : (
    <MainLayout>
      <h1
        className="text-2xl text-right"
        dangerouslySetInnerHTML={{ __html: data.post_title }}
      />
      <div
        className={css.mainList}
        dangerouslySetInnerHTML={{ __html: data.post_content }}
      />
    </MainLayout>
  );
};

export default TripParticipants;
