import Header from "components/Header";
import Footer from "components/Footer";
import React from "react";
import css from "styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={css.main}>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
