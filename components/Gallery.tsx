"use client";
import { useState, useRef, useLayoutEffect } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  ArrowUpRight,
  Plus,
} from "@phosphor-icons/react";
import useAnimatedDialog from "./useAnimatedDialog";
import { AnimatedNumber } from "./MotionBits";
function GalleryPhoto({
  src,
  alt,
  direction,
}: {
  src: string;
  alt: string;
  direction: number;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useLayoutEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <div
      className={`photo-stage t-skel ${loaded ? "is-revealed" : ""}`}
      data-direction={direction}
    >
      <div
        className={`t-skel-skeleton ${!loaded && !error ? "is-pulsing" : ""}`}
        aria-hidden="true"
      >
        <div />
      </div>
      <img
        ref={ref}
        className="t-skel-content"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {error && (
        <p className="photo-error" role="status">
          Gambar tidak dapat dimuatkan. Sila pilih gambar seterusnya.
        </p>
      )}
    </div>
  );
}
export default function Gallery({
  images,
  label = "Suasana StayRehat",
  captions,
  variant = "default",
  initialCount,
}: {
  images: string[];
  label?: string;
  captions?: Record<string, string>;
  variant?: "default" | "editorial";
  initialCount?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(
    initialCount ?? images.length,
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const previousCount = useRef(visibleCount);
  useLayoutEffect(() => {
    if (visibleCount > previousCount.current) {
      gridRef.current
        ?.querySelectorAll<HTMLButtonElement>("button")
        [previousCount.current]?.focus({ preventScroll: true });
    }
    previousCount.current = visibleCount;
  }, [visibleCount]);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const modal = useAnimatedDialog();
  function next(by: number) {
    setDirection(by);
    setActive((n) => (n + by + images.length) % images.length);
  }
  return (
    <>
      <div
        ref={gridRef}
        className={`gallery-grid ${variant === "editorial" ? "editorial-grid" : ""}`}
      >
        {images.slice(0, visibleCount).map((src, i) => {
          const caption = captions?.[src] || `${label}, gambar ${i + 1}`;
          const photo = (
            <button
              className="gallery-image"
              key={src + i}
              onClick={() => {
                setActive(i);
                setDirection(1);
                modal.open();
              }}
              aria-label={`Lihat ${caption}`}
            >
              <img src={src} alt={caption} loading="lazy" />
              <span>
                <ArrowsOut size={21} />
              </span>
            </button>
          );
          return variant === "editorial" ? (
            <figure
              key={src}
              style={{ "--photo-order": Math.min(i, 4) } as React.CSSProperties}
            >
              {photo}
              <figcaption>
                {caption}
                <ArrowUpRight size={17} />
              </figcaption>
            </figure>
          ) : (
            photo
          );
        })}
      </div>
      {visibleCount < images.length && (
        <div className="gallery-more">
          <button onClick={() => setVisibleCount(images.length)}>
            Lihat semua {images.length} gambar <Plus size={18} />
          </button>
        </div>
      )}
      <dialog
        ref={modal.ref}
        className="lightbox t-modal"
        aria-label={`Galeri ${label}`}
        onCancel={modal.onCancel}
        onClick={(e) => {
          if (e.target === modal.ref.current) modal.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            next(-1);
          }
        }}
      >
        <button
          className="icon-button lightbox-close"
          aria-label="Tutup gambar"
          onClick={modal.close}
        >
          <X size={25} />
        </button>
        <GalleryPhoto
          key={active}
          src={images[active]}
          alt={captions?.[images[active]] || `${label}, gambar ${active + 1}`}
          direction={direction}
        />
        <div className="lightbox-controls">
          <button
            className="icon-button"
            aria-label="Gambar sebelumnya"
            onClick={() => next(-1)}
          >
            <ArrowLeft size={23} />
          </button>
          <span aria-live="polite">
            <AnimatedNumber value={String(active + 1)} /> / {images.length}
          </span>
          <button
            className="icon-button"
            aria-label="Gambar seterusnya"
            onClick={() => next(1)}
          >
            <ArrowRight size={23} />
          </button>
        </div>
      </dialog>
    </>
  );
}
