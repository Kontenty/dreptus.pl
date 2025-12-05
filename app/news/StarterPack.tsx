"use client";

import { Accordion, AccordionItem } from "@heroui/react";

export default function StarterPack({ content }: { content?: string }) {
  return (
    <Accordion variant="shadow">
      <AccordionItem key="pakiety" title="Pakiety">
        {content && (
          <div
            className="format-table"
            dangerouslySetInnerHTML={{
              __html: content ?? "",
            }}
          />
        )}
      </AccordionItem>
    </Accordion>
  );
}
