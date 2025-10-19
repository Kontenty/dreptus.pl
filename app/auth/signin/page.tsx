"use client";

import { signIn } from "next-auth/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn("nodemailer", {
      email,
      callbackUrl: "/admin", // Redirect after sign-in
    });
  };

  return (
    <section className="center-hv flex-grow">
      <div className="border-slate-200 rounded shadow-lg p-6 mx-auto w-[500px]">
        <h1 className="text-3xl mb-4">Logowanie</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="email">
            Adres email
          </label>
          <InputText
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="block" disabled={loading}>
            <span>Zaloguj się przez email</span>
          </Button>
        </form>
        <hr className="my-8" />
        <div className="center-hv">
          <Button
            outlined
            rounded
            icon="pi pi-github"
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
          />
        </div>
      </div>
    </section>
  );
}
