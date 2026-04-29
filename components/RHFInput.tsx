"use client";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

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
      <TextField isRequired={required} name={field.name}>
        <Label>{label}</Label>
        <Input
          id={field.name}
          onBlur={field.onBlur}
          onChange={(event) => field.onChange(event.target.value)}
          type="date"
          value={String(field.value ?? "")}
        />
        <FieldError>
          {fieldState.error?.message || "Pole jest wymagane"}
        </FieldError>
      </TextField>
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
