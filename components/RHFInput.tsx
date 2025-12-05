"use client";
import { DatePicker, Input } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useController, useFormContext } from "react-hook-form";

function toCalendarDate(value: string | Date | null): CalendarDate | null {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

export type RHFField = {
  name: string;
  label: string;
  type?: "date";
  required?: boolean;
};

const RHFInput = ({ label, required, ...props }: RHFField) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: props.name, control });

  if (props.type === "date") {
    return (
      <I18nProvider locale="pl-PL">
        <DatePicker
          id={field.name}
          label={label}
          value={toCalendarDate(field.value ?? null)}
          onChange={(date) => {
            const val = date
              ? `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
              : "";
            field.onChange(val);
          }}
          onBlur={field.onBlur}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message || "Pole jest wymagane"}
          isRequired={required}
        />
      </I18nProvider>
    );
  }

  return (
    <Input
      id={field.name}
      label={label}
      value={String(field.value ?? "")}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={!!fieldState.error}
      errorMessage={fieldState.error?.message || "Pole jest wymagane"}
      isRequired={required}
    />
  );
};

export default RHFInput;
