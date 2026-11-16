"use client";

import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import { useMemo } from "react";
import useSWR from "swr";
import { useDebounce } from "@/hooks/useDebounce";
import { getParticipants } from "@/lib/actions/get-participants";
import type { Participant } from "@/lib/generated/prisma/client";

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

  const debouncedQuery = useDebounce(participantName, 200);

  const suggestions = useMemo(() => {
    if (!debouncedQuery || !participantsList) return [];
    const name = debouncedQuery.toLowerCase();
    return participantsList
      .filter((pp) => pp.name.toLowerCase().includes(name))
      .map((pp) => ({ ...pp, nameExt: `${pp.name} - ${pp.origin}` }))
      .slice(0, 50);
  }, [debouncedQuery, participantsList]);

  return (
    <ComboBox
      id="participant-search"
      isDisabled={isDisabled}
      value={selectedParticipantId ?? null}
      inputValue={participantName}
      onInputChange={(value) => {
        onInputChange(value);
      }}
      onChange={(key) => {
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
              id={suggestion.id}
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
