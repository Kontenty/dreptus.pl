"use client";

import { Tab, Tabs } from "@heroui/react";
import type { ElementorData } from "@/types";

interface BadgeTabsProps {
  rulesPageContent?: ElementorData;
  scorersContent?: string;
}

interface ElementorNode {
  id: string;
  settings?: {
    title?: string;
    editor?: string;
  };
}

const mapElementor = (node: ElementorNode) => {
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
  return null;
};

export default function BadgeTabs({
  rulesPageContent,
  scorersContent,
}: Readonly<BadgeTabsProps>) {
  return (
    <Tabs>
      <Tab key="regulamin" title="Regulamin">
        <article className="pl-4 w-250 elementor post-article">
          {rulesPageContent
            ? rulesPageContent?.[0].elements.map((el) => {
                if (el.settings.title) {
                  return (
                    <h1 className="page-title" key={el.id}>
                      {el.settings.title}
                    </h1>
                  );
                }
                if (el.settings.editor) {
                  return <section key={el.id}>{el.settings.editor}</section>;
                }
                if (el?.elements?.length) {
                  return el.elements.map(mapElementor);
                }
                return null;
              })
            : null}
        </article>
      </Tab>
      <Tab key="lista" title="Lista zdobywców">
        <article
          className="format-table w-250"
          dangerouslySetInnerHTML={{
            __html: scorersContent ?? "",
          }}
        />
      </Tab>
    </Tabs>
  );
}
