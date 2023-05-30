import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="center-hv flex-grow">
      <div className="border-slate-200 rounded shadow-lg p-6  w-[600px]">
        <form
          action="/api/auth/signin/email"
          className="flex flex-col gap-6"
          method="post"
        >
          <input defaultValue={csrfToken} name="csrfToken" type="hidden" />
          <label htmlFor="email">Adres email</label>
          <InputText id="email" name="email" type="email" />
          <Button type="submit">Zaloguj się przez email</Button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
