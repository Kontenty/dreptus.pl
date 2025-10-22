"use server";
import { auth } from "@/lib/auth";

export async function getSessionAction() {
  return await auth();
}
