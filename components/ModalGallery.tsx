"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Slider from "react-slick";
import SlickArrow from "@/components/SlickArrow";
import css from "./ModalGallery.module.css";

interface ModalGalleryProps {
  images: { guid: string; post_title: string }[];
  initial?: number;
  full?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ModalGallery = ({
  images,
  initial = 0,
  full = false,
  isOpen,
  onClose,
}: ModalGalleryProps) => {
  const sliderRef = useRef<Slider>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const [currentSlide, setCurrentSlide] = useState(initial + 1);

  // Mount portal root safely on client
  useEffect(() => {
    setModalRoot(document.body);
  }, []);

  // Scroll + focus management
  useEffect(() => {
    if (!isOpen) {
      previouslyFocusedElement.current?.focus();
      document.body.style.overflow = "";
      return;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Focus first focusable element in modal
    requestAnimationFrame(() => {
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        sliderRef?.current?.slickNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        sliderRef?.current?.slickPrev();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Outside click
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Wait until modalRoot is ready
  if (!isOpen || !modalRoot) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      role="presentation"
      aria-hidden="true"
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery"
        onKeyDown={handleKeyDown}
        className="bg-transparent shadow-none p-0 max-w-none w-full mx-0 focus:outline-hidden"
        tabIndex={-1}
      >
        <div className="flex justify-between p-4">
          <span className="text-gray-200 text-lg">
            {currentSlide} / {images.length}
          </span>
          <button
            type="button"
            className="text-gray-300 hover:text-white transition-colors p-2 focus:outline-hidden focus:ring-2 focus:ring-white/50 rounded-sm"
            aria-label="Close gallery"
            onClick={onClose}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col justify-center grow lg:px-16 pb-8">
          <Slider
            afterChange={(i: number) => setCurrentSlide(i + 1)}
            arrows
            fade
            infinite
            initialSlide={initial}
            nextArrow={<SlickArrow theme="dark" />}
            prevArrow={<SlickArrow theme="dark" />}
            ref={sliderRef}
            slidesToScroll={1}
            slidesToShow={1}
            speed={500}
          >
            {images.map((img) => (
              <div key={img.guid}>
                <div className={full ? css.imgBoxFull : css.imgBoxBig}>
                  <Image
                    alt={img.post_title || "Trip photo"}
                    className="object-contain object-center"
                    fill
                    sizes="100%"
                    src={img.guid}
                    unoptimized
                  />
                </div>
                {!full && img.post_title && (
                  <p className="text-xl text-slate-100 text-center mt-4">
                    {img.post_title}
                  </p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

export default ModalGallery;
