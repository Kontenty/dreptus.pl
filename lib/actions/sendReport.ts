"use server";
import nodemailer from "nodemailer";
import * as v from "valibot";
import { config } from "@/lib/config";

export const schema = v.object({
  fullName: v.pipe(v.string(), v.minLength(4)),
  date: v.pipe(v.string(), v.minLength(1)),
  trip: v.pipe(v.string(), v.minLength(1)),
  location: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
  checked: v.pipe(
    v.boolean(),
    v.custom((val) => val === true)
  ),
  add: v.literal("null"),
  questions: v.array(
    v.object({
      answer: v.string(),
      annotation: v.nullable(v.string()),
    })
  ),
});

export type ReportValues = v.InferOutput<typeof schema>;

const serialize = (data: ReportValues) => {
  const dict: Record<string, string> = {
    trip: "Trasa",
    fullName: "Imię i nazwisko",
    email: "Adres email",
    date: "Data",
    location: "Klub / miejscowość",
  };
  const serialized = [];

  for (const [key, value] of Object.entries(data)) {
    if (key in dict) {
      serialized.push({ field: dict[key], value: value ?? "" });
    }
  }
  return {
    info: serialized,
    questions: data.questions.filter((q) => q.answer || q.annotation),
  };
};

export async function sendReport(values: ReportValues) {
  // Validate essential fields
  try {
    v.parse(schema, values);
  } catch (error) {
    return { success: false, error: "Inappropriate data" };
  }

  const data = serialize(values);

  const html = `
      <div style="color: #344979">
      <h2>Przesłane odpowiedzi</h2>
      <br>
      <table>
      ${data.info
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
      <tr>
        <td><strong>Odpowiedź</strong></td>
        <td><strong>Uwagi</strong></td>
      </tr>
        ${data.questions
          .map(
            (d) => `
          <tr>
            <td><strong>${d.answer}</strong></td>
            <td>${d.annotation}</td>
          </tr>`
          )
          .join("")}
      </table>
      </div>
    `;
  const text = `
      Przesłane odpowiedzi \n
      ${data.info.map((d) => `${d.field} - ${d.value}`).join("\n")}
      \nOdpowiedzi na pytania:
      ${data.questions
        .map((d) => `${d.answer || "(brak odpowiedzi)"}`)
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
