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
});

/* interface Request {
  body: {
    trip: string;
    fullName: string;
    email: string;
    date: string;
    location: string;
    checked: boolean;
    add: string;
    [x: string]: string | boolean;
  };
} */
type TData = { field: string; value: FormDataEntryValue | null }[];

const serialize = (data: FormData) => {
  const dict: Record<string, string> = {
    trip: "Trasa",
    fullName: "Imię i nazwisko",
    email: "Adres email",
    date: "Data",
    location: "Klub / miejscowość",
  };
  const serialized = Object.keys(data)
    .filter((k) => !["checked", "add"].includes(k))
    .reduce((array: TData, key) => {
      if (key.match(/^answer-/g)) {
        array.push({
          field: key.replace("answer-", "Odpowiedź "),
          value: data.get(key),
        });
      } else if (key.match(/^adnotations-/g)) {
        array.push({
          field: key.replace("adnotations-", "Uwagi "),
          value: data.get(key),
        });
      } else {
        array.push({
          field: dict[key] || key,
          value: data.get(key),
        });
      }
      return array;
    }, []);
  return serialized;
};

export async function sendReport(formData: FormData) {
  "use server";
  /* try {
    await schema.validate(req.body);
  } catch (error) {
    res.status(406).send("Inapriopriate data");
  } */

  const data = serialize(formData);

  const html = `
      <div style="color: #344979">
      <h2>Przesłane odpowiedzi</h2>
      <br>
      <table>
      ${data.map(
        (d) => `<tr>
      <td>${d.field}</td>
      <td>${d.value}</td>
      </tr>`
      )}
      </table>
      </div>
    `;
  const text = `
      Przesłane odpowiedzi /n
      ${data.map(
        (d) => `
      ${d.field} - ${d.value} \n
      `
      )}
    `;

  const messageToAdmin = {
    from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
    to: config.mail.receiver, // list of receivers
    subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
    text, // plain text body
    html, // html body
  };

  const transporter = nodemailer.createTransport({
    ...config.mail.nodemailer,
    secure: true, // true for 465, false for other ports
  });
  try {
    /*  await transporter.sendMail(messageToAdmin);
    const userMail = formData.get("email");
    if (typeof userMail === "string") {
      await transporter.sendMail({
        from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
        to: userMail, // list of receivers
        subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
        text: `Dziękujemy za zgłoszenie udziału w Dreptuś /n
        Po rozpatrzeniu odpowiedzi prześlemy wyniki
        `, // plain text body
        html: `<div style="color: #344979">
        <h2>Dziękujemy za zgłoszenie udziału w Dreptuś,</h2>
        <p>na trasie ${formData.get("trip")}</p>
        Po rozpatrzeniu odpowiedzi prześlemy wyniki</div>`, // html body
      });
    } */
    console.log(data);

    return "ok";
  } catch (error) {
    return "Could not send email";
  } finally {
    transporter.close();
  }
}
