"use client";

import { pl } from "primelocale/js/pl.js";
import { addLocale, locale } from "primereact/api";
import { useEffect } from "react";

addLocale("pl", pl);

export const InitLocale = () => {
  console.log("InitLocale");
  useEffect(() => {
    addLocale("pl", pl);
    locale("pl");
  }, []);

  return null;
};
