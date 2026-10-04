"use client";
import { useState } from "react";
import {
  UsersThree,
  SlidersHorizontal,
  HouseLine,
  Wallet,
  Leaf,
  CaretDown,
} from "@phosphor-icons/react";
import copy from "../lib/about-content.json";
const visuals = [
  {
    src: "/images/32.webp",
    alt: "Bangunan homestay kontena StayRehat yang berwarna-warni",
    caption: "Ruang penginapan untuk keluarga.",
    Icon: UsersThree,
  },
  {
    src: "/images/44.webp",
    alt: "Ruang majlis pertunangan dengan hiasan bunga di StayRehat",
    caption: "Daripada hujung minggu santai ke majlis keluarga.",
    Icon: SlidersHorizontal,
  },
  {
    src: "/images/35.webp",
    alt: "Ruang duduk berbumbung di StayRehat",
    caption: "Ruang sendiri untuk menikmati masa bersama.",
    Icon: HouseLine,
  },
  {
    src: "/images/02.webp",
    alt: "Bilik penginapan StayRehat",
    caption: "Selesa, dengan nilai yang bermakna.",
    Icon: Wallet,
  },
  {
    src: "/images/40.webp",
    alt: "Pokok dan kehijauan di kawasan StayRehat",
    caption: "Dekat dengan alam, jauh daripada kesibukan.",
    Icon: Leaf,
  },
];
export default function AboutValues() {
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  return (
    <section className="story-values story-wrap" aria-labelledby="values-title">
      <div className="values-visual">
        <div className="values-photo-stack">
          {visuals.map((v, i) => (
            <img
              key={v.src}
              src={v.src}
              alt={v.alt}
              aria-hidden={photo !== i}
              className={photo === i ? "is-active" : ""}
              loading="lazy"
              width="1000"
              height="750"
            />
          ))}
        </div>
        <p aria-live="polite">{visuals[photo].caption}</p>
      </div>
      <div className="values-content">
        <h2 id="values-title">
          Kecil perinciannya.
          <br />
          Besar maknanya.
        </h2>
        <p className="values-intro">
          Kelebihan StayRehat untuk percutian anda.
        </p>
        <div className="values-list">
          {copy.reasons.map((reason, i) => {
            const Icon = visuals[i].Icon;
            const open = active === i;
            return (
              <div
                className="t-acc story-value"
                key={reason.title}
                data-open={open}
              >
                <h3>
                  <button
                    className="t-acc-head"
                    id={`reason-${i}`}
                    aria-expanded={open}
                    aria-controls={`reason-panel-${i}`}
                    onClick={() => {
                      setActive(open ? -1 : i);
                      setPhoto(i);
                    }}
                  >
                    <Icon size={25} weight="light" />
                    <span>{reason.title}</span>
                    <span className="t-acc-chevron">
                      <CaretDown size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  className="t-acc-panel"
                  id={`reason-panel-${i}`}
                  role="region"
                  aria-labelledby={`reason-${i}`}
                  aria-hidden={!open}
                  inert={!open}
                >
                  <div className="t-acc-panel-inner">
                    <p>{reason.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
