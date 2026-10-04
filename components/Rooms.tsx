import Link from "next/link";
import {
  ArrowUpRight,
  Bed,
  Wind,
  WifiHigh,
  Shower,
} from "@phosphor-icons/react/dist/ssr";
import { rooms } from "../lib/booking.mjs";
import Gallery from "./Gallery";
export function RoomCards() {
  return (
    <div className="room-grid">
      {rooms.map((r) => (
        <Link className="room-card" key={r.id} href={"/rooms-rates/#" + r.id}>
          <div className="room-photo">
            <img
              src={r.image}
              alt={`Bilik ${r.name} di StayRehat`}
              loading="lazy"
            />
          </div>
          <div className="room-heading">
            <h3>{r.name}</h3>
            <ArrowUpRight size={25} weight="light" />
          </div>
          <div className="room-meta">
            <span>
              <Bed size={17} /> {r.bed}
            </span>
            <span>{r.floor}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function Rates() {
  return (
    <section className="rates-section">
      <h2>Harga & pakej</h2>
      <p>
        Deposit sewaan 50% untuk booking (Sila lihat polisi pembatalan booking).
      </p>
      <div className="rates-grid">
        <div>
          <h3>Penginapan bilik</h3>
          <dl>
            <div>
              <dt>Isnin ke Khamis</dt>
              <dd>RM150</dd>
            </div>
            <div>
              <dt>Jumaat / Ahad</dt>
              <dd>RM200</dd>
            </div>
            <div>
              <dt>Cuti Am & Cuti Sekolah</dt>
              <dd>RM250</dd>
            </div>
          </dl>
          <p className="fine-print">
            Sabtu: RM2000 (hanya pakej seluruh Stayrehat).
          </p>
        </div>
        <div>
          <h3>Seluruh homestay kontena</h3>
          <p>8 unit</p>
          <dl>
            <div>
              <dt>Isnin ke Khamis</dt>
              <dd>RM1200</dd>
            </div>
            <div>
              <dt>Jumaat / Ahad</dt>
              <dd>RM1600</dd>
            </div>
            <div>
              <dt>Cuti am & Cuti sekolah</dt>
              <dd>RM2000</dd>
            </div>
            <div>
              <dt>Sabtu</dt>
              <dd>RM2000</dd>
            </div>
          </dl>
        </div>
        <div>
          <h3>Majlis & perjumpaan</h3>
          <dl>
            <div>
              <dt>10 - 50 pax</dt>
              <dd>RM600</dd>
            </div>
            <div>
              <dt>50 - 250 pax</dt>
              <dd>RM1200</dd>
            </div>
          </dl>
          <p>Hubungi kami untuk promosi terkini atau tempahan berkumpulan.</p>
          <Link className="text-link" href="/contact/">
            Contact & Booking <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <p className="fine-print">
        *Harga pakej boleh berubah bila-bila masa oleh pihak pengurusan.
      </p>
    </section>
  );
}
export function RoomDetails() {
  return (
    <>
      {rooms.map((r) => (
        <section className="room-detail" key={r.id} id={r.id}>
          <div>
            <span className="small-label">
              {r.floor} / {r.units} bilik
            </span>
            <h2>{r.name}</h2>
            <p>{r.bed}</p>
            <div className="amenity-inline">
              <span>
                <Wind size={20} /> Penghawa dingin
              </span>
              <span>
                <Shower size={20} /> Bilik air peribadi
              </span>
              <span>
                <WifiHigh size={20} /> WiFi percuma
              </span>
            </div>
          </div>
          <Gallery
            images={r.photos.map(
              (n: number) => `/images/${String(n).padStart(2, "0")}.webp`,
            )}
            label={`Bilik ${r.name}`}
          />
        </section>
      ))}
    </>
  );
}
