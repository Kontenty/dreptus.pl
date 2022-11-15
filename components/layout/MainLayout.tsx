import React from "react";
import css from "styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <main className={css.main}>{children}</main>;
};

export default MainLayout;
