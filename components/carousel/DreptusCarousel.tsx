import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const DreptusCarousel = ({ width = 200 }: Props) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ width: width + "px" }}>
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
