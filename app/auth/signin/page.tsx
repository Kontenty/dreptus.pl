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
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <label htmlFor="email">Adres email</label>
        <InputText
          id="email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          Zaloguj się przez email
        </Button>
      </form>
    </div>
  );
}
