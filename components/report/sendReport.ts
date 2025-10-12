"use server";
import nodemailer from "nodemailer";
import * as Yup from "yup";
import { config } from "@/lib/config";

const schema = Yup.object({
  fullName: Yup.string().min(4, "Min 4 znaki").required("Pole jest wymagane"),
  date: Yup.string().nullable().required("Pole jest wymagane"),
  trip: Yup.string().nullable().required("Pole jest wymagane"),
  location: Yup.string().required("Pole jest wymagane"),
  email: Yup.string()
    .email("Nieprawidłowy adres")
    .required("Pole jest wymagane"),
  checked: Yup.boolean().oneOf([true], "Wymagane jest wyrażenie zgody"),
  add: Yup.string().oneOf(["null"]),
  questions: Yup.array()
    .of(
      Yup.object({
        answer: Yup.string(),
        annotation: Yup.string().nullable(),
      })
    )
    .length(5, "Wymagane jest min. 5 odpowiedzi"),
});

type TData = { field: string; value: FormDataEntryValue | null }[];

const serialize = (data: FormData) => {
  const dict: Record<string, string> = {
    trip: "Trasa",
    fullName: "Imię i nazwisko",
    email: "Adres email",
    date: "Data",
    location: "Klub / miejscowość",
  };
  const serialized: TData = [];

  for (const [key, value] of data.entries()) {
    if (["checked", "add"].includes(key)) continue;

    // Handle questions array fields (questions[0].answer, questions[0].annotation, etc.)
    if (key.startsWith("questions[")) {
      const match = key.match(/questions\[(\d+)\]\.(answer|annotation)/);
      if (match) {
        const [, index, fieldType] = match;
        const fieldLabel = fieldType === "answer" ? "Odpowiedź" : "Uwagi";
        serialized.push({
          field: `${fieldLabel} ${parseInt(index) + 1}`,
          value,
        });
      }
    } else {
      serialized.push({ field: dict[key] || key, value });
    }
  }
  return serialized;
};

export type ReportValues = {
  trip: string | null;
  fullName: string;
  email: string;
  date: string | null;
  location: string;
  checked: boolean;
  add: string;
  questions: { answer: string; annotation: string }[];
};

export async function sendReport(
  values: ReportValues
): Promise<{ success: boolean; error?: string }> {
  "use server";
  // Validate essential fields
  const body = {
    trip: values.trip ?? "",
    fullName: values.fullName ?? "",
    email: values.email ?? "",
    date: values.date ?? "",
    location: values.location ?? "",
    checked: Boolean(values.checked),
    add: String(values.add ?? ""),
  };
  try {
    await schema.validate(body);
  } catch (error) {
    return { success: false, error: "Inappropriate data" };
  }

  // Reconstruct FormData for templating and serialization from values
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) {
    if (v === undefined || v === null) continue;
    fd.append(k, String(v));
  }
  const data = serialize(fd);

  // Group answers and annotations by question number for better readability
  const questionData = data.filter(
    (d) => d.field.startsWith("Odpowiedź") || d.field.startsWith("Uwagi")
  );
  const otherData = data.filter(
    (d) => !d.field.startsWith("Odpowiedź") && !d.field.startsWith("Uwagi")
  );

  const html = `
      <div style="color: #344979">
      <h2>Przesłane odpowiedzi</h2>
      <br>
      <table>
      ${otherData
        .map(
          (d) => `<tr>
      <td><strong>${d.field}</strong></td>
      <td>${d.value}</td>
      </tr>`
        )
        .join("")}
      </table>
      <br>
      <h3>Odpowiedzi na pytania:</h3>
      <table>
      ${questionData
        .map(
          (d) => `<tr>
      <td><strong>${d.field}</strong></td>
      <td>${d.value || "(brak odpowiedzi)"}</td>
      </tr>`
        )
        .join("")}
      </table>
      </div>
    `;
  const text = `
      Przesłane odpowiedzi \n
      ${otherData.map((d) => `${d.field} - ${d.value}`).join("\n")}
      \nOdpowiedzi na pytania:
      ${questionData
        .map((d) => `${d.field} - ${d.value || "(brak odpowiedzi)"}`)
        .join("\n")}
    `;

  const transporter = nodemailer.createTransport({
    ...config.mail.nodemailer,
    secure: true, // true for 465, false for other ports
  });
  try {
    const messageToAdmin = {
      from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
      to: config.mail.receiver, // list of receivers
      subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
      text, // plain text body
      html, // html body
    };

    await transporter.sendMail(messageToAdmin);
    const userMail = values.email;
    if (typeof userMail === "string") {
      await transporter.sendMail({
        from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
        to: userMail, // list of receivers
        subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
        text: `Dziękujemy za zgłoszenie udziału w Dreptuś\nPo rozpatrzeniu odpowiedzi prześlemy wyniki`, // plain text body
        html: `<div style="color: #344979">
        <h2>Dziękujemy za zgłoszenie udziału w Dreptuś,</h2>
        <p>na trasie ${values.trip}</p>
        Po rozpatrzeniu odpowiedzi prześlemy wyniki</div>`, // html body
      });
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Could not send email" };
  } finally {
    transporter.close();
  }
}
