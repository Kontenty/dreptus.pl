import Image from "next/image";
import React from "react";
import css from "./Footer.module.css";
import footerImg from "public/image/footer-bg.jpg";

const Footer = () => {
  return (
    <footer>
      <div className={css.stack}>
        <div className={css.content}>
          <div className={css.section}>
            <h3 className={css.heading}>Kategorie tras</h3>
            <a href="/" className={css.badge}>
              Trasy piesze
            </a>
            <a href="/" className={css.badge}>
              Trasy rowerowe
            </a>
            <a href="/" className={css.badge}>
              Trasy motorowe
            </a>
            <a href="/" className={css.badge}>
              Dolina Bugu
            </a>
            <a href="/" className={css.badge}>
              Wszystkie trasy
            </a>
          </div>
          <div className={css.section}>
            <h3 className={css.heading}>Dariusz Mazurek</h3>
            <span className={css.badge}> Tel. 502-071-592</span>
            <span className={css.badge}>
              {" "}
              Email. trip.poczta(małpka)onet.pl
            </span>
            <span className={css.badge}>
              skrytka pocztowa nr 664
              <br />
              00-001 Warszawa 1
            </span>
          </div>
        </div>
        <div className={css.image}>
          <Image src={footerImg} alt="łąka" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
