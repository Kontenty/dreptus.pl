import cl from "classnames";

interface Props {
  children: React.ReactNode;
  spacing?: "L" | "S";
}

const Main = ({ children, spacing = "L" }: Props) => {
  const mainClass = cl("max-w-[1100px] grow p-4 md:p-8 flex flex-col mx-auto", {
    "gap-4 md:gap-10": spacing === "L",
    "gap-2 md:gap-4": spacing === "S",
  });
  return <main className={mainClass}>{children}</main>;
};

export default Main;
