import React, { useRef } from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMountEffect } from "primereact/hooks";
import * as Yup from "yup";
import cl from "classnames";
import FormikInput from "@/components/FormikInput";
import { sendReport, type ReportValues } from "./sendReport";

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
export default function TripReportForm({
  trips,
  onSuccess: _onSuccess,
}: Readonly<Props>) {
  const msg = useRef<Messages>(null);
  useMountEffect(() => {
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
  });

  return (
    <>
      <div className="w-full">
        <Messages ref={msg} />
      </div>
      <h2 className="text-4xl mb-6 text-brand-green-dark">
        Formularz zgłoszenia
      </h2>
      <Formik
        initialValues={{
          trip: "",
          fullName: "",
          email: "",
          date: null,
          location: "",
          checked: false,
          add: "null",
          questions: Array(30).fill({ answer: "", annotation: "" }),
        }}
        onSubmit={async (_values: ReportValues, helpers) => {
          try {
            // call server action directly with serializable values
            const result = await sendReport(_values);
            if (result?.success) {
              // onSuccess();
              // helpers.resetForm();
            } else {
              msg.current?.show?.([
                {
                  severity: "error",
                  summary: "",
                  detail: result?.error || "Nie udało się wysłać formularza",
                  sticky: false,
                  life: 6000,
                },
              ]);
            }
          } catch (e) {
            msg.current?.show?.([
              {
                severity: "error",
                summary: "",
                detail: "Wystąpił błąd podczas wysyłania",
                sticky: false,
                life: 6000,
              },
            ]);
          } finally {
            helpers.setSubmitting(false);
          }
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
          questions: Yup.array()
            .of(
              Yup.object({
                answer: Yup.string(),
                annotation: Yup.string(),
              })
            )
            .length(5, "Wymagane jest min. 5 odpowiedzi"),
        })}
      >
        {({ errors, touched, ...formik }) => (
          <Form className="max-w-[1000px]">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 p-fluid">
              <div className="md:col-span-2">
                <Dropdown
                  {...formik.getFieldProps("trip")}
                  className={cl({
                    "p-invalid": errors.trip && touched.trip,
                  })}
                  filter
                  options={trips}
                  placeholder="Wybierz przebytą trasę"
                />
                {touched.trip && errors.trip ? (
                  <small className="p-error">{errors.trip}</small>
                ) : null}
              </div>
              {fields1.map((f, i) => (
                <FormikInput key={i + f.name} {...f} />
              ))}
              <FieldArray
                name="questions"
                render={() => (
                  <>
                    {formik.values.questions.map((_question, index) => (
                      <React.Fragment key={`question-${index}`}>
                        <FormikInput
                          label={`Odpowiedź ${index + 1}`}
                          name={`questions[${index}].answer`}
                        />
                        <FormikInput
                          label={`Uwagi ${index + 1}`}
                          name={`questions[${index}].annotation`}
                        />
                      </React.Fragment>
                    ))}
                    {typeof errors.questions === "string" &&
                    errors.questions ? (
                      <small className="p-error">{errors.questions}</small>
                    ) : null}
                  </>
                )}
              />
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
                    "p-invalid": errors.checked && touched.checked,
                  })}
                ></Checkbox>
                <label className="p-checkbox-label" htmlFor="cb1">
                  <small>
                    Wyrażam zgodę na przetwarzanie danych osobowych przez
                    dreptuś.pl w celu weryfikacji zgłoszenia *
                  </small>
                </label>
              </div>{" "}
              {errors.checked && touched.checked ? (
                <small className="p-error">{errors.checked}</small>
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
                      errors.checked && touched.checked,
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
