import React from "react";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "next";
import { getParticipantBySlug, getParticipantSlugs } from "lib/db";
import MainLayout from "components/layout/MainLayout";
import css from "src/styles//Particioant.module.css";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.name && typeof params.name === "string") {
    const data = await getParticipantBySlug(params.name);
    return {
      props: {
        params,
        data: data ? JSON.parse(JSON.stringify(data)) : null,
      },
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
    fallback: false,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TripParticipants = ({ data }: Props) => {
  return (
    <MainLayout>
      <h1
        className="text-2xl text-right"
        dangerouslySetInnerHTML={{ __html: data.post_title }}
      />
      <div
        className={css.table}
        dangerouslySetInnerHTML={{ __html: data.post_content }}
      />
    </MainLayout>
  );
};

export default TripParticipants;
