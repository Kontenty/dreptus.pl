import Header from "components/Header";
import Footer from "components/Footer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FullWidthLayout = ({ children }: Props) => {
  return (
    <div id="root" className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default FullWidthLayout;
