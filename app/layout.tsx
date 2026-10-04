import type { Metadata } from "next";
import "./globals.css";
import "./motion/tokens.css";
import "./motion/recipes.css";
import "./motion/site-motion.css";
import MotionOrchestrator from "../components/MotionOrchestrator";
import localFont from "next/font/local";
const sans = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const serif = localFont({
  src: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
import { Header, Footer } from "../components/Site";
export const metadata: Metadata = {
  title: {
    default: "StayRehat | Tempat Percutian Keluarga",
    template: "%s | StayRehat",
  },
  description:
    "Homestay kontena mesra keluarga di Gombak, Selangor. 8 bilik, kolam renang, kawasan BBQ dan ruang untuk kenangan bersama.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ms"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a className="skip" href="#main">
          Langkau ke kandungan
        </a>
        <Header />
        <MotionOrchestrator />
        {children}
        <Footer />
      </body>
    </html>
  );
}
