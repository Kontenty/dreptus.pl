"use client";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import cl from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { useState } from "react";
import logo from "@/public/image/logo200.png";
import { LogOutButton } from "./auth/LogOutButton";
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
  { name: "Kontakt", link: "/contact" },
];

import { useEffect } from "react";
import { getSessionAction } from "@/lib/actions/getSessionAction";

const Header = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const isLoggedIn = !!session;

  useEffect(() => {
    let mounted = true;
    (async () => {
      const currentSession = await getSessionAction();
      if (mounted) setSession(currentSession ?? null);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };
  const hideNav = () => setShowNav(false);
  const getLinkClass = (link?: string, defaultClass = css.link) => {
    if (pathname === link) {
      return css.activeLink;
    }
    if (pathname?.includes(`${link}/`)) {
      return css.activeLink;
    }
    return defaultClass;
  };

  return (
    <header className="fixed inset-0 h-[52px] md:h-[90px] flex justify-between md:justify-start md:gap-12 px-2 md:px-5 bg-brand-green-dark text-white z-10">
      <Link className="z-10" href="/">
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
        {isLoggedIn && <LogOutButton />}

        <Link href="https://www.facebook.com/trip.wycieczki">
          <svg
            className="hover:fill-blue-500"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1.75rem"
            width="1.75rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Facebook</title>
            <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"></path>
          </svg>
        </Link>
      </div>
      <div className="block md:hidden ml-auto self-center">
        <Button
          className="bg-white p-button-sm "
          onPress={toggleNav}
          color="success"
        >
          {showNav ? (
            <XMarkIcon className="w-5 h-5 text-black" />
          ) : (
            <Bars3Icon className="w-5 h-5 text-black" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
