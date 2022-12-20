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
      <Link className={css.logoBox} href="/">
        <Image
          alt="logo"
          className="shadow-lg rounded-full border-2 border-slate-200 bg-white w-[100px] md:w-[150px]"
          height={150}
          loading="eager"
          onClick={toggleNav}
          src={logo}
          unoptimized
          width={150}
        />
      </Link>
      <nav className={cl(css.nav, { [css.navHidden]: !showNav })}>
        {links.map((link, i) => {
          if (link.children) {
            return (
              <div
                className={`${css.navItem} ${css.dropdown}`}
                key={i + "child"}
              >
                <Link
                  className={
                    router.pathname === link.link
                      ? css.activeLink
                      : router.pathname.includes(link.link + "/")
                      ? css.activeLink
                      : css.nonLink
                  }
                  href={link.link || ""}
                >
                  {link.name}
                  <ChevronDownIcon className={css.chevron} />
                </Link>
                <div className={css.dropdownContent}>
                  <div className={css.slided}>
                    {link.children.map((childLink) => (
                      <Link
                        className={css.dropdownItem}
                        href={childLink.link}
                        key={i + childLink.link}
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
            <div className={css.navItem} key={i}>
              <Link
                className={
                  router.pathname === link.link
                    ? css.activeLink
                    : router.pathname.includes(link.link + "/")
                    ? css.activeLink
                    : css.link
                }
                href={link.link}
                key={i}
                onClick={toggleNav}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
      </nav>
      <div className="ml-auto center-hv">
        <Link href="https://www.facebook.com/trip.wycieczki">
          <i
            className="pi pi-facebook text-white  hover:text-blue-200"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </Link>
      </div>
      <div className="block md:hidden pt-4 pr-2 ml-auto">
        <Button className="p-button-sm" icon="pi pi-bars" onClick={toggleNav} />
      </div>
    </header>
  );
};

export default Header;
