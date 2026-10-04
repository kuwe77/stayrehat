import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import content from "../../lib/content.json";
import ExperiencePage from "../../components/ExperiencePage";
import AboutPage from "../../components/AboutPage";
import { Rates, RoomDetails } from "../../components/Rooms";
const titles: Record<string, string> = {
  "tentang-stayrehat": "Tentang Kami",
  "rooms-rates": "Rooms & Rates",
  facilities: "Facilities & Gallery",
  "location-map": "Location & Map",
  contact: "Contact & Booking",
  "2025/06/14/hello-world": "Selamat Datang ke StayRehat",
};
export function generateStaticParams() {
  return Object.keys(titles).map((s) => ({ slug: s.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: titles[slug.join("/")] || "StayRehat" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  if (!titles[key]) notFound();
  if (key === "facilities") return <ExperiencePage />;
  if (key === "tentang-stayrehat") return <AboutPage />;
  const data =
    content[
      (key === "2025/06/14/hello-world" ? "home" : key) as keyof typeof content
    ];
  return (
    <main id="main" className="subpage">
      <div className="page-heading">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{titles[key]}</span>
        <h1>
          {key === "rooms-rates"
            ? "Bilik & Harga"
            : key === "location-map"
              ? "Lokasi Kami"
              : key === "contact"
                ? "Hubungi Kami"
                : titles[key]}
        </h1>
      </div>
      {key === "rooms-rates" ? (
        <>
          <div className="page-intro">
            <p>
              Kami menyediakan 8 bilik eksklusif yang selesa dan bersih, sesuai
              untuk pelbagai jenis penginapan.
            </p>
            <p>
              Setiap bilik dilengkapi penghawa dingin, bilik air peribadi, WiFi
              percuma dan kemudahan asas lain.
            </p>
          </div>
          <div id="rates">
            <Rates />
          </div>
          <RoomDetails />
        </>
      ) : key === "location-map" ? (
        <>
          <div className="location-details">
            <div>
              <MapPin size={32} />
              <h2>StayRehat</h2>
              <p>
                Lot 433, S1, Jalan Changkat Setia,
                <br />
                Kampung Changkat 68100, Selangor.
              </p>
              <p>
                Padang Balang, Kuala Lumpur
                <br />
                (Waze: StayRehat Homestay)
              </p>
              <p>Kami terletak 10 minit dari Batu Caves, 15 minit ke KLCC.</p>
              <div className="map-links">
                <a
                  className="button"
                  href="https://www.google.com/maps/search/?api=1&query=StayRehat+Homestay+Gombak"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Maps <ArrowUpRight size={18} />
                </a>
                <a
                  className="text-link"
                  href="https://waze.com/ul?ll=3.224693,101.708565&navigate=yes"
                  target="_blank"
                  rel="noreferrer"
                >
                  Waze <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <img src="/images/42.webp" alt="Suasana pintu masuk StayRehat" />
          </div>
          <div className="maps">
            {data.iframes.map((src, i) => (
              <iframe
                key={src}
                title={
                  i === 0
                    ? "Lokasi StayRehat di Google Maps"
                    : "Lokasi StayRehat di Waze"
                }
                src={src}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ))}
          </div>
        </>
      ) : key === "contact" ? (
        <div className="contact-layout">
          <div>
            <h2>
              Jom rancang
              <br />
              percutian anda.
            </h2>
            <p>Hubungi kami untuk sebarang pertanyaan atau tempahan:</p>
            <a
              className="contact-link"
              href="https://wa.me/60179431669"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappLogo size={27} />
              <span>
                WhatsApp<strong>+60 17-943 1669</strong>
              </span>
              <ArrowUpRight size={24} />
            </a>
            <a className="contact-link" href="mailto:stayrehat@gmail.com">
              <EnvelopeSimple size={27} />
              <span>
                Email<strong>stayrehat@gmail.com</strong>
              </span>
              <ArrowUpRight size={24} />
            </a>
            <p>
              Alamat: Lot 433, S1, Jalan Changkat Setia, Kampung Changkat 68100,
              Selangor.
            </p>
            <p>Kami akan membalas dalam masa 24 jam. Terima kasih!</p>
            <Link className="button" href="/#booking">
              Rancang penginapan <ArrowUpRight size={20} />
            </Link>
          </div>
          <img src="/images/31.webp" alt="Kolam renang StayRehat" />
        </div>
      ) : (
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      )}
    </main>
  );
}
