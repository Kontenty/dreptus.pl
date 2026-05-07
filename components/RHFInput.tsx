"use client";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";
import DatePicker, {
  getDatePickerValueAsDate,
  getDatePickerValueAsString,
} from "@/components/ui/DatePicker";

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
      <DatePicker
        errorMessage={fieldState.error?.message}
        isInvalid={!!fieldState.error}
        isRequired={required}
        label={label}
        name={field.name}
        onBlur={field.onBlur}
        onChange={(value) => {
          field.onChange(
            field.value instanceof Date
              ? getDatePickerValueAsDate(value)
              : getDatePickerValueAsString(value),
          );
        }}
        value={field.value}
      />
    );
  }

  return (
    <TextField isRequired={required} name={field.name}>
      <Label>{label}</Label>
      <Input
        id={field.name}
        onBlur={field.onBlur}
        onChange={(event) => field.onChange(event.target.value)}
        value={String(field.value ?? "")}
      />
      <FieldError>
        {fieldState.error?.message || "Pole jest wymagane"}
      </FieldError>
    </TextField>
  );
};

export default RHFInput;
