"use client";
import Link from "next/link";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import type { Location } from "@/types";
import css from "./TripListFilter.module.css";

const categories = [
  { name: "Piesze", slug: "pieszo" },
  { name: "Rowerowe", slug: "rowerowe" },
  { name: "Dolina Bugu", slug: "dolina-bugu" },
];
type Props = {
  count: number;
  locationsList?: Location[];
};

const TripListFilter = ({ count, locationsList }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Button
        aria-controls="overlay_tmenu"
        aria-haspopup
        className="md:hidden p-button-sm"
        icon="pi pi-sliders-h"
        label="Filtry"
        onClick={() => setShowMenu(!showMenu)}
      />
      <Sidebar onHide={() => setShowMenu(false)} visible={showMenu}>
        <div>
          <div className={`${css.buttonsMobile} mb-4`}>
            {categories.map((loc) => (
              <Link
                as={`/trips/${loc.slug}`}
                href={{ pathname: "/trips", query: { slug: loc.slug } }}
                key={loc.slug}
                onClick={() => setShowMenu(false)}
              >
                <button className={css.btnDiv} type="button">
                  {loc.name}
                </button>
              </Link>
            ))}
          </div>
          <div className={css.buttonsMobile}>
            {locationsList?.map((loc) =>
              Number(loc.count) > 0 ? (
                <Link
                  as={`/trips/${loc.slug}`}
                  className={css.btnDiv}
                  href={{ pathname: "/trips", query: { slug: loc.slug } }}
                  key={loc.slug}
                  onClick={() => setShowMenu(false)}
                >
                  {loc.name} ({loc.count})
                </Link>
              ) : null,
            )}
            <Link href="/trips">
              <button className={css.allBtnDiv} type="button">
                Wszystkie ({count})
              </button>
            </Link>
          </div>
        </div>
      </Sidebar>
      <div className="hidden md:block">
        <div className={`${css.buttons} mb-4`}>
          {categories.map((loc) => (
            <Link
              href={{ pathname: "/trips", query: { slug: loc.slug } }}
              key={loc.slug}
            >
              <button className={css.btnDiv} type="button">
                {loc.name}
              </button>
            </Link>
          ))}
        </div>
        <div className={css.buttons}>
          {locationsList?.map((loc) =>
            loc.count !== "0" ? (
              <Link
                href={{ pathname: "/trips", query: { slug: loc.slug } }}
                key={loc.slug}
              >
                <button className={css.btnDiv} type="button">
                  {loc.name} ({loc.count})
                </button>
              </Link>
            ) : null,
          )}
          <Link href="/trips">
            <button className={css.allBtnDiv} type="button">
              Wszystkie ({count})
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TripListFilter;
