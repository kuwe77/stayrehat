import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <h1>Halaman tidak dijumpai.</h1>
      <p>Mari kembali merancang percutian anda.</p>
      <Link className="button" href="/">
        Kembali ke Home
      </Link>
    </main>
  );
}
