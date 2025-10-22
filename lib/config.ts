import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const requiredEnvs = [
  "MAIL_HOST",
  "MAIL_USER",
  "MAIL_PASS",
  "MAIL_TO",
  "MAIL_FROM",
];

for (const env of requiredEnvs) {
  if (process.env[env])
    throw new Error(`Missing required environment variable: ${env}`);
}

export const config = {
  mail: {
    nodemailer: {
      host: process.env.MAIL_HOST ?? "",
      port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
      auth: {
        user: process.env.MAIL_USER ?? "",
        pass: process.env.MAIL_PASS ?? "",
      },
    },
    user: process.env.MAIL_USER ?? "",
    password: process.env.MAIL_PASS ?? "",
    port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
    host: process.env.MAIL_HOST ?? "",
    receiver: process.env.MAIL_TO ?? "",
    sender: process.env.MAIL_FROM ?? "",
  },
};
