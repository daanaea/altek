"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type LightboxGalleryProps = {
  images: string[];
  categoryTitle: string;
};

export default function LightboxGallery({
  images,
  categoryTitle,
}: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    setIsVisible(false);

    window.setTimeout(() => {
      setActiveIndex(null);
    }, 200);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === images.length - 1 ? 0 : current + 1;
    });
  }, [images.length]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);

    window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchEndX.current = null;
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const swipeDistance =
      touchStartX.current - touchEndX.current;

    const minimumSwipeDistance = 50;

    if (swipeDistance > minimumSwipeDistance) {
      showNext();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      showPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((imageSrc, index) => (
          <button
            key={imageSrc}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            aria-label={`Open ${categoryTitle} photo ${index + 1}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={`${categoryTitle} photo ${index + 1}`}
                fill
                quality={74}
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 64px) / 2), 394px"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

              <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-xl text-slate-900 opacity-0 shadow-md backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                +
              </div>
            </div>
          </button>
        ))}
      </section>

      {activeIndex !== null && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center px-3 py-16 backdrop-blur-sm transition duration-200 sm:px-8 ${
            isVisible
              ? "bg-black/90 opacity-100"
              : "bg-black/0 opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:scale-105 hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Close image preview"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:scale-105 hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          <div
            className={`relative h-full w-full max-w-6xl touch-pan-y transition duration-300 ease-out ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={`${categoryTitle} photo ${activeIndex + 1}`}
              fill
              quality={88}
              className="select-none object-contain"
              sizes="100vw"
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:scale-105 hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}