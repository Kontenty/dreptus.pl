import Image from "next/image";
import Slider, { Settings } from "react-slick";
import img1 from "public/image/carousel/dreptus-ver-1.jpg";
import img2 from "public/image/carousel/dreptus-ver-2.jpg";
import img3 from "public/image/carousel/dreptus-ver-3.jpg";
import img4 from "public/image/carousel/dreptus-ver-4.jpg";
import img5 from "public/image/carousel/dreptus-ver-5.jpg";
import img6 from "public/image/carousel/dreptus-ver-6.jpg";
import img7 from "public/image/carousel/dreptus-ver-7.jpg";
import img8 from "public/image/carousel/dreptus-ver-8.jpg";
import img9 from "public/image/carousel/dreptus-ver-9.jpg";

type Props = { width?: number };

const imgNum = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
/* const Slides = () => {
  return imgNum.map((img) => (
    <div key={img}>
      <img src={`/image/dreptus-ver-${img}.jpg`} className="w-auto" />
    </div>
  ));
}; */

const DreptusCarousel = ({ width }: Props) => {
  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplaySpeed: 3000,
    autoplay: true,
    easing: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ width: width ? width + "px" : "auto" }}>
      <Slider {...settings}>
        {imgNum.map((img) => (
          <div key={img.src}>
            <Image src={img} alt="Dreptuś" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DreptusCarousel;
