import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { config } from "src/lib/config";
import prisma from "lib/prisma";
import { getAdmins } from "lib/db";

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        ...config.mail.nodemailer,
      },
      from: '"Dreptuś.pl - autoryzacja" <zgloszenia@dreptuś.pl>',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const admins = await getAdmins();
      if (admins.some((a) => a.user_email === user.email)) {
        return true;
      }
      // Return false to display a default error message
      return false;
      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    },
    async session({ session, user }) {
      const admins = await getAdmins();
      if (admins.some((a) => a.user_email === user.email)) {
        session.user.role = "admin"; // Add role value to user object so it is passed along with session
      }
      return session;
    },
  },
});
