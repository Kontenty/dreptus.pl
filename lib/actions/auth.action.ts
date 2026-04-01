"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function logIn() {
  redirect("/auth/signin");
}
