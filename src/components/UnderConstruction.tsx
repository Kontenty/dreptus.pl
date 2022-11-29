import React from "react";
import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div className="justify-self-center">
      <h1 className="text-3xl mb-10">
        <span className="text-5xl animate-pulse">⚒</span>
        <span> - strona w trakcie budowy</span>
      </h1>
      <Link href="/" className="underline underline-offset-4">
        Wróć do początku
      </Link>
    </div>
  );
};

export default UnderConstruction;
