import Link from "next/link";

export default function Odznaki() {
  return (
    <div className="justify-self-center">
      <h1 className="text-3xl mb-10">
        <span className="text-5xl animate-pulse">⚒</span>
        <span> - strona w trakcie budowy</span>
      </h1>
      <Link href="/">
        <a className="underline underline-offset-4">Wróć do początku</a>
      </Link>
    </div>
  );
}
