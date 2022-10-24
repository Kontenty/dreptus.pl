import Link from "next/link";
import Image from "next/image";
import logo from "public/image/logo.png";
import css from "./Header.module.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={css.header}>
      <a href="/">
        <Image src={logo} alt="logo" height={150} layout="fixed" />
      </a>
      <nav className="flex gap-5 ml-5 self-center">
        <Link href="/">Strona główna</Link>
        <Link href="/blog">Aktualności</Link>
        <Link href="/routes">Trasy</Link>
        <Link href="/participants">Uczestnicy</Link>
        <Link href="/about">Odznaki</Link>
        <Link href="/start-form">Karta startowa</Link>
        <Link href="/contact">Kontakt</Link>
      </nav>
    </header>
  );
};

export default Header;
