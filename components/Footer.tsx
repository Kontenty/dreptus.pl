import Image from "next/image";
import Link from "next/link";
import React from "react";
import css from "./Footer.module.css";
import footerImg from "@/public/image/footer-bg.jpg";

const Footer = () => {
  return (
    <footer>
      <div className={css.stack}>
        <div className={css.content}>
          <div className={css.section}>
            <h3 className={css.heading}>Kategorie tras</h3>
            <Link
              className={css.badge}
              href={{ pathname: "/trips", query: { slug: "pieszo" } }}
            >
              Trasy piesze
            </Link>
            <Link
              className={css.badge}
              href={{ pathname: "/trips", query: { slug: "rowerowe" } }}
            >
              Trasy rowerowe
            </Link>
            <Link
              className={css.badge}
              href={{ pathname: "/trips", query: { slug: "dolina-bugu" } }}
            >
              Dolina Bugu
            </Link>
            <Link className={css.badge} href="/trips">
              Wszystkie trasy
            </Link>
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
          <Image alt="łąka" src={footerImg} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
