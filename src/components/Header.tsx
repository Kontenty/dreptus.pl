import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import cl from "classnames";

import logo from "public/image/logo200.png";
import css from "./Header.module.css";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const links = [
  { name: "Strona główna", link: "/" },
  { name: "Aktualności", link: "/news" },
  {
    name: "Trasy",
    link: "/trips",
  },
  { name: "Uczestnicy", link: "/participants" },
  {
    name: "Odznaki",
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
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <header className={css.header}>
      <Link href="/" className={css.logoBox}>
        <Image
          src={logo}
          alt="logo"
          height={150}
          width={150}
          className="shadow-lg rounded-full border-2 border-slate-200 bg-white w-[100px] md:w-[150px]"
          onClick={toggleNav}
        />
      </Link>
      <nav className={cl(css.nav, { [css.navHidden]: !showNav })}>
        {links.map((link, i) => {
          if (link.children) {
            return (
              <div
                key={i + "child"}
                className={`${css.navItem} ${css.dropdown}`}
              >
                <Link
                  href={link.link || ""}
                  className={
                    router.pathname === link.link
                      ? css.activeLink
                      : router.pathname.includes(link.link + "/")
                      ? css.activeLink
                      : css.nonLink
                  }
                >
                  {link.name}
                  <ChevronDownIcon className={css.chevron} />
                </Link>
                <div className={css.dropdownContent}>
                  <div className={css.slided}>
                    {link.children.map((childLink) => (
                      <Link
                        key={i + childLink.link}
                        href={childLink.link}
                        className={css.dropdownItem}
                        onClick={toggleNav}
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
                onClick={toggleNav}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
      </nav>
      <div className="block md:hidden pt-4 pr-2 ml-auto">
        <Button icon="pi pi-bars" className="p-button-sm" onClick={toggleNav} />
      </div>
    </header>
  );
};

export default Header;
