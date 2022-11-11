import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="justify-self-center">
      <h1 className="text-3xl mb-10">
        <span className="animate-pulse">404</span>
        <span> - nie znalazłem tej strony</span>
      </h1>
      <Link href="/">
        <a className="underline underline-offset-4">Wróć do początku</a>
      </Link>
    </div>
  );
}
