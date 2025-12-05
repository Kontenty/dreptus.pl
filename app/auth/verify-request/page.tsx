import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function VerifyRequestPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="center-hv grow">
      <div className="border-slate-200 rounded-sm shadow-lg p-6  w-[600px]">
        <h1 className="text-2xl mb-4">Sprawdź swój email</h1>
        <p>Link do zalogowania został wysłany na twój adres email.</p>
        <p>Jeśli nie widzisz emaila, sprawdź folder spam.</p>
      </div>
    </div>
  );
}
