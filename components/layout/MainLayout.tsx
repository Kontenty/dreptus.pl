import React from "react";
import cl from "classnames";
import css from "styles/Home.module.css";

type Props = {
  children: React.ReactNode;
  spacing?: "L" | "S";
};

const MainLayout = ({ children, spacing = "L" }: Props) => {
  const mainClass = cl(css.main, {
    "gap-10": spacing === "L",
    "gap-4": spacing === "S",
  });
  return <main className={mainClass}>{children}</main>;
};

export default MainLayout;
