import Image from "next/image";
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import SlickArrow from "components/SlickArrow";
import css from "./ModalGallery.module.css";

const ModalGallery = ({
  images,
  initial = 0,
  full = false,
  onClose,
}: {
  images: { url: string; title: string }[];
  initial?: number;
  full?: boolean;
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
      <div className="flex flex-col justify-center flex-grow lg:px-16 pb-8">
        <div onClick={stopClose}>
          <Slider
            afterChange={(i: number) => setCurrentSlide(i + 1)}
            arrows
            fade
            infinite
            initialSlide={initial}
            nextArrow={<SlickArrow />}
            prevArrow={<SlickArrow />}
            slidesToScroll={1}
            slidesToShow={1}
            speed={500}
          >
            {images.map((img) => (
              <React.Fragment key={img.url}>
                <div className={full ? css.imgBoxFull : css.imgBoxBig}>
                  <Image
                    alt="trip photo"
                    className="object-contain object-center"
                    fill
                    sizes="100%"
                    src={img.url}
                    unoptimized
                  />
                </div>
                {!full && (
                  <h1 className="text-xl text-white text-center mt-4">
                    {img.title}
                  </h1>
                )}
              </React.Fragment>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
