"use client";

import { Accordion } from "@heroui/react";

export default function StarterPack({
  content,
}: Readonly<{ content?: string }>) {
  return (
    <Accordion variant="surface" className="shadow">
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
