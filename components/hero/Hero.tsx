import React from "react";
import Image from "next/image";
import css from "./Hero.module.css";
import familyImg from "public/image/main-page/family.png";
import familyCyclingImg from "public/image/main-page/family-cycling.png";
import coverImg from "public/image/main-page/landscape.jpg";
import HeroCarousel from "components/carousel/HeroCarousel";

const Hero = () => {
  return (
    <section className={css.heroRoot}>
      <div className={css.background}>
        <Image
          src={coverImg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          alt="krajobraz"
        />
      </div>
      <div className={css.heroContent}>
        <div className={css.baner}>
          <div className={css.banerInner}>
            <div className="flex flex-col mx-auto 2xl:gap-2">
              <span className={css.banerText}>Turystyczna</span>
              <span className={css.banerText}>Rodzinna</span>
              <span className={css.banerText}>Impreza</span>
              <span className={css.banerText}>Plenerowa</span>
            </div>
            <div className="relative flex gap-8 mx-auto">
              <Image src={familyImg} height={150} width={150} alt="rodzina" />
              <Image
                src={familyCyclingImg}
                width={300}
                height={150}
                alt="rodzina na rowerze"
              />
            </div>
          </div>
        </div>
        <aside className={css.aside}>
          <div className={css.imgBox}>
            <HeroCarousel />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
