import React from "react";
import Link from "next/link";

const categories = [
  { name: "Piesze", slug: "pieszo" },
  { name: "Rowerowe", slug: "rowerowe" },
  { name: "Dolina bugu", slug: "dolina-bugu" },
];
type Props = {
  locationsList: { name: string; count: number; slug: string }[];
};

const TripListFilter = ({ locationsList }: Props) => {
  return (
    <>
      <span className="pl-3">Filtr kategorii</span>

      <div className="flex flex-col gap-1 mb-4">
        {categories.map((loc) => (
          <Link
            key={loc.slug}
            href={{ pathname: `/trips`, query: { slug: loc.slug } }}
          >
            <div
              role="button"
              className="bg-brand-primary text-white p-3 rounded cursor-pointer hover:bg-brand-primary/90"
            >
              {loc.name}
            </div>
          </Link>
        ))}
      </div>
      <span className="pl-3">Filtr lokalizacji</span>
      <div className="flex flex-col gap-1">
        {locationsList.map((loc) =>
          loc.count > 0 ? (
            <Link
              key={loc.slug}
              href={{ pathname: `/trips`, query: { slug: loc.slug } }}
            >
              <div
                role="button"
                className="bg-brand-primary text-white p-3 rounded cursor-pointer hover:bg-brand-primary/90"
              >
                {loc.name} ({loc.count})
              </div>
            </Link>
          ) : null
        )}
        <Link href="/trips">
          <div
            role="button"
            className="bg-brand-green-dark text-white p-3 mt-2 rounded cursor-pointer hover:bg-brand-green-dark/90"
          >
            Wysztkie ({locationsList.reduce((a, b) => a + b.count, 0)})
          </div>
        </Link>
      </div>
    </>
  );
};

export default TripListFilter;
