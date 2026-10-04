"use client";
import { useState, useRef } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ms } from "date-fns/locale";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CalendarBlank,
  X,
  ArrowLeft,
  Check,
} from "@phosphor-icons/react";
import useAnimatedDialog from "./useAnimatedDialog";
import BookingSteps from "./BookingSteps";
import {
  AnimatedText,
  AnimatedNumber,
  AnimatedCheckbox,
  SuccessCheck,
} from "./MotionBits";
import { replay } from "../lib/motion/timing";
import { estimateStay, rooms } from "../lib/booking.mjs";
const money = (v: number) =>
  new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(v);
export default function Booking() {
  const [range, setRange] = useState<DateRange>();
  const [kind, setKind] = useState("superior");
  const [holiday, setHoliday] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState("summary");
  const modal = useAnimatedDialog();
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const whole = kind === "whole";
  const estimate = estimateStay(range?.from, range?.to, whole, holiday);
  const selected = rooms.find((r) => r.id === kind);
  function review(e: React.FormEvent) {
    e.preventDefault();
    if (estimate.error) {
      setError(estimate.error);
      replay(
        formRef.current?.querySelector(".date-summary") || null,
        "is-shaking",
      );
      return;
    }
    setError("");
    setStage("summary");
    modal.open();
  }
  return (
    <>
      <form
        ref={formRef}
        className={`booking t-input-wrap ${error ? "is-error" : ""}`}
        id="booking"
        onSubmit={review}
      >
        <div className="booking-title">
          <div>
            <span className="small-label">PERCUTIAN ANDA BERMULA DI SINI</span>
            <h2>Jom, rehat sekejap.</h2>
          </div>
          <CalendarBlank size={26} weight="light" />
        </div>
        <label className="select-label" htmlFor="stay-type">
          Pilihan penginapan
        </label>
        <select
          id="stay-type"
          value={kind}
          onChange={(e) => {
            setKind(e.target.value);
            setError("");
          }}
        >
          {rooms.map((r) => (
            <option value={r.id} key={r.id}>
              {r.name} · {r.bed}
            </option>
          ))}
          <option value="whole">Seluruh StayRehat · 8 unit</option>
        </select>
        <div
          className={`date-summary t-input ${error ? "is-error" : ""}`}
          onAnimationEnd={(e) => e.currentTarget.classList.remove("is-shaking")}
        >
          <div>
            <span>CHECK-IN</span>
            <strong>
              <AnimatedText
                value={
                  range?.from
                    ? format(range.from, "dd MMM yyyy", { locale: ms })
                    : "Pilih tarikh"
                }
              />
            </strong>
          </div>
          <span className="date-arrow">→</span>
          <div>
            <span>CHECK-OUT</span>
            <strong>
              <AnimatedText
                value={
                  range?.to
                    ? format(range.to, "dd MMM yyyy", { locale: ms })
                    : "Pilih tarikh"
                }
              />
            </strong>
          </div>
        </div>
        <DayPicker
          animate
          mode="range"
          min={1}
          selected={range}
          onSelect={(v) => {
            setRange(v);
            setError("");
          }}
          disabled={{ before: today }}
          startMonth={today}
          locale={ms}
          showOutsideDays={false}
          weekStartsOn={1}
          labels={{
            labelPrevious: () => "Bulan sebelumnya",
            labelNext: () => "Bulan seterusnya",
          }}
        />
        <AnimatedCheckbox checked={holiday} onChange={setHoliday} />
        <div className="booking-status" aria-live="polite">
          {error ? (
            <p className="error t-error-msg">
              {error}{" "}
              {estimate.hasSaturday && !whole && (
                <button
                  type="button"
                  className="text-button"
                  onClick={() => {
                    setKind("whole");
                    setError("");
                  }}
                >
                  Pilih seluruh StayRehat
                </button>
              )}
            </p>
          ) : range?.from && !range.to ? (
            <span>Pilih tarikh check-out pada kalendar.</span>
          ) : estimate.total ? (
            <span>
              {estimate.nights} malam{" "}
              <strong>
                <AnimatedNumber value={money(estimate.total)} />
              </strong>{" "}
              anggaran
            </span>
          ) : (
            <span>
              Bilik dari <strong>RM150</strong> / malam
            </span>
          )}
        </div>
        <button className="button booking-submit" type="submit">
          Lihat ringkasan <ArrowUpRight size={20} />
        </button>
        <p className="demo-note">
          Pratonton tempahan. Ketersediaan belum disahkan.
        </p>
      </form>
      <dialog
        ref={modal.ref}
        className="booking-dialog t-modal"
        aria-label="Pratonton tempahan"
        onCancel={modal.onCancel}
        onClick={(e) => {
          if (e.target === modal.ref.current) modal.close();
        }}
      >
        <button
          className="dialog-close icon-button"
          onClick={() => modal.close()}
          aria-label="Tutup ringkasan"
        >
          <X size={24} />
        </button>
        <BookingSteps
          active={stage === "summary" ? 1 : stage === "details" ? 2 : 3}
        >
          {[
            <div key="summary">
              <span className="small-label">RANCANG PERCUTIAN ANDA</span>
              <h2>Ringkasan penginapan</h2>
              <img
                className="summary-image"
                src={whole ? "/images/01.webp" : selected?.image}
                alt={whole ? "Seluruh StayRehat" : selected?.name}
              />
              <h3>{whole ? "Seluruh StayRehat (8 unit)" : selected?.name}</h3>
              <p>
                {range?.from &&
                  format(range.from, "dd MMM yyyy", { locale: ms })}{" "}
                → {range?.to && format(range.to, "dd MMM yyyy", { locale: ms })}
              </p>
              <div className="summary-line">
                <span>
                  {estimate.nights} malam {holiday ? "(kadar cuti)" : ""}
                </span>
                <strong>{money(estimate.total || 0)}</strong>
              </div>
              <div className="summary-line">
                <span>Deposit 50%</span>
                <strong>{money(estimate.deposit || 0)}</strong>
              </div>
              <p className="fine-print">
                Anggaran berdasarkan kadar yang diterbitkan. Tarikh cuti, harga
                akhir dan ketersediaan perlu disahkan oleh pihak pengurusan.
                Tiada bayaran dikenakan atau bilik ditempah melalui pratonton
                ini.
              </p>
              <button className="button" onClick={() => setStage("details")}>
                Teruskan ke maklumat tetamu <ArrowUpRight size={18} />
              </button>
              <button
                className="text-button back-button"
                onClick={() => modal.close()}
              >
                Ubah pilihan
              </button>
            </div>,
            <div key="details">
              <button
                className="text-button"
                onClick={() => setStage("summary")}
              >
                <ArrowLeft /> Ringkasan
              </button>
              <h2>Maklumat tetamu</h2>
              <p>Pratonton sahaja. Maklumat tidak dihantar atau disimpan.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStage("done");
                }}
                className="guest-form"
                onInvalid={(e) => replay(e.target as HTMLElement, "is-shaking")}
              >
                <label>
                  Nama penuh
                  <input
                    className="t-input"
                    required
                    name="guestName"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email
                  <input
                    className="t-input"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </label>
                <label>
                  Nombor telefon
                  <input
                    className="t-input"
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  Bilangan tetamu
                  <input
                    className="t-input"
                    required
                    type="number"
                    name="guests"
                    min="1"
                    defaultValue="2"
                  />
                </label>
                <label>
                  Permintaan khas (pilihan)
                  <textarea name="notes" rows={3} />
                </label>
                <button className="button">
                  Pratonton selesai <Check size={18} />
                </button>
              </form>
            </div>,
            <div key="done" className="demo-complete">
              {stage === "done" && <SuccessCheck />}
              <h2>Rancangan anda sedia.</h2>
              <p>
                Ini ialah pratonton frontend sahaja. Tiada tempahan dibuat dan
                tiada maklumat dihantar.
              </p>
              <p>
                Untuk tempahan sebenar, hubungi StayRehat di{" "}
                <a href="tel:+60179431669">+60 17-943 1669</a>.
              </p>
              <button className="button" onClick={() => modal.close()}>
                Kembali ke StayRehat
              </button>
            </div>,
          ]}
        </BookingSteps>
      </dialog>
    </>
  );
}
