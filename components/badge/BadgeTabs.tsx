"use client";

import { Table, Tabs } from "@heroui/react";
import type { BadgeScorerWithDetails, ElementorData } from "@/types";

interface BadgeTabsProps {
  rulesPageContent?: ElementorData;
  scorers?: BadgeScorerWithDetails[];
  degrees?: { id: number; name: string }[];
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
  scorers = [],
  degrees = [],
}: Readonly<BadgeTabsProps>) {
  const groupedScorers = degrees.map((degree) => ({
    degree,
    scorers: scorers.filter((s) => s.degree_id === degree.id),
  }));
  const ungroupedScorers = scorers.filter((s) => s.degree_id == null);

  return (
    <Tabs>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Odznaki">
          <Tabs.Tab id="regulamin">
            Regulamin
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="lista">
            Lista zdobywców
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="regulamin">
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
      </Tabs.Panel>
      <Tabs.Panel id="lista">
        {groupedScorers.map(({ degree, scorers: degreeScorers }) => (
          <div key={degree.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{degree.name}</h3>
            {degreeScorers.length > 0 ? (
              <Table>
                <Table.ScrollContainer>
                  <Table.Content aria-label={`Zdobywcy stopnia ${degree.name}`}>
                    <Table.Header>
                      <Table.Column isRowHeader>Uczestnik</Table.Column>
                      <Table.Column>Klub / miasto</Table.Column>
                      <Table.Column>Data</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {degreeScorers.map((scorer) => (
                        <Table.Row key={scorer.id}>
                          <Table.Cell>{scorer.participant.name}</Table.Cell>
                          <Table.Cell>{scorer.participant.origin}</Table.Cell>
                          <Table.Cell>
                            {new Date(scorer.date).toLocaleDateString("pl-PL")}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            ) : (
              <p className="text-gray-500">Brak zdobywców</p>
            )}
          </div>
        ))}
        {ungroupedScorers.length > 0 && (
          <div className="mb-8">
            {degrees.length > 0 && (
              <h3 className="text-xl font-semibold mb-2">Inne</h3>
            )}
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Pozostali zdobywcy odznaki">
                  <Table.Header>
                    <Table.Column isRowHeader>Uczestnik</Table.Column>
                    <Table.Column>Klub / miasto</Table.Column>
                    <Table.Column>Data</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {ungroupedScorers.map((scorer) => (
                      <Table.Row key={scorer.id}>
                        <Table.Cell>{scorer.participant.name}</Table.Cell>
                        <Table.Cell>{scorer.participant.origin}</Table.Cell>
                        <Table.Cell>
                          {new Date(scorer.date).toLocaleDateString("pl-PL")}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        )}
        {degrees.length === 0 && ungroupedScorers.length === 0 && (
          <p className="text-gray-500">Brak danych o zdobywcach</p>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
