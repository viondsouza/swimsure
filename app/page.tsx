import EnquiryForm from "./_ui/EnquiryForm";
import Logo from "./_ui/Logo";
import SocietyCalculator from "./_ui/SocietyCalculator";

// Free photo by Kevin Paes on Unsplash (Unsplash License): unsplash.com/photos/1AZzPJWhyMQ
const PHOTO = "https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?auto=format&fit=crop&q=80";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const waLink = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi SwimSure! I'd like to know about swimming lessons in my society.")}`
  : null;

const Check = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden className="check">
    <circle cx="10" cy="10" r="10" />
    <path d="M5.5 10.5l3 3 6-7" />
  </svg>
);

const FAQ: [string, string][] = [
  [
    "My child can't swim at all. Is that okay?",
    "Yes. Most children start as beginners. The coach groups them by level, from floating and breathing up to full strokes.",
  ],
  [
    "Our society doesn't have SwimSure yet. Can I still sign up?",
    "Yes. Tell us your society's name and we'll speak to your committee. A few parents asking usually gets a quick yes.",
  ],
  [
    "How do I pay?",
    "₹3,000 a month for 12 classes, prepaid by UPI. The first demo class is free.",
  ],
  [
    "What does the society pay?",
    "Nothing. We pay the coach, the lifeguard and the insurance, and the society receives 15% of the fees.",
  ],
];

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" aria-label="SwimSure home" className="logo-link">
            <Logo />
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#how">How it works</a>
            <a href="#price">Price</a>
            <a href="#societies">Societies</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#enquire-parent" className="btn btn-primary btn-sm">
            Book free demo
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="pill">Now enrolling in Bengaluru</p>
              <h1>
                Swimming lessons in your <span className="accent">society&apos;s pool.</span>
              </h1>
              <p className="lede">
                A certified coach and a lifeguard at every class. Small evening batches. Your child learns to swim
                without leaving the gate.
              </p>
              <div className="hero-ctas">
                <a href="#enquire-parent" className="btn btn-primary">
                  Book a free demo class
                </a>
                <a href="#enquire-society" className="btn btn-outline">
                  I&apos;m on a society committee
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${PHOTO}&w=1200`}
                srcSet={`${PHOTO}&w=640 640w, ${PHOTO}&w=960 960w, ${PHOTO}&w=1400 1400w`}
                sizes="(max-width: 900px) 100vw, 560px"
                alt="Children practising with kickboards in a pool, with an instructor holding a rescue float"
                fetchPriority="high"
              />
              <figcaption className="badge">
                <Check />
                Coach + lifeguard, every class
              </figcaption>
            </figure>
          </div>

          <div className="wrap">
            <ul className="facts" aria-label="Key facts">
              <li>
                <b>Ages 5–12</b>
                <span>beginners welcome</span>
              </li>
              <li>
                <b>Max 10</b>
                <span>children a batch</span>
              </li>
              <li>
                <b>5–8 pm</b>
                <span>evening batches</span>
              </li>
              <li>
                <b>₹250</b>
                <span>a class</span>
              </li>
            </ul>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="wrap">
            <h2>How it works</h2>
            <ol className="steps">
              <li>
                <span className="step-n">1</span>
                <h3>Your society says yes</h3>
                <p>The committee lets us run lessons in its pool.</p>
              </li>
              <li>
                <span className="step-n">2</span>
                <h3>We bring the team</h3>
                <p>A certified coach and a lifeguard at every class, fully insured.</p>
              </li>
              <li>
                <span className="step-n">3</span>
                <h3>Your child swims</h3>
                <p>Walk downstairs, drop them off. Updates arrive on WhatsApp.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* PRICE */}
        <section className="section alt" id="price">
          <div className="wrap price-grid">
            <div>
              <h2>One simple price</h2>
              <p className="sub">About half what top academies charge, with no driving.</p>
              <ul className="ticks">
                <li>
                  <Check /> 12 classes a month, three evenings a week
                </li>
                <li>
                  <Check /> Grouped by level, up to 10 children
                </li>
                <li>
                  <Check /> Free demo class before you pay
                </li>
              </ul>
            </div>
            <div className="price-card">
              <p className="price-big">
                ₹3,000<span> / month</span>
              </p>
              <p className="price-sub">12 classes · ₹250 a class · pay by UPI</p>
              <a href="#enquire-parent" className="btn btn-primary btn-block">
                Book a free demo class
              </a>
            </div>
          </div>
        </section>

        {/* SOCIETIES */}
        <section className="section dark" id="societies">
          <div className="wrap split">
            <div>
              <h2>For society committees</h2>
              <p className="sub">
                A trained lifeguard on deck, zero cost to the society, and 15% of all fees paid back to the society
                fund.
              </p>
              <a href="#enquire-society" className="btn btn-primary">
                Bring SwimSure to our pool
              </a>
            </div>
            <SocietyCalculator />
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap narrow">
            <h2>Questions</h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="section alt enquire" id="enquire">
          <span id="enquire-parent" className="anchor" />
          <span id="enquire-society" className="anchor" />
          <span id="enquire-coach" className="anchor" />
          <div className="wrap split top">
            <div>
              <h2>Get started</h2>
              <p className="sub">
                Fill this in and you&apos;ll get a confirmation email straight away. We call back within one working
                day.
              </p>
              <p className="founder">
                Run by <b>Vion Dsouza</b>, a state-level competitive swimmer for 12 years.
              </p>
            </div>
            <div className="form-card">
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <Logo light />
          <p>
            Bengaluru · © {new Date().getFullYear()} SwimSure ·{" "}
            <a href="https://unsplash.com/photos/1AZzPJWhyMQ" target="_blank" rel="noopener noreferrer">
              Photo: Kevin Paes / Unsplash
            </a>
          </p>
        </div>
      </footer>

      {/* Phones: booking button always within reach */}
      <div className="mobile-cta">
        <a href="#enquire-parent" className="btn btn-primary btn-block">
          Book a free demo class
        </a>
      </div>

      {waLink && (
        <a href={waLink} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
            />
          </svg>
        </a>
      )}
    </>
  );
}
