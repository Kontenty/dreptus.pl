import { GetStaticPaths, GetStaticPropsContext } from "next";
import Main from "components/layout/MainLayout";
import { getPage } from "lib/db";
import { PostResponse } from "types";

const dict: Record<string, number> = {
  "z-dreptusiem-po-polsce": 11620,
  "z-dreptusiem-po-dolinie-bugu": 11617,
  "z-dreptusiem-traktem-krolewskim": 14076,
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { name: "z-dreptusiem-po-polsce" } },
      { params: { name: "z-dreptusiem-po-dolinie-bugu" } },
      { params: { name: "z-dreptusiem-traktem-krolewskim" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.name && typeof params.name === "string") {
    const id = dict[params.name] || 11620;
    const content = await getPage(id);
    return {
      props: { content }, // will be passed to the page component as props
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

type Props = { content: PostResponse };
export default function Odznaki({ content }: Props) {
  return (
    <Main>
      <article className="prose lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: content?.post_content }}></div>
      </article>
    </Main>
  );
}
