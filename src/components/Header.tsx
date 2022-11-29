import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "public/image/logo200.png";
import css from "./Header.module.css";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Strona główna", link: "/" },
  { name: "Aktualności", link: "/news" },
  {
    name: "Trasy",
    link: "/trips",
    children: [
      {
        name: "Piesze",
        link: "/trips?slug=pieszo",
      },
      {
        name: "Rowerowe",
        link: "/trips?slug=rowerowe",
      },
    ],
  },
  { name: "Uczestnicy", link: "/participants" },
  {
    name: "Odznaki",
    link: "odznaki",
    children: [
      {
        name: "Z Dreptusiem po Polsce",
        link: "/odznaki/z-dreptusiem-po-polsce",
      },
      {
        name: "Z Dreptusiem po Dolinie Bugu",
        link: "/odznaki/z-dreptusiem-po-dolinie-bugu",
      },
      {
        name: "Z Dreptusiem Traktem Królewskim",
        link: "/odznaki/z-dreptusiem-traktem-krolewskim",
      },
    ],
  },
  { name: "Karta startowa", link: "/form" },
  { name: "Kontakt", link: "/contact" },
];

const Header = () => {
  const router = useRouter();
  return (
    <header className={css.header}>
      <Link href="/" className={css.logoBox}>
        <Image src={logo} alt="logo" height={150} width={150} />
      </Link>
      <nav className={css.nav}>
        {links.map((link, i) => {
          if (link.children) {
            return (
              <div
                key={i + "child"}
                className={`${css.navItem} ${css.dropdown}`}
              >
                <Link
                  href={link.link}
                  className={
                    router.pathname === link.link
                      ? css.activeLink
                      : router.pathname.includes(link.link + "/")
                      ? css.activeLink
                      : css.nonLink
                  }
                >
                  {link.name}
                  <ChevronDownIcon className="w-4 h-4 ml-1 inline-block" />
                </Link>
                <div className={css.dropdownContent}>
                  <div className={css.slided}>
                    {link.children.map((childLink) => (
                      <Link
                        key={i + childLink.link}
                        href={childLink.link}
                        className={css.dropdownItem}
                      >
                        {childLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className={css.navItem}>
              <Link
                key={i}
                href={link.link}
                className={
                  router.pathname === link.link
                    ? css.activeLink
                    : router.pathname.includes(link.link + "/")
                    ? css.activeLink
                    : css.link
                }
              >
                {link.name}
              </Link>
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
