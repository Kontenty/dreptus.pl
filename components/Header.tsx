import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "public/image/logo.png";
import css from "./Header.module.css";

const links = [
  { name: "Strona główna", link: "/" },
  { name: "Aktualności", link: "/news" },
  { name: "Trasy", link: "/trips" },
  { name: "Uczestnicy", link: "/participants" },
  { name: "Odznaki", link: "/odznaki" },
  { name: "Karta startowa", link: "/form" },
  { name: "Kontakt", link: "/contact" },
];

const Header = () => {
  const router = useRouter();
  return (
    <header className={css.header}>
      <a href="/" className="z-10">
        <Image src={logo} alt="logo" height={150} layout="fixed" priority />
      </a>
      <nav className="flex gap-5 ml-5 self-center">
        {links.map((link, i) => (
          <Link key={i} href={link.link}>
            <a
              className={
                router.pathname === link.link
                  ? css.activeLink
                  : router.pathname.includes(link.link + "/")
                  ? css.activeLink
                  : css.link
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
