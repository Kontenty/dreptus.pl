import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";

const btn = cva(
  [
    "absolute flex justify-center items-center h-9 top-0 bottom-0 my-auto rounded-full shadow-lg z-10",
    "hover:shadow-xl",
  ],
  {
    variants: {
      side: {
        left: "left-0 md:-left-10",
        right: "right-0 md:-right-11",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);
const svgClass = cva(["w-9 h-9"], {
  variants: {
    theme: {
      light: "text-brand-green-dark",
      dark: "text-slate-100",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

interface SlickArrowProps {
  className?: string;
  onClick?: () => void;
  theme?: "light" | "dark";
}

export default function SlickArrow({
  className,
  onClick,
  theme = "light",
}: SlickArrowProps) {
  const isLeft = className?.includes("slick-prev") ?? false;
  const side = className?.includes("slick-prev") ? "left" : "right";
  return (
    <button type="button" className={btn({ side })}>
      {isLeft ? (
        <ArrowLeftCircleIcon
          className={svgClass({ theme })}
          onClick={onClick}
        />
      ) : (
        <ArrowRightCircleIcon
          className={svgClass({ theme })}
          onClick={onClick}
        />
      )}
    </button>
  );
}
