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
  res.send("ok");
  try {
    await schema.validate(req.body);
  } catch (error) {
    res.status(406).send("Inapriopriate data");
  }

  const data = serialize(req.body);
  console.log(data);

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

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.user, // generated ethereal user
      pass: config.password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  transporter.sendMail(
    {
      from: '"Dreptuś.pl - zgłoszenia" <zgloszenia@dreptuś.pl>', // sender address
      to: config.receiver, // list of receivers
      subject: "Odpowiedzi Dreptuś.pl 👣", // Subject line
      text, // plain text body
      html, // html body
    },
    (error) => {
      if (error) {
        console.log("Mail send error", error);
        res.status(400).send("Could not send email");
      } else {
        res.status(200).send("ok");
      }
    }
  );
}
