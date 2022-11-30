import React, { useEffect, useRef } from "react";
import { Formik, Form, useField, Field } from "formik";
import { Messages } from "primereact/messages";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import * as Yup from "yup";
import cl from "classnames";
import { locale, addLocale } from "primereact/api";

import Main from "components/layout/MainLayout";
import { getTrips } from "lib/db";
import { Post } from "src/types";
import { sortTrips } from "lib/utils";

addLocale("pl", {
  accept: "Tak",
  reject: "Nie",
  choose: "Wybierz",
  upload: "Wyślij",
  cancel: "Anuluj",
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  dayNamesMin: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "STY",
    "LUT",
    "MAR",
    "KWI",
    "MAJ",
    "CZE",
    "LIP",
    "SIE",
    "WRZ",
    "PAŹ",
    "LIS",
    "GRU",
  ],
  today: "Dziś",
  clear: "Wyczyść",
  weekHeader: "tydz.",
  firstDayOfWeek: 0,
  dateFormat: "dd/mm/yyyy",
  weak: "Słaby",
  medium: "Umiarkowany",
  strong: "Silny",
  passwordPrompt: "Podaj hasło",
});
locale("pl");

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

const FormikInput = ({ label, type, ...props }: FField) => {
  const [field, meta] = useField(props);
  if (type === "date") {
    return (
      <div>
        <span className="p-float-label">
          <Calendar
            id="basic"
            {...field}
            {...props}
            locale="pl"
            dateFormat="dd-mm-yy"
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

interface Props {
  trips: { value: string; label: string }[];
}
export default function StartForm({ trips }: Props) {
  const msg = useRef<Messages>(null);
  useEffect(() => {
    if (msg && msg.current) {
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
    <Main>
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
          checked: Yup.boolean().oneOf([true], "Wymagane jest wyraenie zgody"),
        })}
        onSubmit={(data) => {
          console.log(data);
          fetch("/api/trip-report", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        {(formik) => (
          <Form className="w-[1000px] ">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-fluid">
              <div className="col-span-2">
                <Dropdown
                  // value={city}
                  {...formik.getFieldProps("trip")}
                  options={trips}
                  filter
                  // onChange={(e) => setCity(e.value)}
                  placeholder="Wybierz przebytą trasę"
                  className={cl({
                    "p-invalid": formik.errors.trip && formik.touched.trip,
                  })}
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
                    label={`Odpwiedź ${num + 1}`}
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
              type="text"
              name="add"
              className="h-6 opacity-0 pointer-events-none"
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
                <label htmlFor="cb1" className="p-checkbox-label">
                  <small>
                    WYRAŻAM ZGODĘ NA UMIESZCZENIE DANYCH NA STRONIE
                    HTTPS://DREPTUŚ.PL*
                  </small>
                </label>
              </div>
              {formik.errors.checked && formik.touched.checked ? (
                <small className="p-error">{formik.errors.checked}</small>
              ) : null}
            </div>
            <Button
              aria-label="submit"
              type="submit"
              className="p-button-raised mt-6 w-44"
              label="Wyślij"
            ></Button>
          </Form>
        )}
      </Formik>
    </Main>
  );
}

export const getStaticProps = async () => {
  const tripsData: Post[] = await getTrips(10000);
  const trips = tripsData.sort(sortTrips).map((t) => ({
    label: `${t.number} ${t.post_title.replace("<br>", " - ")}`,
    value: t.post_name,
  }));
  return {
    props: {
      trips: trips || [],
    },
  };
};
