import {
  Autocomplete,
  AutocompleteItem,
  addToast,
  Button,
  Checkbox,
} from "@heroui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import type * as v from "valibot";
import RHFInput, { type RHFField } from "@/components/RHFInput";
import { sendReport } from "@/lib/actions/sendReport";
import { reportSchema } from "@/lib/schemas/reportSchema";

interface Props {
  trips: { value: string; label: string }[];
  onSuccess: () => void;
}
export default function TripReportForm({ trips, onSuccess }: Readonly<Props>) {
  useEffect(() => {
    const hasShownToast = sessionStorage.getItem("gdprToastShown");
    if (!hasShownToast) {
      addToast({
        color: "primary",
        classNames: { title: "text-lg" },
        title: "RODO",
        variant: "solid",
        size: "lg",
        timeout: 10000,
        description:
          "Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych informuję, e Państa dane osobowe będą przetwarzane i chronione zgodnie z ustawą.",
      });
      sessionStorage.setItem("gdprToastShown", "true");
    }
  }, []);

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
        addToast({
          color: "danger",
          title: "Błąd",
          description: result?.error || "Nie udało się wysłać formularza",
        });
      }
    } catch (_e) {
      addToast({
        color: "danger",
        title: "Błąd",
        description: "Wystąpił błąd podczas wysyłania",
      });
    }
  };

  return (
    <>
      <h2 className="text-4xl mb-6 text-brand-green-dark">
        Formularz zgłoszenia
      </h2>
      <FormProvider {...methods}>
        <form className="max-w-250" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-6 p-fluid">
            <div className="md:col-span-2">
              <Controller
                control={control}
                name="trip"
                render={({ field }) => (
                  <Autocomplete
                    label="Wybierz przebytą trasę"
                    placeholder="Wybierz przebytą trasę"
                    selectedKey={field.value || null}
                    onSelectionChange={(key) => {
                      field.onChange(key || "");
                    }}
                    isInvalid={!!errors.trip}
                    errorMessage={errors.trip?.message}
                    isRequired
                  >
                    {trips.map((trip) => (
                      <AutocompleteItem key={trip.value}>
                        {trip.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
              />
            </div>

            {fields1.map((f, i) => (
              <div key={i + String(f.name)}>
                <RHFInput
                  name={String(f.name)}
                  label={f.label}
                  type={f.type}
                  required
                />
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
            <Controller
              control={control}
              name="checked"
              render={({ field }) => (
                <Checkbox
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  isInvalid={!!errors.checked}
                  isRequired
                >
                  <small>
                    Wyrażam zgodę na przetwarzanie danych osobowych przez
                    dreptuś.pl w celu weryfikacji zgłoszenia{" "}
                    <span className="text-red-500">*</span>
                  </small>
                </Checkbox>
              )}
            />
          </div>

          <Button
            aria-label="submit"
            className="mt-6 w-44"
            type="submit"
            isDisabled={isSubmitting}
          >
            Wyślij
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
