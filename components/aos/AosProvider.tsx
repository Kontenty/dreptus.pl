"use client";
import AOS from "aos";
import { useEffect } from "react";
import "./customized-aos.css";

const AosProvider = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out", once: true });
  }, []);
  return <></>;
};

export default AosProvider;
