import React from "react";
import Link from "next/link";

type Props = {
  list: { name: string; count: number; slug: string }[];
};

const LocationsList = ({ list }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {list.map((loc) =>
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
          className="bg-brand-green-dark text-white p-3 rounded cursor-pointer hover:bg-brand-green-dark/90"
        >
          Wysztkie ({list.reduce((a, b) => a + b.count, 0)})
        </div>
      </Link>
    </div>
  );
};

export default LocationsList;
