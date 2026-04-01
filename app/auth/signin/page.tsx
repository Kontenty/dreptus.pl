"use client";

import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@heroui/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="center-hv grow">
      <div className="border-slate-200 rounded-sm shadow-lg p-6 mx-auto w-125">
        <h1 className="text-3xl mb-4">Logowanie</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            id="email"
            name="email"
            type="email"
            label="Adres email"
            value={email}
            onValueChange={setEmail}
            isRequired
          />
          <Button type="submit" className="block w-full" isDisabled={false}>
            Zaloguj się przez email
          </Button>
        </form>
        <hr className="my-8" />
        <div className="center-hv">
          <Button variant="bordered" radius="full" isIconOnly>
            <CodeBracketIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
