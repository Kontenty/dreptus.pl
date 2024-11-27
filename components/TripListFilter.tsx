"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";

import css from "./TripListFilter.module.css";
import { Button } from "primereact/button";
import { Location } from "@/types/gql/types";

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
                <div className={css.btnDiv} role="button">
                  {loc.name}
                </div>
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
              ) : null
            )}
            <Link href="/trips">
              <div className={css.allBtnDiv} role="button">
                Wszystkie ({count})
              </div>
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
              <div className={css.btnDiv} role="button">
                {loc.name}
              </div>
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
                <div className={css.btnDiv} role="button">
                  {loc.name} ({loc.count})
                </div>
              </Link>
            ) : null
          )}
          <Link href="/trips">
            <div className={css.allBtnDiv} role="button">
              Wszystkie ({count})
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TripListFilter;
