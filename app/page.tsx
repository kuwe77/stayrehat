import Link from "next/link";
import {
  ArrowUpRight,
  SwimmingPool,
  Leaf,
  UsersThree,
  MapPin,
  Fire,
  Car,
} from "@phosphor-icons/react/dist/ssr";
import Booking from "../components/Booking";
import Reveal from "../components/Reveal";
import { RoomCards } from "../components/Rooms";
import Gallery from "../components/Gallery";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet="/images/hero-pool-enhanced-mobile.webp"
          />
          <img
            className="hero-image"
            src="/images/hero-pool-enhanced.webp"
            width={1536}
            height={1024}
            alt="Kolam renang dan homestay kontena StayRehat di Gombak"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <MapPin size={16} /> GOMBAK, SELANGOR
            </span>
            <h1>
              Rehat yang
              <br />
              sebenar.
            </h1>
            <p>
              Kerana setiap keluarga layak menikmati
              <br className="desktop-break" /> masa berkualiti bersama.
            </p>
            <Link className="hero-link" href="/tentang-stayrehat/">
              Kenali StayRehat <ArrowUpRight size={21} />
            </Link>
          </div>
          <Booking />
        </div>
      </section>
      <div className="highlights">
        <span>
          <SwimmingPool size={24} weight="light" /> Kolam renang
        </span>
        <span>
          <Leaf size={24} weight="light" /> Dekat dengan alam
        </span>
        <span>
          <UsersThree size={24} weight="light" /> Mesra keluarga
        </span>
        <span>
          <MapPin size={24} weight="light" /> 15 minit ke KLCC
        </span>
      </div>
      <section className="intro section">
        <Reveal className="intro-copy">
          <span className="small-label">SELAMAT DATANG KE STAYREHAT</span>
          <h2>
            Ruang untuk bersama.
            <br />
            Masa untuk keluarga.
          </h2>
          <p>
            Di StayRehat, kami percaya bahawa percutian yang bermakna bukan
            sekadar tentang tempat percutian, tetapi tentang siapa yang bercuti
            bersama anda.
          </p>
          <Link className="text-link" href="/tentang-stayrehat/">
            Tentang Kami <ArrowUpRight size={21} />
          </Link>
        </Reveal>
        <Reveal className="intro-visual">
          <img
            src="/images/31.webp"
            alt="Suasana pagi di kolam renang StayRehat"
            loading="lazy"
          />
          <div className="image-note">
            <span>Selamat Pagi dari Stay Rehat, Gombak!</span>
            <span>Tempat Percutian Keluarga</span>
          </div>
        </Reveal>
      </section>
      <section className="section rooms-section">
        <Reveal>
          <div className="section-title">
            <div>
              <h2>Pilih ruang rehat anda.</h2>
              <p>
                8 bilik eksklusif yang selesa dan bersih, sesuai untuk pelbagai
                jenis penginapan.
              </p>
            </div>
            <Link className="text-link" href="/rooms-rates/">
              Rooms & Rates <ArrowUpRight size={21} />
            </Link>
          </div>
          <RoomCards />
          <div className="rooms-foot">
            <p>
              Penghawa dingin, bilik air peribadi, WiFi percuma dan kemudahan
              asas lain.
            </p>
            <span>
              Dari <strong>RM150</strong> / malam
            </span>
          </div>
        </Reveal>
      </section>
      <section className="facilities-home section">
        <Reveal className="facility-photo">
          <img
            src="/images/45.webp"
            alt="Kolam renang StayRehat pada waktu malam"
            loading="lazy"
          />
        </Reveal>
        <Reveal className="facility-copy">
          <h2>
            Hari yang santai.
            <br />
            Kenangan yang kekal.
          </h2>
          <p>
            Kemudahan untuk menikmati masa bersama, daripada kolam renang hingga
            ke ruang santai luar.
          </p>
          <div className="facility-list">
            <span>
              <SwimmingPool size={23} /> Kolam renang
            </span>
            <span>
              <Fire size={23} /> Kawasan BBQ
            </span>
            <span>
              <Car size={23} /> Tempat letak kereta percuma
            </span>
            <span>
              <Leaf size={23} /> Ruang santai luar & taman mini
            </span>
          </div>
          <Link className="text-link" href="/facilities/">
            Kemudahan & galeri <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </section>
      <section className="gathering section">
        <Reveal>
          <span className="small-label">KENANGAN BERSAMA</span>
          <h2>Raikan orang tersayang.</h2>
          <p>
            Kami juga menyediakan tempat khas untuk acara kecil, seperti
            birthday party, majlis pertunangan dan family day.
          </p>
          <div className="event-images">
            <img
              src="/images/44.webp"
              alt="Ruang majlis pertunangan di StayRehat"
              loading="lazy"
            />
            <img
              src="/images/43.webp"
              alt="Tempat khas untuk majlis keluarga"
              loading="lazy"
            />
          </div>
          <Link className="text-link" href="/rooms-rates/#rates">
            Lihat pakej majlis <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </section>
      <section className="section home-gallery">
        <Reveal>
          <div className="section-title">
            <h2>Sekilas StayRehat.</h2>
            <Link className="text-link" href="/facilities/#gallery">
              Gallery <ArrowUpRight size={21} />
            </Link>
          </div>
          <Gallery
            images={["/images/32.webp", "/images/38.webp", "/images/37.webp"]}
            label="Suasana StayRehat"
          />
        </Reveal>
      </section>
      <section className="home-location section">
        <Reveal>
          <MapPin size={30} weight="light" />
          <h2>
            Dekat di kota.
            <br />
            Tenang bersama.
          </h2>
          <p>Kami terletak 10 minit dari Batu Caves, 15 minit ke KLCC.</p>
          <p>
            Lot 433, S1, Jalan Changkat Setia,
            <br />
            Kampung Changkat 68100, Selangor.
          </p>
          <Link className="text-link" href="/location-map/">
            Location & Map <ArrowUpRight size={20} />
          </Link>
        </Reveal>
        <Reveal className="location-photo">
          <img
            src="/images/42.webp"
            alt="Suasana pintu masuk StayRehat"
            loading="lazy"
          />
        </Reveal>
      </section>
      <section className="journal section">
        <div>
          <span className="small-label">14 JUN 2025</span>
          <h2>
            Selamat Datang
            <br />
            ke StayRehat
          </h2>
        </div>
        <div>
          <p>
            Bila pagi kena dengan udara sejuk, tilam empuk & cahaya masuk
            perlahan…
          </p>
          <Link className="text-link" href="/2025/06/14/hello-world/">
            Baca selanjutnya <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
