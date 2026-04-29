"use client";

import { Accordion } from "@heroui/react";

export default function StarterPack({ content }: { content?: string }) {
  return (
    <Accordion variant="surface">
      <Accordion.Item id="pakiety">
        <Accordion.Heading>
          <Accordion.Trigger>
            Pakiety
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            {content && (
              <div
                className="format-table"
                dangerouslySetInnerHTML={{
                  __html: content ?? "",
                }}
              />
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
