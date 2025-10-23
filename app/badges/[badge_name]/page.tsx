export const revalidate = 86400; // 24 hours

import { TabPanel, TabView } from "primereact/tabview";

import Main from "@/components/ui/Main";
import { getElementorPage, getPage } from "@/lib/db";
import type { ElementorData, ElementorElement } from "@/types";

const dict: Record<string, { rules: number; scorers: number }> = {
  "z-dreptusiem-po-polsce": { rules: 11620, scorers: 21255 },
  "z-dreptusiem-po-dolinie-bugu": { rules: 11617, scorers: 21319 },
  "z-dreptusiem-traktem-krolewskim": { rules: 14076, scorers: 21322 },
};

const getData = async (params: { badge_name?: string }) => {
  if (!params?.badge_name || typeof params.badge_name !== "string") {
    return;
  }
  const { rules: rulesPageId, scorers: scorersPageId } = dict[
    params.badge_name
  ] || {
    rules: 11620,
    scorers: 21255,
  };
  const elementorData = await getElementorPage(rulesPageId);
  const pageData = await getPage(scorersPageId);

  return {
    rulesPageContent: JSON.parse(elementorData ?? "[]") as ElementorData,
    scorersContent: pageData?.post_content ?? "",
  };
};

const mapElementor = (node: ElementorElement) => {
  if (node?.settings?.title) {
    return (
      <h1
        className="page-title text-center"
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
  return;
};

type Props = {
  params: Promise<{
    badge_name: string;
  }>;
};
export default async function Badges({ params }: Readonly<Props>) {
  const resParams = await params;
  const data = await getData(resParams);
  return (
    <Main>
      <div>
        <TabView>
          <TabPanel header="Regulamin">
            <article className="pl-4 w-[1000px] elementor post-article">
              {data?.rulesPageContent
                ? data.rulesPageContent?.[0].elements.map((el) => {
                    if (el.settings.title) {
                      return (
                        <h1 className="page-title" key={el.id}>
                          {el.settings.title}
                        </h1>
                      );
                    }
                    if (el.settings.editor) {
                      return (
                        <section key={el.id}>{el.settings.editor}</section>
                      );
                    }
                    if (el?.elements?.length) {
                      return el.elements.map(mapElementor);
                    }
                    return null;
                  })
                : null}
            </article>
          </TabPanel>
          <TabPanel header="Lista zdobywców">
            <article
              className="format-table w-[1000px]"
              dangerouslySetInnerHTML={{
                __html: data?.scorersContent ?? "",
              }}
            />
          </TabPanel>
        </TabView>
      </div>
    </Main>
  );
}
