import Header from "components/Header";
import Footer from "components/Footer";
import React from "react";
import css from "styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
