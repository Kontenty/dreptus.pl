import React from "react";
import cl from "classnames";

type Props = {
  children: React.ReactNode;
  spacing?: "L" | "S";
};

const MainLayout = ({ children, spacing = "L" }: Props) => {
  const mainClass = cl("p-4 md:p-8 flex flex-col mx-auto grow max-w-[1100px]", {
    "gap-4 md:gap-10": spacing === "L",
    "gap-2 md:gap-4": spacing === "S",
  });
  return <main className={mainClass}>{children}</main>;
};

export default MainLayout;
