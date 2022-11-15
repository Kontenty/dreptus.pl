import React from "react";

type Props = {
  list: { name: string; count: number; slug: string }[];
};

const LocationsList = ({ list }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {list.map((loc) => (
        <div
          key={loc.slug}
          role="button"
          className="bg-sky-700 text-white p-3 rounded cursor-pointer"
        >
          {loc.name} ({loc.count})
        </div>
      ))}
    </div>
  );
};

export default LocationsList;
