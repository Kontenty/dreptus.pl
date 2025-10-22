import { loadEnvConfig } from "@next/env";
import * as V from "valibot";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const serverEnvSchema = V.object({
  MAIL_HOST: V.pipe(V.string(), V.minLength(3, "MAIL_HOST is required.")),
  MAIL_PORT: V.fallback(
    V.pipe(V.string(), V.transform(Number), V.number()),
    587,
  ),
  MAIL_USER: V.pipe(V.string(), V.minLength(1, "MAIL_USER is required.")),
  MAIL_PASS: V.pipe(V.string(), V.minLength(1, "MAIL_PASS is required.")),
  MAIL_TO: V.pipe(V.string(), V.nonEmpty("MAIL_TO is required.")),
  MAIL_FROM: V.pipe(V.string(), V.minLength(1, "MAIL_FROM is required.")),
});

const parsedServerEnv = V.safeParse(serverEnvSchema, process.env);

if (!parsedServerEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedServerEnv.issues.map((i) => i.message),
  );
  throw new Error("Invalid environment variables. Check the logs above.");
}

const env = parsedServerEnv.output;

export const config = {
  mail: {
    nodemailer: {
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: true,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    },
    receiver: env.MAIL_TO,
    sender: env.MAIL_FROM,
  },
};
