import Link from "next/link";
import Logo from "./Logo";

/** Top bar shared by every page. Section links point at the home page so they work from anywhere. */
export default function SiteHeader({ current }: { current?: "next" }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" aria-label="SwimSure home" className="logo-link">
          <Logo />
        </Link>
        <nav className="nav-links" aria-label="Sections">
          <Link href="/#how">How it works</Link>
          <Link href="/#safety">Safety</Link>
          <Link href="/#price">Price</Link>
          <Link href="/#societies">Societies</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/coming-next" aria-current={current === "next" ? "page" : undefined}>
            Coming next
          </Link>
        </nav>
        {/* Phones hide the section links, so keep this one page link visible. */}
        <Link href="/coming-next" className="nav-mobile-link" aria-current={current === "next" ? "page" : undefined}>
          Coming next
        </Link>
        <Link href="/#enquire-parent" className="btn btn-primary btn-sm">
          Book free day
        </Link>
      </div>
    </header>
  );
}
