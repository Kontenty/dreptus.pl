import Image from "next/image";
import foot from "public/image/foot-print.png";

type Props = {
  length?: number;
};

const Hr = ({ length = 10 }: Props) => {
  return (
    <div className="flex gap-2 max-w-full overflow-hidden">
      {Array.from(Array(length).keys()).map((i) => (
        <div key={i}>
          <Image alt="foot print" src={foot} />
        </div>
      ))}
    </div>
  );
};

export default Hr;
