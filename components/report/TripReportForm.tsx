import {
  Button,
  Checkbox,
  ComboBox,
  Input,
  Label,
  ListBox,
  Surface,
  toast,
} from "@heroui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import RHFInput, { type RHFField } from "@/components/RHFInput";
import { sendReport } from "@/lib/actions/sendReport";
import { type ReportInput, reportSchema } from "@/lib/schemas/reportSchema";

interface Props {
  trips: { value: string; label: string }[];
  onSuccess: () => void;
}
export default function TripReportForm({ trips, onSuccess }: Readonly<Props>) {
  useEffect(() => {
    const hasShownToast = sessionStorage.getItem("gdprToastShown");
    if (!hasShownToast) {
      toast.info("RODO", {
        description:
          "Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych informuję, że Państwa dane osobowe będą przetwarzane i chronione zgodnie z ustawą.",
        timeout: 10000,
      });
      sessionStorage.setItem("gdprToastShown", "true");
    }
  }, []);

  const fields1: RHFField[] = [
    { name: "fullName", label: "Imię i nazwisko" },
    { name: "email", label: "Adres email" },
    { name: "date", label: "Data przebycia trasy", type: "date" },
    { name: "location", label: "Klub / miejscowość" },
  ];

  const defaultValues: ReportInput = {
    trip: "",
    fullName: "",
    email: "",
    date: "",
    location: "",
    gdprChecked: false,
    add: "null",
    questions: Array(30).fill({ answer: "", annotation: "" }),
  };

  const methods = useForm<ReportInput>({
    resolver: valibotResolver(reportSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: ReportInput) => {
    try {
      const result = await sendReport(values);
      if (result?.success) {
        onSuccess();
      } else {
        toast.danger("Błąd", {
          description: result?.error || "Nie udało się wysłać formularza",
        });
      }
    } catch (_e) {
      toast.danger("Błąd", {
        description: "Wystąpił błąd podczas wysyłania",
      });
    }
  };

  return (
    <>
      <h2 className="text-4xl text-brand-green-dark">Formularz zgłoszenia</h2>
      <FormProvider {...methods}>
        <Surface variant="secondary" className="px-8 py-6">
          <form className="max-w-250" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name="trip"
                  render={({ field }) => (
                    <ComboBox
                      isRequired
                      selectedKey={field.value || null}
                      onSelectionChange={(key) => {
                        field.onChange(key || "");
                      }}
                    >
                      <Label>Wybierz przebytą trasę</Label>
                      <ComboBox.InputGroup>
                        <Input placeholder="Wybierz przebytą trasę" />
                        <ComboBox.Trigger />
                      </ComboBox.InputGroup>
                      <ComboBox.Popover>
                        <ListBox>
                          {trips.map((trip) => (
                            <ListBox.Item
                              id={trip.value}
                              key={trip.value}
                              textValue={trip.label}
                            >
                              {trip.label}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </ComboBox.Popover>
                    </ComboBox>
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
                name="gdprChecked"
                render={({ field, fieldState }) => {
                  const error = fieldState.error;

                  return (
                    <>
                      <Checkbox
                        id="gdprChecked"
                        name={field.name}
                        // isInvalid={!!error}
                        isRequired
                        isSelected={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      >
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label htmlFor="gdprChecked" className="text-sm">
                            Wyrażam zgodę na przetwarzanie danych osobowych
                            przez Dreptuś.pl w celu weryfikacji zgłoszenia{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                        </Checkbox.Content>
                      </Checkbox>
                      {error && (
                        <p className="ml-1 mt-1 text-sm text-red-500">
                          {error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>

            <Button
              aria-label="submit"
              className="mt-6 w-44"
              type="submit"
              isPending={isSubmitting}
            >
              Wyślij
            </Button>
          </form>
        </Surface>
      </FormProvider>
    </>
  );
}
