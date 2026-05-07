"use client";

import type { DateValue } from "@heroui/react";
import {
  Calendar,
  DateField,
  FieldError,
  DatePicker as HeroDatePicker,
  Label,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import type { FocusEvent } from "react";
import { useRef } from "react";

type DatePickerValue = DateValue | Date | string | null | undefined;

type Props = {
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  onBlur?: () => void;
  onChange: (value: DateValue | null) => void;
  value: DatePickerValue;
};

const toDateValue = (value: ReturnType<typeof parseDate>) =>
  value as unknown as DateValue;

export const getDatePickerValueAsString = (value: DateValue | null) =>
  value?.toString() ?? "";

export const getDatePickerValueAsDate = (value: DateValue | null) => {
  if (!value) {
    return null;
  }

  return new Date(value.year, value.month - 1, value.day);
};

const parseDatePickerValue = (value: DatePickerValue): DateValue | null => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return toDateValue(
      parseDate(
        `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(value.getDate()).padStart(2, "0")}`,
      ),
    );
  }

  if (typeof value === "string") {
    if (!value) {
      return null;
    }

    try {
      return toDateValue(parseDate(value.slice(0, 10)));
    } catch {
      return null;
    }
  }

  return value;
};

const DatePicker = ({
  errorMessage,
  isInvalid,
  isRequired,
  label,
  name,
  onBlur,
  onChange,
  value,
}: Props) => {
  const isCalendarOpenRef = useRef(false);

  const handleBlur = (event: FocusEvent<Element>) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      nextFocusedElement instanceof Node &&
      event.currentTarget.contains(nextFocusedElement)
    ) {
      return;
    }

    if (isCalendarOpenRef.current) {
      return;
    }

    onBlur?.();
  };

  const handleOpenChange = (isOpen: boolean) => {
    isCalendarOpenRef.current = isOpen;

    if (!isOpen) {
      onBlur?.();
    }
  };

  return (
    <HeroDatePicker
      className="w-full"
      isInvalid={isInvalid}
      isRequired={isRequired}
      name={name}
      onBlur={handleBlur}
      onChange={onChange}
      onOpenChange={handleOpenChange}
      value={parseDatePickerValue(value)}
    >
      <Label>{label}</Label>
      <DateField.Group>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HeroDatePicker.Trigger>
            <HeroDatePicker.TriggerIndicator />
          </HeroDatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <FieldError>{errorMessage || "Pole jest wymagane"}</FieldError>
      <HeroDatePicker.Popover>
        <Calendar aria-label={label}>
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </HeroDatePicker.Popover>
    </HeroDatePicker>
  );
};

export default DatePicker;
