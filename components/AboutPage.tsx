import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import copy from "../lib/about-content.json";
import AboutValues from "./AboutValues";
import "./about.css";
export default function AboutPage() {
  return (
    <main id="main" className="story-page">
      <section className="story-hero story-wrap">
        <div className="story-hero-copy">
          <p className="story-eyebrow">TENTANG KAMI</p>
          <h1>
            Tempat berehat.
            <br />
            Ruang bersama.
          </h1>
          <p className="story-opening">{copy.quote}</p>
          <a className="text-link" href="#cerita">
            Cerita StayRehat <ArrowDownRight size={20} />
          </a>
        </div>
        <div className="story-collage">
          <figure className="story-gate">
            <img
              src="/images/42.webp"
              alt="Suasana pintu masuk StayRehat"
              width="768"
              height="1024"
              fetchPriority="high"
            />
            <figcaption>
              <MapPin size={14} /> Gombak, Selangor
            </figcaption>
          </figure>
          <figure className="story-pool">
            <img
              src="/images/31.webp"
              alt="Cahaya pagi di kolam renang StayRehat"
              width="960"
              height="540"
            />
            <figcaption>
              Suasana pintu masuk StayRehat & kolam renang.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="story-beginning story-wrap" id="cerita">
        <div className="story-beginning-title">
          <h2>
            Bermula dengan
            <br />
            satu impian.
          </h2>
          <p>{copy.intro}</p>
        </div>
        <div className="story-mission">
          <p>Impian kami</p>
          <blockquote>{copy.mission}</blockquote>
          <span>StayRehat</span>
        </div>
      </section>
      <section className="story-origins">
        <div className="story-origins-image">
          <img
            src="/images/38.webp"
            alt="Ruang santai StayRehat dengan kehijauan dan lampu taman pada waktu malam"
            width="1000"
            height="750"
            loading="lazy"
          />
        </div>
        <div className="story-origins-copy">
          <h2>
            Rehat yang sebenar.
            <br />
            Bersama yang tersayang.
          </h2>
          <p>{copy.story[0]}</p>
          <p className="story-answer">{copy.story[1]}</p>
          <p>{copy.story[2]}</p>
          <Link className="text-link" href="/facilities/">
            Kenali ruang kami <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <AboutValues />
      <section className="story-welcome story-wrap">
        <div>
          <h2>
            Datang untuk berehat.
            <br />
            Pulang dengan kenangan.
          </h2>
          <p>{copy.welcome}</p>
        </div>
        <div className="story-wish">
          <p>{copy.wish}</p>
          <Link href="/#booking" className="button">
            Rancang percutian anda <ArrowUpRight size={20} />
          </Link>
          <p className="story-invitation">{copy.invitation}</p>
        </div>
      </section>
      <div className="story-closing-photo">
        <img
          src="/images/01.webp"
          alt="Kolam renang dengan pokok palma dan bilik kontena StayRehat"
          width="1248"
          height="832"
          loading="lazy"
        />
      </div>
    </main>
  );
}
