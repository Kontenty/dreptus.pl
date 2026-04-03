import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center grow pb-10">
      <SignIn />
    </main>
  );
}
