"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  List,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { motionMs } from "../lib/motion/timing";
export const links = [
  ["Home", "/"],
  ["Tentang Kami", "/tentang-stayrehat/"],
  ["Rooms & Rates", "/rooms-rates/"],
  ["Facilities & Gallery", "/facilities/"],
  ["Location & Map", "/location-map/"],
  ["Contact & Booking", "/contact/"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const menuTrigger = useRef<HTMLButtonElement>(null);
  function closeMenu() {
    setOpen(false);
    setClosing(true);
    clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(
      () => setClosing(false),
      motionMs("--dropdown-close-dur", 150),
    );
  }
  function toggleMenu() {
    if (open) {
      closeMenu();
    } else {
      clearTimeout(menuTimer.current);
      setClosing(false);
      setOpen(true);
    }
  }
  useEffect(() => () => clearTimeout(menuTimer.current), []);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(value);
    document.documentElement.dataset.theme = value ? "dark" : "light";
  }, []);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (open && e.key === "Escape") {
          e.preventDefault();
          closeMenu();
          menuTrigger.current?.focus();
        }
      }}
    >
      <Link href="/" aria-label="StayRehat Home" className="brand">
        <img
          src="/images/00.webp"
          alt="StayRehat Boutique Staycation"
          width="124"
          height="62"
        />
      </Link>
      <nav
        id="main-navigation"
        aria-label="Main"
        data-origin="top-right"
        className={`nav t-dropdown ${open ? "open is-open" : closing ? "is-closing" : ""}`}
      >
        {links.map(([name, url]) => (
          <Link
            key={url}
            href={url}
            onClick={closeMenu}
            aria-current={path === url ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
      </nav>
      <div className="header-tools">
        <button
          className="icon-button theme-button"
          aria-label={dark ? "Gunakan tema cerah" : "Gunakan tema gelap"}
          onClick={() => {
            setDark(!dark);
            document.documentElement.dataset.theme = dark ? "light" : "dark";
          }}
        >
          <span
            className="t-icon-swap"
            data-state={dark ? "b" : "a"}
            aria-hidden="true"
          >
            <span className="t-icon" data-icon="a">
              <Moon size={19} />
            </span>
            <span className="t-icon" data-icon="b">
              <Sun size={19} />
            </span>
          </span>
        </button>
        <a href="/#booking" className="header-book" onClick={closeMenu}>
          Tempah <ArrowUpRight size={16} />
        </a>
        <button
          className="icon-button menu-button"
          ref={menuTrigger}
          aria-controls="main-navigation"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={toggleMenu}
        >
          <span
            className="t-icon-swap"
            data-state={open ? "b" : "a"}
            aria-hidden="true"
          >
            <span className="t-icon" data-icon="a">
              <List size={25} />
            </span>
            <span className="t-icon" data-icon="b">
              <X size={25} />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <img
            className="footer-logo"
            src="/images/00.webp"
            alt="StayRehat Boutique Staycation"
            width="170"
            height="85"
          />
          <p>
            Tempat percutian keluarga.
            <br />
            Kenangan untuk selamanya.
          </p>
        </div>
        <div>
          <h3>Terokai StayRehat</h3>
          <div className="footer-links">
            {links.slice(1).map(([name, url]) => (
              <Link key={url} href={url}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3>Jumpa kami di Gombak</h3>
          <p>
            Lot 433, S1, Jalan Changkat Setia,
            <br />
            Kampung Changkat 68100, Selangor.
          </p>
          <a href="tel:+60179431669">+60 17-943 1669</a>
          <br />
          <a href="mailto:stayrehat@gmail.com">stayrehat@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StayRehat.</span>
        <span>Gombak, Selangor</span>
        <a href="https://wa.me/60179431669" target="_blank" rel="noreferrer">
          <WhatsappLogo size={18} /> Hubungi kami <ArrowUpRight size={16} />
        </a>
      </div>
    </footer>
  );
}
