import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "public/image/logo.png";
import css from "./Header.module.css";

type Props = {};

const links = [
  { name: "Strona główna", link: "/" },
  { name: "Aktualności", link: "/news" },
  { name: "Trasy", link: "/trips" },
  { name: "Uczestnicy", link: "/p" },
  { name: "Odznaki", link: "/o" },
  { name: "Karta startowa", link: "/k" },
  { name: "Kontakt", link: "/contact" },
];

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header className={css.header}>
      <a href="/">
        <Image src={logo} alt="logo" height={150} layout="fixed" />
      </a>
      <nav className="flex gap-5 ml-5 self-center">
        {links.map((link, i) => (
          <Link key={i} href={link.link}>
            <a
              className={
                router.pathname == link.link ? css.activeLink : css.link
              }
            >
              {link.name}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
