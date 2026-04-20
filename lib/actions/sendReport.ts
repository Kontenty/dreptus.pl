"use server";
import nodemailer from "nodemailer";
import * as v from "valibot";
import { config } from "@/lib/config";
import { type ReportValues, reportSchema } from "@/lib/schemas/reportSchema";

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
    questions: data.questions
      .map((q, index) => ({ ...q, index: index + 1 }))
      .filter((q) => q.answer || q.annotation),
  };
};

export async function sendReport(values: ReportValues) {
  // Validate essential fields
  const result = v.safeParse(reportSchema, values);
  if (!result.success) {
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
      </tr>`,
        )
        .join("")}
      </table>
      <br>
      <h3>Odpowiedzi na pytania:</h3>
      <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border-bottom: 1px solid #344979; text-align: left; padding: 8px;">Lp.</th>
          <th style="border-bottom: 1px solid #344979; text-align: left; padding: 8px;">Odpowiedź</th>
          <th style="border-bottom: 1px solid #344979; text-align: left; padding: 8px;">Uwagi</th>
        </tr>
      </thead>
      <tbody>
        ${data.questions
          .map(
            (d) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${d.index}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${d.answer}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${d.annotation ?? ""}</td>
          </tr>`,
          )
          .join("")}
      </tbody>
      </table>
      </div>
    `;
  const text = `
      Przesłane odpowiedzi \n
      ${data.info.map((d) => `${d.field} - ${d.value}`).join("\n")}
      \nOdpowiedzi na pytania:
      ${data.questions
        .map(
          (d) =>
            `${d.index}. ${d.answer || "(brak odpowiedzi)"}${d.annotation ? ` (Uwagi: ${d.annotation})` : ""}`,
        )
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
    console.error("Zgłoszenie nie wysłane:", error);
    return { success: false, error: `Could not send email, ${error}` };
  } finally {
    transporter.close();
  }
}
