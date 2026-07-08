"use client";

import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import { useState } from "react";
import useSWR from "swr";
import { getParticipants } from "@/lib/actions/get-participants";
import type { Participant } from "@/lib/generated/prisma/client";

type ExtParticipant = {
  nameExt: string;
  id: number;
  name: string;
  origin: string;
};

type Props = {
  selectedParticipantId: number | null;
  participantName: string;
  onSelect: (participant: { id: number; name: string; origin: string }) => void;
  onInputChange: (value: string) => void;
  isDisabled?: boolean;
};

export default function ParticipantSearch({
  selectedParticipantId,
  participantName,
  onSelect,
  onInputChange,
  isDisabled = false,
}: Readonly<Props>) {
  const { data: participantsList } = useSWR<Participant[]>(
    "get-participants",
    () => getParticipants(),
  );
  const [suggestions, setSuggestions] = useState<ExtParticipant[]>([]);

  const search = (value: string) => {
    const name = value.toLowerCase();
    const filteredList = participantsList
      ?.filter((pp) => pp.name.toLowerCase().includes(name))
      .map((pp) => ({ ...pp, nameExt: `${pp.name} - ${pp.origin}` }));
    setSuggestions(filteredList ?? []);
  };

  return (
    <ComboBox
      id="participant-search"
      isDisabled={isDisabled}
      selectedKey={selectedParticipantId ? String(selectedParticipantId) : null}
      inputValue={participantName}
      onInputChange={(value) => {
        onInputChange(value);
        search(value);
      }}
      onSelectionChange={(key) => {
        if (key) {
          const selected = suggestions.find((s) => s.id === Number(key));
          if (selected) {
            onSelect({
              id: selected.id,
              name: selected.name,
              origin: selected.origin,
            });
          }
        }
      }}
    >
      <Label>Uczestnik</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Wpisz lub wybierz uczestnika" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          {suggestions.map((suggestion) => (
            <ListBox.Item
              id={String(suggestion.id)}
              key={suggestion.id}
              textValue={suggestion.nameExt}
            >
              {suggestion.nameExt}
            </ListBox.Item>
          ))}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}
