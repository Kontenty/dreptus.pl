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
  },
};
