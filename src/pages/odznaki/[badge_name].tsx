import { GetStaticPaths, GetStaticPropsContext } from "next";
import { TabPanel, TabView } from "primereact/tabview";

import Main from "components/layout/MainLayout";
import { getElementorPage, getPage } from "lib/db";
import { ElementorData, ElementorElement, PostResponse } from "src/types";

const dict: Record<string, { rules: number; scorers: number }> = {
  "z-dreptusiem-po-polsce": { rules: 11620, scorers: 21255 },
  "z-dreptusiem-po-dolinie-bugu": { rules: 11617, scorers: 21319 },
  "z-dreptusiem-traktem-krolewskim": { rules: 14076, scorers: 21322 },
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { badge_name: "z-dreptusiem-po-polsce" } },
      { params: { badge_name: "z-dreptusiem-po-dolinie-bugu" } },
      { params: { badge_name: "z-dreptusiem-traktem-krolewskim" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.badge_name && typeof params.badge_name === "string") {
    const rulesPageId = dict[params.badge_name].rules || 11620;
    const scorersPageId = dict[params.badge_name].scorers || 21255;
    const rulesPageContent = await getElementorPage(rulesPageId);
    const scorersContent = await getPage(scorersPageId);

    return {
      props: {
        rulesPageContent: JSON.parse(rulesPageContent) || null,
        scorersContent,
        revalidate: 60 * 60 * 1,
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

const mapElementor = (node: ElementorElement) => {
  if (node?.settings?.title) {
    return (
      <h1
        className="text-4xl text-center mb-4"
        dangerouslySetInnerHTML={{ __html: node.settings.title }}
        key={node.id}
      ></h1>
    );
  }
  if (node?.settings?.editor) {
    return (
      <section
        className="elementor"
        dangerouslySetInnerHTML={{
          __html: node.settings.editor.replaceAll('style="color: #000080;', ""),
        }}
        key={node.id}
      ></section>
    );
  }
};

type Props = { rulesPageContent: ElementorData; scorersContent: PostResponse };
export default function Odznaki({ rulesPageContent, scorersContent }: Props) {
  return (
    <Main>
      <TabView>
        <TabPanel header="Regulamin">
          <article className="pl-4 w-[1000px]">
            {rulesPageContent
              ? rulesPageContent?.[0].elements.map((el) => {
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
        </TabPanel>
        <TabPanel header="Lista zdobywców">
          <div
            className="format-table w-[1000px]"
            dangerouslySetInnerHTML={{
              __html: scorersContent.post_content,
            }}
          />
        </TabPanel>
      </TabView>
    </Main>
  );
}
