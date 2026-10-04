import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  SwimmingPool,
  Fire,
  Car,
  Tree,
  CookingPot,
} from "@phosphor-icons/react/dist/ssr";
import PoolFeature from "./PoolFeature";
import ExperienceGallery from "./ExperienceGallery";
import "./experience.css";
const facilities = [
  {
    Icon: SwimmingPool,
    title: "Kolam renang",
    detail: "Masa santai bersama keluarga",
  },
  { Icon: Fire, title: "Kawasan BBQ", detail: "Berkumpul, makan dan berbual" },
  { Icon: Car, title: "Parkir percuma", detail: "Tempat letak kereta percuma" },
  {
    Icon: Tree,
    title: "Ruang santai & taman",
    detail: "Ruang santai luar & taman mini",
  },
  {
    Icon: CookingPot,
    title: "Peralatan memasak",
    detail: "Untuk tetamu tertentu",
  },
];
export default function ExperiencePage() {
  return (
    <main id="main" className="experience-page">
      <section className="experience-hero">
        <img
          className="experience-cover"
          src="/images/31.webp"
          alt="Cahaya pagi di kolam renang dan homestay kontena StayRehat"
          width="960"
          height="540"
          fetchPriority="high"
        />
        <div className="experience-hero-shade" />
        <div className="experience-hero-copy">
          <p className="experience-kicker">FACILITIES & GALLERY</p>
          <h1>
            Hari santai.
            <br />
            Kenangan indah.
          </h1>
          <p>
            Dari tepi kolam ke ruang meraikan keluarga. Temui sisi StayRehat
            yang menanti anda.
          </p>
          <a className="experience-hero-link" href="#gallery">
            Lihat galeri gambar <ArrowDownRight size={22} />
          </a>
        </div>
      </section>
      <nav className="experience-jump" aria-label="Terokai halaman">
        <div>
          <a href="#kolam">Kolam & suasana</a>
          <a href="#kemudahan">Kemudahan</a>
          <a href="#majlis">Majlis keluarga</a>
          <a href="#gallery">
            Galeri gambar <ArrowDownRight size={16} />
          </a>
        </div>
      </nav>
      <PoolFeature />
      <section className="comfort-section" id="kemudahan">
        <div className="experience-wrap">
          <div className="comfort-heading">
            <h2>Selesa, seperti di rumah.</h2>
            <p>Kemudahan yang tersedia untuk semua tetamu.</p>
          </div>
          <div className="comfort-grid">
            {facilities.map(({ Icon, title, detail }) => (
              <div key={title}>
                <Icon size={32} weight="light" />
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="occasion-section experience-wrap" id="majlis">
        <div className="occasion-heading">
          <h2>
            Raikan yang dekat
            <br />
            di hati.
          </h2>
          <p>
            Kami juga menyediakan tempat khas untuk acara kecil, seperti
            birthday party, majlis pertunangan dan family day.
          </p>
          <Link href="/rooms-rates/#rates" className="text-link">
            Lihat pakej majlis <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="occasion-photos">
          <figure>
            <img
              src="/images/43.webp"
              alt="Susunan meja dan pelamin untuk majlis keluarga di StayRehat"
              loading="lazy"
              width="1000"
              height="750"
            />
            <figcaption>Ruang untuk meraikan bersama.</figcaption>
          </figure>
          <figure>
            <img
              src="/images/44.webp"
              alt="Hiasan ruang majlis pertunangan dengan kerusi rotan dan bunga"
              loading="lazy"
              width="1000"
              height="750"
            />
            <figcaption>Kenangan untuk dibawa pulang.</figcaption>
          </figure>
        </div>
      </section>
      <section className="collection-section experience-wrap" id="gallery">
        <div className="collection-heading">
          <h2>StayRehat, dari dekat.</h2>
          <p>Lihat suasana StayRehat dalam galeri gambar kami.</p>
        </div>
        <ExperienceGallery />
      </section>
      <section className="experience-invite">
        <img
          src="/images/38.webp"
          alt="Suasana taman StayRehat pada waktu malam"
          loading="lazy"
        />
        <div>
          <h2>
            Giliran anda
            <br />
            untuk berehat.
          </h2>
          <p>Bawa keluarga. Cipta kenangan bersama di StayRehat.</p>
          <Link href="/#booking" className="button">
            Rancang penginapan <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
