import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { config } from "src/lib/config";

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        ...config.mail.nodemailer,
      },
      from: '"Dreptuś.pl - autoryzacja" <zgloszenia@dreptuś.pl>',
    }),
  ],
});
