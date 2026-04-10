import Image from "next/image";
import HeroCarousel from "@/components/carousel/HeroCarousel";
import familyImg from "@/public/image/main-page/family.png";
import familyCyclingImg from "@/public/image/main-page/family-cycling.png";
import coverImg from "@/public/image/main-page/landscape.jpg";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.heroRoot}>
      <div className="relative">
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
      <div className="relative md:flex md:justify-center p-6 md:p-10">
        <div className="flex">
          <div className="flex flex-col justify-around gap-4 py-8 px-16 ml-auto backdrop-blur-sm bg-white/30">
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
              <Image alt="rodzina" height={150} src={familyImg} width={150} />
              <Image
                alt="rodzina na rowerze"
                height={150}
                src={familyCyclingImg}
                width={300}
              />
            </div>
          </div>
        </div>
        <aside
          className={`${css.aside} hidden sm:block`}
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <div className={css.imgBox}>
            <HeroCarousel />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
