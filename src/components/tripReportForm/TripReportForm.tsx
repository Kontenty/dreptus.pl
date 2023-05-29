import React, { useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import * as Yup from "yup";
import cl from "classnames";

import FormikInput from "components/FormikInput";

type FField = {
  name: string;
  label: string;
  type?: "date";
};
const fields1: FField[] = [
  { name: "fullName", label: "Imię i nazwisko" },
  { name: "email", label: "Adres email" },
  { name: "date", label: "Data przebycia trasy", type: "date" },
  { name: "location", label: "Klub / miejscowość" },
];

interface Props {
  trips: { value: string; label: string }[];
  onSuccess: () => void;
}
export default function TripReportForm({ trips, onSuccess }: Props) {
  const msg = useRef<Messages>(null);
  useEffect(() => {
    if (msg?.current) {
      msg.current?.show([
        {
          severity: "error",
          summary: "",
          detail:
            "Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, tzw. RODO), przesyłający odpowiedzi wyraża zgodę na publikację na liście osób, które przebyły trasę na stronie internetowej https://dreptuś.pl/.",
          sticky: false,
          life: 6000,
        },
      ]);
    }
  }, []);

  return (
    <>
      <div className="w-full">
        <Messages ref={msg} />
      </div>
      <Formik
        initialValues={{
          trip: "",
          fullName: "",
          email: "",
          date: null,
          location: "",
          checked: false,
          add: "null",
        }}
        onSubmit={(data) => {
          fetch("/api/trip-report", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.ok && onSuccess());
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .min(4, "Min 4 znaki")
            .required("Pole jest wymagane"),
          date: Yup.string().nullable().required("Pole jest wymagane"),
          trip: Yup.string().nullable().required("Pole jest wymagane"),
          location: Yup.string().required("Pole jest wymagane"),
          email: Yup.string()
            .email("Nieprawidłowy adres")
            .required("Pole jest wymagane"),
          checked: Yup.boolean().oneOf([true], "Wymagane jest wyrażenie zgody"),
        })}
      >
        {(formik) => (
          <Form className="max-w-[1000px] ">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 p-fluid">
              <div className="md:col-span-2">
                <Dropdown
                  {...formik.getFieldProps("trip")}
                  className={cl({
                    "p-invalid": formik.errors.trip && formik.touched.trip,
                  })}
                  filter
                  options={trips}
                  placeholder="Wybierz przebytą trasę"
                />
                {formik.touched.trip && formik.errors.trip ? (
                  <small className="p-error">{formik.errors.trip}</small>
                ) : null}
              </div>
              {fields1.map((f, i) => (
                <FormikInput key={i + f.name} {...f} />
              ))}
              {Array.from(Array(30).keys()).map((num) => (
                <React.Fragment key={"question" + num}>
                  <FormikInput
                    label={`Odpowiedź ${num + 1}`}
                    name={`answer-${num + 1}`}
                  />
                  <FormikInput
                    label={`Uwagi ${num + 1}`}
                    name={`adnotations-${num + 1}`}
                  />
                </React.Fragment>
              ))}
            </div>
            <Field
              className="h-6 opacity-0 pointer-events-none"
              name="add"
              type="text"
            />
            <div>
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="cb1"
                  {...formik.getFieldProps("checked")}
                  checked={formik.values.checked}
                  className={cl({
                    "p-invalid":
                      formik.errors.checked && formik.touched.checked,
                  })}
                ></Checkbox>
                <label className="p-checkbox-label" htmlFor="cb1">
                  <small>
                    Wyrażam zgodę na przetwarzanie danych osobowych przez
                    dreptuś.pl w celu weryfikacji zgłoszenia *
                  </small>
                </label>
              </div>
              {formik.errors.checked && formik.touched.checked ? (
                <small className="p-error">{formik.errors.checked}</small>
              ) : null}
            </div>
            {/* <div>
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="cb1"
                  {...formik.getFieldProps("checked")}
                  checked={formik.values.checked}
                  className={cl({
                    "p-invalid":
                      formik.errors.checked && formik.touched.checked,
                  })}
                ></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label">
                  <small>
                    Wyrażam zgodę na umieszczenie mojego imienia i nazwiska na
                    liście uczestników na stronie dreptuś.pl
                  </small>
                </label>
              </div>
            </div> */}
            <Button
              aria-label="submit"
              className="p-button-raised mt-6 w-44"
              label="Wyślij"
              type="submit"
            ></Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
