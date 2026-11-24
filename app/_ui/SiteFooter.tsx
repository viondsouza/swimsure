import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo light />
        <nav className="footer-links" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/coming-next">Coming next</Link>
          <Link href="/#enquire-parent">Book a free day</Link>
        </nav>
        <p>
          Bengaluru · © {new Date().getFullYear()} SwimSure ·{" "}
          <a href="https://unsplash.com/photos/1AZzPJWhyMQ" target="_blank" rel="noopener noreferrer">
            Photos: Kevin Paes and others / Unsplash
          </a>
        </p>
      </div>
      <p className="wrap sources">
        Sources: academy price from Nisha Millet&apos;s Swimming Academy website (₹6,300 for 12 classes, Nov 2026).
        Court case reported by Deccan Herald (7 Aug 2024).
      </p>
    </footer>
  );
}
