import React from "react";
import Link from "next/link";

type Props = {
  list: { name: string; count: number; slug: string }[];
};

const LocationsList = ({ list }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {list.map((loc) => (
        <Link
          key={loc.slug}
          href={{ pathname: `/trips`, query: { slug: loc.slug } }}
        >
          <div
            role="button"
            className="bg-sky-700 text-white p-3 rounded cursor-pointer"
          >
            {loc.name} ({loc.count})
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LocationsList;
