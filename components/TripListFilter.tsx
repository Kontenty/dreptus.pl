"use client";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import type { Location } from "@/types";

const css = {
  allBtnDiv:
    "block bg-brand-green-dark text-white p-3 mt-2 rounded cursor-pointer hover:bg-brand-green-dark/90 w-full text-left",
  btnDiv:
    "flex md:block items-center bg-brand-primary text-white p-3 rounded cursor-pointer hover:bg-brand-primary/90 w-full text-left",
};

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
        className="md:hidden"
        size="sm"
        startContent={<AdjustmentsHorizontalIcon className="w-4 h-4" />}
        onPress={() => setShowMenu(!showMenu)}
      >
        Filtry
      </Button>
      <Drawer
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        placement="left"
      >
        <div className="p-4">
          <div className="grid grid-cols-2 text-sm gap-1 items-stretch mb-4">
            {categories.map((loc) => (
              <Link
                href={{ pathname: "/trips", query: { slug: loc.slug } }}
                key={loc.slug}
                onClick={() => setShowMenu(false)}
                className={css.btnDiv}
              >
                {loc.name}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 text-sm gap-1 items-stretch">
            {locationsList?.map((loc) =>
              Number(loc.count) > 0 ? (
                <Link
                  className={css.btnDiv}
                  href={{ pathname: "/trips", query: { slug: loc.slug } }}
                  key={loc.slug}
                  onClick={() => setShowMenu(false)}
                >
                  {loc.name} ({loc.count})
                </Link>
              ) : null,
            )}
            <Link href="/trips" className={css.allBtnDiv}>
              Wszystkie ({count})
            </Link>
          </div>
        </div>
      </Drawer>
      <div className="hidden md:block">
        <div className="flex flex-col gap-1 mb-4">
          {categories.map((loc) => (
            <Link
              href={{ pathname: "/trips", query: { slug: loc.slug } }}
              key={loc.slug}
              className={css.btnDiv}
            >
              {loc.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {locationsList?.map((loc) =>
            loc.count !== "0" ? (
              <Link
                href={{ pathname: "/trips", query: { slug: loc.slug } }}
                key={loc.slug}
                className={css.btnDiv}
              >
                {loc.name} ({loc.count})
              </Link>
            ) : null,
          )}
          <Link href="/trips" className={css.allBtnDiv}>
            Wszystkie ({count})
          </Link>
        </div>
      </div>
    </>
  );
};

export default TripListFilter;
