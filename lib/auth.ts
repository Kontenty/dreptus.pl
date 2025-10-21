import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";
import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { getAdmins } from "./db";

export const authConfig: NextAuthConfig = {
  providers: [
    Github,
    Nodemailer({
      server: config.mail.nodemailer,
      from: config.mail.sender,
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    signIn: async ({ user }) => {
      const admins = await getAdmins();
      if (admins.some((a) => a.user_email === user.email)) {
        return true;
      }
      return false;
    },
    session: async ({ session, user }) => {
      const admins = await getAdmins();
      if (admins.some((a) => a.user_email === user.email)) {
        session.user.role = "admin";
      }
      return session;
    },
  },
  debug: process.env.AUTH_DEBUG === "true",
});
