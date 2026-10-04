"use client";
import { useState } from "react";
import { Sun, Moon, ArrowUpRight } from "@phosphor-icons/react";
export default function PoolFeature() {
  const [night, setNight] = useState(false);
  return (
    <section className="pool-story experience-wrap" id="kolam">
      <div className="pool-photo">
        <img
          key={String(night)}
          className="pool-frame"
          src={night ? "/images/45.webp" : "/images/01.webp"}
          alt={
            night
              ? "Kolam renang StayRehat diterangi lampu pada waktu malam"
              : "Kolam renang StayRehat dikelilingi pokok dan homestay kontena"
          }
          loading="lazy"
          width="1248"
          height="832"
        />
        <p aria-live="polite">
          {night
            ? "Suasana kolam pada waktu malam"
            : "Suasana kolam pada waktu siang"}
        </p>
      </div>
      <div className="pool-copy">
        <h2>
          Seharian santai,
          <br />
          mengikut rentak anda.
        </h2>
        <p>
          Kolam renang, ruang santai luar dan taman mini. Pilih sudut kegemaran
          anda untuk menikmati masa bersama keluarga.
        </p>
        <div
          className="pool-switch"
          role="group"
          aria-label="Lihat suasana kolam"
        >
          <button aria-pressed={!night} onClick={() => setNight(false)}>
            <Sun size={18} />
            Siang
          </button>
          <button aria-pressed={night} onClick={() => setNight(true)}>
            <Moon size={18} />
            Malam
          </button>
        </div>
        <a href="#gallery" className="text-link">
          Terokai semua gambar <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}
