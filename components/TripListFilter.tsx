"use client";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, Drawer, useOverlayState } from "@heroui/react";
import Link from "next/link";
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
  const drawerState = useOverlayState();
  return (
    <>
      <Drawer state={drawerState}>
        <Button
          className="md:hidden"
          onPress={drawerState.open}
          size="sm"
          variant="secondary"
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          Filtry
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <div className="p-4">
                <div className="mb-4 grid grid-cols-2 items-stretch gap-1 text-sm">
                  {categories.map((loc) => (
                    <Link
                      className={css.btnDiv}
                      href={{ pathname: "/trips", query: { slug: loc.slug } }}
                      key={loc.slug}
                      onClick={() => drawerState.close()}
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 items-stretch gap-1 text-sm">
                  {locationsList?.map((loc) =>
                    Number(loc.count) > 0 ? (
                      <Link
                        className={css.btnDiv}
                        href={{ pathname: "/trips", query: { slug: loc.slug } }}
                        key={loc.slug}
                        onClick={() => drawerState.close()}
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
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
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
