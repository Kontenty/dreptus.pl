import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
// import ErrorPage from "next/error";
import Slider from "react-slick";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import type { Trip } from "types";
import { getTripSlugs, getTripBySlug } from "lib/db";
import { FootmanPinIcon, CyclistPinIcon } from "components/icons";
import css from "styles/Trip.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SlickArrow(props: any) {
  const { className, onClick } = props;
  const isLeft: boolean = className.includes("slick-prev");
  return (
    <button className={isLeft ? css.arrowBoxL : css.arrowBoxR}>
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
interface Props {
  trip: Trip;
}
const Icon: Record<string, JSX.Element> = {
  "10898": <FootmanPinIcon />,
  "10899": <CyclistPinIcon />,
};
const TripPost: NextPage<Props> = ({ trip }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <div className="flex items-center py-10">
            <div className="flex flex-col px-10 border-r-2 border-teal-800">
              <h3 className="text-2xl mb-4">{trip.number}</h3>
              {Icon[trip.type]}
            </div>
            <div className="px-10">
              <h1
                className="text-3xl text-teal-800"
                dangerouslySetInnerHTML={{ __html: trip.post_title }}
              ></h1>
            </div>
          </div>
          <section>
            <div className={css.adnotations}>
              <span className="text-bolder">Opracowanie trasy</span>
              <span className="text-indigo-800">{trip.author}</span>
              <span className="text-bolder">Długość trasy</span>
              <span className="text-indigo-800">{trip.length}</span>
              <span className="text-700">Do odwiedzenia</span>
              <span className="text-indigo-800">{trip.pk}</span>
              <span className="text-bolder">Finansowanie</span>
              <span className="text-indigo-800">{trip.founding}</span>
            </div>
          </section>
          <article
            className="px-6 py-4 bg-white rounded-md"
            dangerouslySetInnerHTML={{ __html: trip.post_content }}
          ></article>
          <aside>
            <Slider
              arrows
              infinite
              speed={500}
              // centerMode
              slidesToShow={1}
              slidesToScroll={1}
              variableWidth
              prevArrow={<SlickArrow />}
              nextArrow={<SlickArrow />}
            >
              {trip.images.map((img, i) => (
                <div key={img.url + "div"} className="px-2">
                  <div
                    className={css.imgBox}
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image
                      src={img.url}
                      height={200}
                      width={300}
                      alt="trip photo"
                      className={css.img}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </aside>
          {selectedImage !== null && (
            <ModalGallery
              images={trip.images}
              initial={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </>
      )}
    </div>
  );
};
export default TripPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug && typeof params.slug === "string") {
    const trip: Trip[] = await getTripBySlug(params.slug);
    return {
      props: {
        params,
        trip,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allTrips = await getTripSlugs();
  return {
    paths:
      allTrips?.map((trip) => ({
        params: {
          slug: `${trip?.post_name}`,
          id: trip?.ID,
        },
      })) || [],
    fallback: false,
  };
};

const ModalGallery = ({
  images,
  initial = 0,
  onClose,
}: {
  images: Trip["images"];
  initial?: number;
  onClose: () => void;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const stopClose = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };
  useEffect(() => {
    if (onClose) {
      const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener("keydown", keyDownHandler);

      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [onClose]);
  return (
    <div className={css.modalWrapper} onClick={onClose}>
      <div className="flex justify-between p-4">
        <span className="text-gray-200">
          {currentSlide || initial + 1} / {images.length}
        </span>
        <XMarkIcon
          className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition-colors"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col justify-center flex-grow px-16 pb-8">
        <div onClick={stopClose}>
          <Slider
            arrows
            infinite
            fade
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            prevArrow={<SlickArrow />}
            nextArrow={<SlickArrow />}
            initialSlide={initial}
            afterChange={(i: number) => setCurrentSlide(i + 1)}
          >
            {images.map((img) => (
              <React.Fragment key={img.url}>
                <div className={css.imgBoxBig}>
                  <Image
                    src={img.url}
                    layout="fill"
                    objectFit="contain"
                    alt="trip photo"
                  />
                </div>
                <h1 className="text-xl text-white text-center mt-4">
                  {img.title}
                </h1>
              </React.Fragment>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
