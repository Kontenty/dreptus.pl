"use client";
import { useEffect } from "react";
import AOS from "aos";
import "./customized-aos.css";
import { addLocale } from "primereact/api";

addLocale("pl", {
  accept: "Tak",
  reject: "Nie",
  choose: "Wybierz",
  upload: "Wyślij",
  cancel: "Anuluj",
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  dayNamesMin: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "STY",
    "LUT",
    "MAR",
    "KWI",
    "MAJ",
    "CZE",
    "LIP",
    "SIE",
    "WRZ",
    "PAŹ",
    "LIS",
    "GRU",
  ],
  today: "Dziś",
  clear: "Wyczyść",
  weekHeader: "tydz.",
  firstDayOfWeek: 1,
  dateFormat: "dd/mm/yyyy",
  weak: "Słaby",
  medium: "Umiarkowany",
  strong: "Silny",
  passwordPrompt: "Podaj hasło",
});

const AosProvider = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out", once: true });
  }, []);
  return <></>;
};

export default AosProvider;
