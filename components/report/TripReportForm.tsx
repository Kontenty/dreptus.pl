import React, { useRef } from "react";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMountEffect } from "primereact/hooks";
import cl from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import { reportSchema } from "@/lib/schemas/reportSchema";
import RHFInput, { type RHFField } from "@/components/RHFInput";
import { sendReport } from "@/lib/actions/sendReport";

interface Props {
  trips: { value: string; label: string }[];
  onSuccess: () => void;
}
export default function TripReportForm({ trips, onSuccess }: Readonly<Props>) {
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
          // life: 6000,
        },
      ]);
    }
  });

  type FormData = v.InferOutput<typeof reportSchema>;

  const fields1: RHFField[] = [
    { name: "fullName", label: "Imię i nazwisko" },
    { name: "email", label: "Adres email" },
    { name: "date", label: "Data przebycia trasy", type: "date" },
    { name: "location", label: "Klub / miejscowość" },
  ];

  const defaultValues: FormData = {
    trip: "",
    fullName: "",
    email: "",
    date: "",
    location: "",
    checked: false,
    add: "null",
    questions: Array(30).fill({ answer: "", annotation: "" }),
  };

  const methods = useForm<FormData>({
    resolver: valibotResolver(reportSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (values: FormData) => {
    try {
      const result = await sendReport(values);
      if (result?.success) {
        onSuccess();
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
    }
  };

  return (
    <>
      <div className="w-full">
        <Messages ref={msg} />
      </div>
      <h2 className="text-4xl mb-6 text-brand-green-dark">
        Formularz zgłoszenia
      </h2>
      <FormProvider {...methods}>
        <form className="max-w-[1000px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 p-fluid">
            <div className="md:col-span-2">
              <Controller
                control={control}
                name="trip"
                render={({ field }) => (
                  <>
                    <Dropdown
                      {...field}
                      className={cl({ "p-invalid": errors.trip })}
                      filter
                      options={trips}
                      placeholder="Wybierz przebytą trasę"
                      onChange={(e) => field.onChange(e.value)}
                      value={field.value}
                    />
                    {errors.trip ? (
                      <small className="p-error">{errors.trip.message}</small>
                    ) : null}
                  </>
                )}
              />
            </div>

            {fields1.map((f, i) => (
              <div key={i + String(f.name)}>
                <RHFInput name={String(f.name)} label={f.label} type={f.type} />
              </div>
            ))}

            {/* questions */}
            {Array.from({ length: 30 }).map((_, index) => (
              <React.Fragment key={`q-${index}`}>
                <div>
                  <RHFInput
                    name={`questions.${index}.answer`}
                    label={`Odpowiedź ${index + 1}`}
                  />
                </div>
                <div>
                  <RHFInput
                    name={`questions.${index}.annotation`}
                    label={`Uwagi ${index + 1}`}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>

          <input
            className="h-6 opacity-0 pointer-events-none"
            type="text"
            {...{ name: "add", value: "null", readOnly: true }}
          />

          <div>
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="checked"
                render={({ field }) => (
                  <Checkbox
                    inputId="cb1"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.checked)}
                    className={cl({ "p-invalid": errors.checked })}
                  />
                )}
              />
              <label className="p-checkbox-label" htmlFor="cb1">
                <small>
                  Wyrażam zgodę na przetwarzanie danych osobowych przez
                  dreptuś.pl w celu weryfikacji zgłoszenia *
                </small>
              </label>
            </div>{" "}
            {errors.checked ? (
              <small className="p-error">Wymagane jest wyrażenie zgody</small>
            ) : null}
          </div>

          <Button
            aria-label="submit"
            className="p-button-raised mt-6 w-44"
            label="Wyślij"
            type="submit"
            disabled={isSubmitting}
          ></Button>
        </form>
      </FormProvider>
    </>
  );
}
