"use client";
import css from "./tripDetail.module.css";
import { GoogleContext } from "@/lib/context";
import { getIcon } from "@/lib/utils";
import { TripFormMap } from "@/types";
import { MapIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import Slider from "react-slick";
import MainLayout from "./layout/MainLayout";
import { SingleTripMap } from "./map/SingleTripMap";
import ModalGallery from "./ModalGallery";
import SlickArrow from "./SlickArrow";
import Image from "next/image";
import { TripDetails } from "@/types/gql/graphql";

const formatDistance = (d?: number) => {
  if (!d) return;
  const precision = d < 10000 ? 1 : 0;
  return d < 1000
    ? `${(Math.round(d / 10) * 10).toFixed(0)} m`
    : `${(d / 1000).toFixed(precision)} km`;
};

interface Props {
  trip: TripDetails;
  tripsList: Pick<
    TripFormMap,
    "lat" | "lng" | "slug" | "ID" | "thumb_url" | "title" | "category_names"
  >[];
}

const TripDetail = ({ trip, tripsList }: Props) => {
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
            { lat: Number(trip.lat), lng: Number(trip.lng) },
            { lat: Number(curr.lat), lng: Number(curr.lng) }
          );
          return { ...curr, distance };
        })
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
        .slice(1, 4),
    [trip, tripsList, googlemaps]
  );

  const handleDownload = async (url: string) => {
    let linkUrl = url;
    const fileName = url.split("/").at(-1);
    const res = await fetch(url, { method: "GET" });
    const blob = await res.blob();
    linkUrl = window?.URL?.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = linkUrl;
    tempLink.setAttribute("download", fileName ?? "mapa.pdf");

    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    return setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(linkUrl);
    }, 200);
  };

  const handleImgClick = (id: number) => {
    setSelectedImage(id);
    setCurrentImageSet(trip.images);
    setIsFullGallery(false);
  };

  return (
    <div>
      <div>
        <div className="p-2 md:p-6">
          <SingleTripMap trip={trip} />
        </div>
        <MainLayout spacing="S">
          <div className="flex items-center pb-2">
            <div className="flex flex-col px-4 md:px-10 border-r-2 border-brand-green-dark">
              <h3 className="text-2xl mb-4">{trip.number}</h3>
              {getIcon(trip.type)}
            </div>
            <div className="px-10">
              <h1
                className="text-3xl"
                dangerouslySetInnerHTML={{ __html: trip.post_title }}
              ></h1>
            </div>
          </div>
          <section className="md:flex md:justify-between items-center border-b-2 border-primary-dark pb-4">
            <div className={css.adnotations}>
              <i className="pi pi-user"></i>
              <span className="text-bolder">Opracowanie trasy</span>
              <span className="text-brand-primary">{trip.author}</span>
              <i className="pi pi-arrows-h"></i>
              <span className="text-bolder">Długość trasy</span>
              <span className="text-brand-primary">{trip.length}</span>
              <i className="pi pi-sort-numeric-up"></i>
              <span className="text-700">Do odwiedzenia</span>
              <span className="text-brand-primary">{trip.pk}</span>
              <i className="pi pi-dollar"></i>
              <span className="text-bolder">Finansowanie</span>
              <span className="text-brand-primary">{trip.founding}</span>
            </div>
            <div className="px-2 pt-2">
              <button
                className="flex justify-center items-center gap-4 border-2 border-slate-400 rounded-lg px-6 py-2 md:py-3 hover:shadow-md hover:border-teal-800 hover:text-teal-800 transition-all"
                onClick={() => handleDownload(trip?.pdf ?? "")}
              >
                <span>Pobierz&nbsp;mapę</span>
                <MapIcon className="w-6 h-6" />
              </button>
            </div>
          </section>
          <div className="flex-grow" data-aos="fade-up">
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
              {trip?.images?.map((img, i) => (
                <div className="px-2" key={img?.guid + "div"}>
                  <button onClick={() => handleImgClick(i)}>
                    <div className={css.imgBox}>
                      <Image
                        alt="trip photo"
                        className={css.img}
                        height={200}
                        src={img?.guid ?? ""}
                        unoptimized
                        width={300}
                      />
                      <div className={css.imgOverlay}>
                        <EyeIcon className={css.imgIcon} />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </Slider>
          </div>
          <section className="md:flex gap-4 lg:gap-8">
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
            </div>
            <aside className="md:w-1/3 relative flex flex-col gap-1">
              {trip.pdfImages.map((pdf, i) => (
                <button
                  key={pdf.post_title}
                  onClick={() => {
                    setSelectedImage(i);
                    setCurrentImageSet(trip.pdfImages);
                    setIsFullGallery(true);
                  }}
                >
                  <div className="relative hover:scale-110 hover:z-10 transition-all duration-500 cursor-pointer">
                    <Image
                      alt={pdf.post_title}
                      height={400}
                      key={pdf.post_title}
                      src={pdf.guid}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                      }}
                      unoptimized
                      width={400}
                    />
                  </div>
                </button>
              ))}
            </aside>
          </section>
          {nearbyTrips?.length && (
            <section className="mt-8 lg:w-2/3" data-aos="fade-up">
              <h3 className="text-center text-xl font-semibold">
                Najbliższe trasy
              </h3>
              {nearbyTrips?.map((near) => (
                <Link href={`/trips/${near.slug}`} key={near.ID}>
                  <div className="flex items-center gap-8 my-4 hover:bg-slate-50">
                    <Image
                      alt="w poblizu"
                      className="rounded"
                      height={100}
                      src={near?.thumb_url ?? ""}
                      unoptimized
                      width={150}
                    />
                    <div className="flex flex-col gap-1">
                      <h4>{near.title.replace("<br>", " - ")}</h4>
                      <small>
                        {near?.category_names?.replaceAll(",", ", ")}
                      </small>
                      <span>
                        <span className="text-sm">Odległość </span>{" "}
                        {formatDistance(near?.distance)}
                      </span>
                    </div>
                  </div>
                </Link>
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
      </div>
    </div>
  );
};

export default TripDetail;
