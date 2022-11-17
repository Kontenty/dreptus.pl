import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const arrowStyle =
  "absolute flex justify-center items-center w-9 h-9 bg-green-700 top-0 bottom-0 my-auto rounded-full z-10";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SlickArrow(props: any) {
  const { className, onClick } = props;
  const isLeft: boolean = className.includes("slick-prev");
  return (
    <button className={`${arrowStyle} ${isLeft ? "-left-10" : "-right-11"}`}>
      {isLeft ? (
        <ArrowLeftCircleIcon onClick={onClick} className="text-white w-6 h-6" />
      ) : (
        <ArrowRightCircleIcon
          onClick={onClick}
          className="text-white w-6 h-6"
        />
      )}
    </button>
  );
}
