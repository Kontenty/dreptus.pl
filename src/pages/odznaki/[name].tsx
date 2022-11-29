import { GetStaticPaths, GetStaticPropsContext } from "next";
import Main from "components/layout/MainLayout";
import { getElementorPage } from "lib/db";
import { ElementorData, ElementorElement } from "src/types";

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
    const content = await getElementorPage(id);
    return {
      props: { content: JSON.parse(content) || null }, // will be passed to the page component as props
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

const mapElementor = (node: ElementorElement) => {
  if (node?.settings?.title) {
    return (
      <h1
        key={node.id}
        className="text-4xl text-center mb-4"
        dangerouslySetInnerHTML={{ __html: node.settings.title }}
      ></h1>
    );
  }
  if (node?.settings?.editor) {
    return (
      <section
        key={node.id}
        className="elementor"
        dangerouslySetInnerHTML={{
          __html: node.settings.editor.replaceAll('style="color: #000080;', ""),
        }}
      ></section>
    );
  }
};

type Props = { content: ElementorData };
export default function Odznaki({ content }: Props) {
  return (
    <Main>
      <article className="">
        {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
        {content
          ? content?.[0].elements.map((el) => {
              if (el.settings.title) {
                return <h1 key={el.id}>{el.settings.title}</h1>;
              }
              if (el.settings.editor) {
                return <section key={el.id}>{el.settings.editor}</section>;
              }
              if (el?.elements?.length) {
                return el.elements.map(mapElementor);
              }
            })
          : null}
      </article>
    </Main>
  );
}
