"use client";
import cl from "classnames";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useController, useFormContext } from "react-hook-form";

export type RHFField = {
  name: string;
  label: string;
  type?: "date";
};

const RHFInput = ({ label, ...props }: RHFField) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name: props.name, control });

  if (props.type === "date") {
    return (
      <div>
        <span className="p-float-label">
          <Calendar
            id={field.name}
            value={field.value ? new Date(String(field.value)) : null}
            onChange={(e) => {
              const val = e.value
                ? (e.value as Date).toISOString().split("T")[0]
                : "";
              field.onChange(val);
            }}
            dateFormat="dd-mm-yy"
          />
          <label htmlFor={field.name}>{label}</label>
        </span>
        {fieldState.error ? (
          <small className="p-error">
            {fieldState.error.message || "Pole jest wymagane"}
          </small>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <span className="p-float-label">
        <InputText
          id={field.name}
          value={String(field.value ?? "")}
          onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
          onBlur={field.onBlur}
          className={cl({
            "p-invalid": fieldState.error,
          })}
        />
        <label htmlFor={field.name}>{label}</label>
      </span>
      {fieldState.error ? (
        <small className="p-error">
          {fieldState.error.message || "Pole jest wymagane"}
        </small>
      ) : null}
    </div>
  );
};

export default RHFInput;
