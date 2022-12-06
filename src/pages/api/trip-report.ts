import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import * as Yup from "yup";
dotenv.config();

const schema = Yup.object({
  fullName: Yup.string().min(4, "Min 4 znaki").required("Pole jest wymagane"),
  date: Yup.string().nullable().required("Pole jest wymagane"),
  trip: Yup.string().nullable().required("Pole jest wymagane"),
  location: Yup.string().required("Pole jest wymagane"),
  email: Yup.string()
    .email("Nieprawidłowy adres")
    .required("Pole jest wymagane"),
  checked: Yup.boolean().oneOf([true], "Wymagane jest wyraenie zgody"),
  add: Yup.string().oneOf(["null"]),
});

interface Request extends NextApiRequest {
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
}

const serialize = (data: Request["body"]) => {
  const dict: Record<string, string> = {
    trip: "Trasa",
    fullName: "Imię i nazwisko",
    email: "Adres email",
    date: "Data",
    location: "Klub / miejscowość",
  };
  const serialized = Object.keys(data)
    .filter((k) => !["checked", "add"].includes(k))
    .reduce((array: { field: string; value: string | boolean }[], key) => {
      if (key.match(/^answer-/g)) {
        array.push({
          field: key.replace("answer-", "Odpowiedź "),
          value: data[key],
        });
      } else if (key.match(/^adnotations-/g)) {
        array.push({
          field: key.replace("adnotations-", "Uwagi "),
          value: data[key],
        });
      } else {
        array.push({
          field: dict[key] || key,
          value: data[key],
        });
      }
      return array;
    }, []);
  return serialized;
};

const config = {
  user: process.env.MAIL_USER ?? "",
  password: process.env.MAIL_PASS ?? "",
  port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
  host: process.env.MAIL_HOST ?? "",
  receiver: process.env.MAIL_TO ?? "",
};

export default async function handler(req: Request, res: NextApiResponse) {
  try {
    await schema.validate(req.body);
  } catch (error) {
    res.status(406).send("Inapriopriate data");
  }

  const data = serialize(req.body);

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

  const messages = [
    {
      from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
      to: config.receiver, // list of receivers
      subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
      text, // plain text body
      html, // html body
    },
    {
      from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
      to: req.body.email, // list of receivers
      subject: "Zgłoszenie udziału w Dreptuś.pl 👣", // Subject line
      text: `Dziękujemy za zgłoszenie udziału w Dreptuś /n
      Po rozpatrzeniu odpowiedzi prześlemy wyniki
      `, // plain text body
      html: `<div style="color: #344979">
      <h2>Dziękujemy za zgłoszenie udziału w Dreptuś,</h2>
      <p>na trasie ${req.body.trip}</p>
      Po rozpatrzeniu odpowiedzi prześlemy wyniki</div>`, // html body
    },
  ];

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.user, // generated ethereal user
        pass: config.password, // generated ethereal password
      },
    });

    await transporter.sendMail(messages[0]);
    await transporter.sendMail(messages[1]);

    transporter.close();
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send("Could not send email");
  }
}
