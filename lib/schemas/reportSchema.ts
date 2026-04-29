import * as v from "valibot";

export const reportSchema = v.object({
  fullName: v.pipe(
    v.string(),
    v.nonEmpty("Imię i nazwisko jest wymagane"),
    v.minLength(4, "Imię i nazwisko musi mieć co najmniej 4 znaki"),
  ),
  date: v.pipe(v.string(), v.nonEmpty("Data jest wymagana")),
  trip: v.pipe(v.string(), v.nonEmpty("Trasa jest wymagana")),
  location: v.pipe(v.string(), v.nonEmpty("Klub / miejscowość jest wymagana")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Adres email jest wymagany"),
    v.email("Adres email jest nieprawidłowy"),
  ),
  gdprChecked: v.pipe(
    v.boolean(),
    v.check((input) => input === true, "Zgoda jest wymagana"),
  ),
  add: v.literal("null"),
  questions: v.array(
    v.object({
      answer: v.string(),
      annotation: v.nullable(v.string()),
    }),
  ),
});

export type ReportInput = v.InferInput<typeof reportSchema>;
export type ReportValues = v.InferOutput<typeof reportSchema>;
