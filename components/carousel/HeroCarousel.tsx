import Image from "next/image";
import Slider, { Settings } from "react-slick";

import crs0 from "public/image/main-page/crs-0.png";
import crs1 from "public/image/main-page/crs-1.jpg";
import crs2 from "public/image/main-page/crs-2.jpg";
import crs3 from "public/image/main-page/crs-3.jpg";
import crs4 from "public/image/main-page/crs-4.jpg";

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 7000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
};

const array = [crs0, crs1, crs2, crs3, crs4];

export default function HeroCarousel() {
  return (
    <Slider {...settings}>
      {array.map((img) => (
        <div key={img.src} className="relative">
          <Image src={img} alt="turystyka" />
        </div>
      ))}
    </Slider>
  );
}
