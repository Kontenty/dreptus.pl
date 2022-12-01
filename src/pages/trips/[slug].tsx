import React, { useState } from "react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Slider from "react-slick";
import { EyeIcon, MapIcon } from "@heroicons/react/24/outline";

import { SingleTripMap } from "components/map/SingleTripMap";
import type { Trip } from "src/types";
import { getIcon } from "lib/utils";
import { getTripSlugs, getTripBySlug } from "lib/db";
import css from "styles/Trip.module.css";
import MainLayout from "components/layout/MainLayout";
import SlickArrow from "components/SlickArrow";
import ModalGallery from "components/ModalGallery";

interface Props {
  trip: Trip;
}

const TripPost: NextPage<Props> = ({ trip }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageSet, setCurrentImageSet] = useState<Trip["images"] | null>(
    null
  );
  const [isFullGallery, setIsFullGallery] = useState(false);
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <div className="p-6">
            <SingleTripMap trip={trip} />
          </div>
          <MainLayout spacing="S">
            <div className="flex items-center pb-2">
              <div className="flex flex-col px-10 border-r-2 border-teal-800">
                <h3 className="text-2xl mb-4">{trip.number}</h3>
                {getIcon(trip.type)}
              </div>
              <div className="px-10">
                <h1
                  className="text-3xl text-teal-800"
                  dangerouslySetInnerHTML={{ __html: trip.post_title }}
                ></h1>
              </div>
            </div>
            <section className="flex justify-between items-center border-b-2 border-teal-800 pb-4">
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
              <div>
                <a
                  role="button"
                  target="_blank"
                  href={trip.pdf}
                  rel="noreferrer"
                  className="flex items-center gap-4 border-2 border-slate-400 rounded-lg px-6 py-3 hover:shadow-md hover:border-teal-800 hover:text-teal-800 transition-all"
                >
                  <span>Pobierz&nbsp;mapę</span>
                  <MapIcon className="w-6 h-6" />
                </a>
              </div>
            </section>
            <div className="flex gap-4 lg:gap-8">
              <div className="flex flex-col gap-4 w-2/3">
                <article
                  className="post-article"
                  dangerouslySetInnerHTML={{
                    __html: trip.post_content.replaceAll(
                      'style="color: #000080;',
                      ""
                    ),
                  }}
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
                          onClick={() => {
                            setSelectedImage(i);
                            setCurrentImageSet(trip.images);
                            setIsFullGallery(false);
                          }}
                        >
                          <Image
                            src={img.url}
                            height={200}
                            width={300}
                            alt="trip photo"
                            className={css.img}
                          />
                          <div className={css.imgOverlay}>
                            <EyeIcon className={css.imgIcon} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </aside>
              </div>
              <div className="w-1/3 relative flex flex-col gap-1">
                {trip.pdfImages.map((pdf, i) => (
                  <div
                    key={pdf.title}
                    className="relative hover:scale-110 hover:z-10 transition-all duration-500 cursor-pointer"
                    onClick={() => {
                      setSelectedImage(i);
                      setCurrentImageSet(trip.pdfImages);
                      setIsFullGallery(true);
                    }}
                  >
                    <Image
                      key={pdf.title}
                      src={pdf.url}
                      alt={pdf.title}
                      width={200}
                      height={200}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </MainLayout>
          {selectedImage !== null && currentImageSet && (
            <ModalGallery
              images={currentImageSet}
              initial={selectedImage}
              full={isFullGallery}
              onClose={() => {
                setSelectedImage(null);
                setCurrentImageSet(null);
                setIsFullGallery(false);
              }}
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
    const trip = await getTripBySlug(params.slug);
    return {
      props: {
        params,
        trip: {
          ...trip,
          position: { lat: Number(trip.lat), lng: Number(trip.lng) },
        },
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
