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
          alt="krajobraz"
          className="object-cover object-center"
          fill
          loading="eager"
          placeholder="blur"
          sizes="100vw"
          src={coverImg}
        />
      </div>
      <div className={css.heroContent}>
        <div className={css.baner}>
          <div className={css.banerInner}>
            <div
              className="flex flex-col mx-auto 2xl:gap-2"
              data-aos="fade-right"
            >
              <span className={css.banerText}>Turystyczna</span>
              <span className={css.banerText}>Rodzinna</span>
              <span className={css.banerText}>Impreza</span>
              <span className={css.banerText}>Plenerowa</span>
            </div>
            <div
              className="relative flex justify-center md:gap-8 mx-auto"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <Image
                alt="rodzina"
                height={150}
                src={familyImg}
                unoptimized
                width={150}
              />
              <Image
                alt="rodzina na rowerze"
                height={150}
                src={familyCyclingImg}
                unoptimized
                width={300}
              />
            </div>
          </div>
        </div>
        <aside className={css.aside} data-aos="fade-left" data-aos-delay="100">
          <div className={css.imgBox}>
            <HeroCarousel />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
