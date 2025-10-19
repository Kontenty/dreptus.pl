"use server";

import { signIn, signOut } from "@/lib/auth";

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function logIn() {
  await signIn();
}
