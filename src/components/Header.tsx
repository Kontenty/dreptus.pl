import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cl from "classnames";

import logo from "public/image/logo200.png";
import css from "./Header.module.css";

const links = [
  { name: "Strona główna", link: "/" },
  { name: "Aktualności", link: "/news", as: "/aktualnosci" },
  { name: "Trasy", link: "/trips", as: "/lista-tras" },
  { name: "Uczestnicy", link: "/participants", as: "/uczestnicy-tras" },
  {
    name: "Odznaki",
    as: "/badges",
    children: [
      {
        name: "Z Dreptusiem po Polsce",
        link: "/badges/z-dreptusiem-po-polsce",
      },
      {
        name: "Z Dreptusiem po Dolinie Bugu",
        link: "/badges/z-dreptusiem-po-dolinie-bugu",
      },
      {
        name: "Z Dreptusiem Traktem Królewskim",
        link: "/badges/z-dreptusiem-traktem-krolewskim",
      },
    ],
  },
  { name: "Formularz", link: "/form", as: "/formularz" },
  { name: "Kontakt", link: "/contact", as: "/kontakt" },
];

const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };
  const hideNav = () => setShowNav(false);
  const getLinkClass = (link?: string, defaultClass = css.link) => {
    if (router.pathname === link) {
      return css.activeLink;
    }
    if (router.pathname.includes(link + "/")) {
      return css.activeLink;
    }
    return defaultClass;
  };

  return (
    <header className={css.header}>
      <Link className={css.logoBox} href="/">
        <Image
          alt="logo"
          className="shadow-lg rounded-full border-2 border-slate-200 bg-white w-[100px] md:w-[150px]"
          height={150}
          loading="eager"
          onClick={hideNav}
          src={logo}
          width={150}
        />
      </Link>
      <nav className={cl(css.nav, { [css.navHidden]: !showNav })}>
        {links.map((link) => {
          if (link.children) {
            return (
              <div
                className={`${css.navItem} ${css.dropdown}`}
                key={link.link ?? "link"}
              >
                <Link
                  className={getLinkClass(link.link, css.noLink)}
                  href={link.link ?? ""}
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
                        key={childLink.link}
                        onClick={hideNav}
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
            <div className={css.navItem} key={link.link}>
              <Link
                as={link.as}
                className={getLinkClass(link.link)}
                href={link.link}
                onClick={hideNav}
              >
                {link.name}
              </Link>
            </div>
          );
        })}
      </nav>
      <div className="ml-auto center-hv gap-4">
        {status === "authenticated" && (
          <button
            className="border-white border py-2 px-4 rounded-md text-slate-300 hover:text-slate-50 transition-colors"
            onClick={() => signOut()}
          >
            Wyloguj się
          </button>
        )}

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
