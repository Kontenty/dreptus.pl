"use client";
import AOS from "aos";
import { useEffect } from "react";
import "./customized-aos.css";

/**
 * Client-side AOS (Animate On Scroll) initializer
 * Initializes AOS library with custom settings for smooth animations
 */
export const AosProvider = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out",
      once: true,
    });
  }, []);

  // This component doesn't render anything - it only initializes AOS
  return null;
};
