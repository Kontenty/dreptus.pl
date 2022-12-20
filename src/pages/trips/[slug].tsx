import React, { useContext, useMemo, useState } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { EyeIcon, MapIcon } from "@heroicons/react/24/outline";
import { ProgressSpinner } from "primereact/progressspinner";

import { SingleTripMap } from "components/map/SingleTripMap";
import type { TripDetails, TripFormMap } from "src/types";
import { getIcon } from "lib/utils";
import { getTripBySlug, getTripsForMap, getTripSlugs } from "lib/db";
import css from "styles/Trip.module.css";
import MainLayout from "components/layout/MainLayout";
import SlickArrow from "components/SlickArrow";
import ModalGallery from "components/ModalGallery";
import { GoogleContext } from "context";

const formatDistance = (d: number) => {
  return d < 1000
    ? `${(Math.round(d / 10) * 10).toFixed(0)} m`
    : `${(d / 1000).toFixed(d < 10000 ? 1 : 0)} km`;
};
interface Props {
  trip: TripDetails;
  tripsList: TripFormMap[];
}

const TripPost: NextPage<Props> = ({ trip, tripsList }) => {
  const router = useRouter();
  const { googlemaps } = useContext(GoogleContext);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageSet, setCurrentImageSet] = useState<
    TripDetails["images"] | null
  >(null);
  const [isFullGallery, setIsFullGallery] = useState(false);

  const nearbyTrips = useMemo(
    () =>
      tripsList &&
      googlemaps &&
      tripsList
        .map(function (curr) {
          const distance = googlemaps.geometry.spherical.computeDistanceBetween(
            trip.position,
            curr.position
          );
          return { ...curr, distance };
        })
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
        .slice(1, 4),
    [trip, tripsList, googlemaps]
  );

  return (
    <div>
      {router.isFallback ? (
        <div className="w-full h-80 center-hv">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <div className="p-2 md:p-6">
            <SingleTripMap trip={trip} />
          </div>
          <MainLayout spacing="S">
            <div className="flex items-center pb-2">
              <div className="flex flex-col px-4 md:px-10 border-r-2 border-teal-800">
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
            <section className="md:flex md:justify-between items-center border-b-2 border-teal-800 pb-4">
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
              <div className="px-2 pt-2">
                <a
                  className="flex justify-center items-center gap-4 border-2 border-slate-400 rounded-lg px-6 py-2 md:py-3 hover:shadow-md hover:border-teal-800 hover:text-teal-800 transition-all"
                  href={trip.pdf}
                  rel="noreferrer"
                  role="button"
                  target="_blank"
                >
                  <span>Pobierz&nbsp;mapę</span>
                  <MapIcon className="w-6 h-6" />
                </a>
              </div>
            </section>
            <div className="md:flex gap-4 lg:gap-8">
              <div className="flex flex-col gap-4 md:w-2/3">
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
                    nextArrow={<SlickArrow />}
                    prevArrow={<SlickArrow />}
                    slidesToScroll={1}
                    slidesToShow={1}
                    speed={500}
                    variableWidth
                  >
                    {trip.images.map((img, i) => (
                      <div className="px-2" key={img.url + "div"}>
                        <div
                          className={css.imgBox}
                          onClick={() => {
                            setSelectedImage(i);
                            setCurrentImageSet(trip.images);
                            setIsFullGallery(false);
                          }}
                        >
                          <Image
                            alt="trip photo"
                            className={css.img}
                            height={200}
                            src={img.url}
                            unoptimized
                            width={300}
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
              <div className="md:w-1/3 relative flex flex-col gap-1">
                {trip.pdfImages.map((pdf, i) => (
                  <div
                    className="relative hover:scale-110 hover:z-10 transition-all duration-500 cursor-pointer"
                    key={pdf.title}
                    onClick={() => {
                      setSelectedImage(i);
                      setCurrentImageSet(trip.pdfImages);
                      setIsFullGallery(true);
                    }}
                  >
                    <Image
                      alt={pdf.title}
                      height={400}
                      key={pdf.title}
                      src={pdf.url}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                      }}
                      unoptimized
                      width={400}
                    />
                  </div>
                ))}
              </div>
            </div>
            {nearbyTrips?.length && (
              <section className="mt-8 lg:w-2/3">
                <h3 className="text-center text-xl font-semibold">
                  Najbliższe trasy
                </h3>
                {nearbyTrips?.map((near) => (
                  <div
                    className="flex items-center gap-8 my-4 hover:bg-slate-50"
                    key={near.ID}
                  >
                    <Image
                      alt="w pobliźu"
                      className="rounded"
                      height={100}
                      src={near.thumb_url}
                      unoptimized
                      width={150}
                    />
                    <Link href={`/trips/${near.slug}`}>
                      <div className="flex flex-col gap-1">
                        <h4>{near.title.replace("<br>", " - ")}</h4>
                        <small>
                          {near.category_names.replaceAll(",", ", ")}
                        </small>
                        <span>
                          <span className="text-sm">Odległość </span>{" "}
                          {formatDistance(near.distance)}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </section>
            )}
          </MainLayout>
          {selectedImage !== null && currentImageSet && (
            <ModalGallery
              full={isFullGallery}
              images={currentImageSet}
              initial={selectedImage}
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
    const tripsData = await getTripsForMap();
    const tripsList = tripsData.map((trip) => ({
      ...trip,
      position: { lat: Number(trip.lat), lng: Number(trip.lng) },
    }));
    if (!trip) {
      return { notFound: true };
    }
    return {
      props: {
        params,
        trip: {
          ...trip,
          position: { lat: Number(trip.lat), lng: Number(trip.lng) },
        },
        tripsList,
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
    fallback: "blocking",
  };
};
