"use client";
import { useState } from "react";
import Gallery from "./Gallery";
import { experiencePhotos } from "../lib/experience";
const filters = ["Semua", "Kolam & taman", "Ruang & kemudahan", "Majlis"];
export default function ExperienceGallery() {
  const [filter, setFilter] = useState("Semua");
  const photos = experiencePhotos.filter(
    (p) => filter === "Semua" || p.category === filter,
  );
  return (
    <>
      <div className="collection-toolbar">
        <div
          className="collection-filters"
          role="group"
          aria-label="Tapis galeri gambar"
        >
          {filters.map((name) => (
            <button
              key={name}
              aria-label={name}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
              <span aria-hidden="true">
                {name === "Semua"
                  ? experiencePhotos.length
                  : experiencePhotos.filter((p) => p.category === name).length}
              </span>
            </button>
          ))}
        </div>
        <span className="collection-count" aria-live="polite">
          {photos.length} gambar
        </span>
      </div>
      <Gallery
        key={filter}
        images={photos.map((p) => p.src)}
        captions={Object.fromEntries(photos.map((p) => [p.src, p.caption]))}
        variant="editorial"
        initialCount={8}
      />
    </>
  );
}
