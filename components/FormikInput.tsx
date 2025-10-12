import React from "react";
import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import cl from "classnames";

type FField = {
  name: string;
  label: string;
  type?: "date";
};

const FormikInput = ({ label, type, ...props }: FField) => {
  const [field, meta] = useField(props);

  if (type === "date") {
    // Set locale based on environment - "en" for SSR, "pl" for client-side
    const isServer = typeof window === "undefined";
    const locale = isServer ? "en" : "pl";
    return (
      <div>
        <span className="p-float-label">
          <Calendar
            id="basic"
            {...field}
            {...props}
            dateFormat="dd-mm-yy"
            locale={locale}
          />
          <label htmlFor={field.name}>{label}</label>
        </span>
        {meta.touched && meta.error ? (
          <small className="p-error">{meta.error}</small>
        ) : null}
      </div>
    );
  }
  return (
    <div>
      <span className="p-float-label">
        <InputText
          id={field.name}
          {...field}
          {...props}
          className={cl({ "p-invalid": meta.touched && meta.error })}
        />
        <label htmlFor={field.name}>{label}</label>
      </span>
      {meta.touched && meta.error ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </div>
  );
};

export default FormikInput;
