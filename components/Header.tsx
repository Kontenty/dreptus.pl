import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "public/image/logo200.png";
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
      <a href="/" className={css.logoBox}>
        <Image src={logo} alt="logo" height={150} width={150} priority />
      </a>
      <nav className={css.nav}>
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
