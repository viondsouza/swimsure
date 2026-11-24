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

const Cross = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden className="cross">
    <circle cx="10" cy="10" r="10" />
    <path d="M7 7l6 6M13 7l-6 6" />
  </svg>
);

// Comparison rows: [label, SwimSure, top academy, freelance coach]
type Cell = string | boolean;
const COMPARE: [string, Cell, Cell, Cell][] = [
  ["Where", "Your building", "Across the city", "Your building"],
  ["Price a class", "₹450", "₹525", "Varies"],
  ["Certified coach", true, true, "Sometimes"],
  ["Lifeguard on deck", true, "Venue staff", false],
  ["Children a batch", "Max 10", "Varies", "Varies"],
  ["Insured", true, true, false],
];

const SAFETY: [string, string][] = [
  ["A coach and a lifeguard", "Two adults at every batch, every time. No batch ever runs short-staffed."],
  ["10 children, no more", "Small groups sorted by level, so the coach can see every child."],
  ["Insured, in writing", "Every pool is insured and covered by a written agreement with the society."],
];

const FAQ: [string, string][] = [
  [
    "My child can't swim at all. Is that okay?",
    "Yes. Most children start as beginners. The coach groups them by level, from floating and breathing up to full strokes.",
  ],
  [
    "What is the free water-safety day?",
    "A free session at your society's pool for every child, before anyone pays. Your child meets the coach and the lifeguard, and you see how a class runs.",
  ],
  [
    "How much is it, and how do I pay?",
    "₹5,400 a month for 12 classes (₹450 a class), prepaid by UPI. Fees are shown before GST.",
  ],
  [
    "When are the classes?",
    "Monday, Wednesday and Friday evenings, in three batches between 5 and 8 pm. Your child joins one batch.",
  ],
  [
    "Our society doesn't have SwimSure yet. Can I still sign up?",
    "Yes. Tell us your society's name and we'll speak to your committee. A few parents asking usually gets a quick yes.",
  ],
  [
    "When do you start?",
    "Our first society pilot opens in early 2027. Enquire now and you'll hear first when a pool near you opens.",
  ],
];

const BATCHES = ["5–6 pm", "6–7 pm", "7–8 pm"];

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
            <a href="#safety">Safety</a>
            <a href="#price">Price</a>
            <a href="#societies">Societies</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#enquire-parent" className="btn btn-primary btn-sm">
            Book free day
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="pill">
                <span className="dot" aria-hidden /> Pilot opens early 2027 · Bengaluru
              </p>
              <h1>
                The pool is downstairs. <span className="accent">Now the lessons are too.</span>
              </h1>
              <p className="lede">
                Certified swim classes for children aged 5–12 inside your apartment&apos;s own pool, with a coach and a
                lifeguard at every batch.
              </p>
              <div className="hero-ctas">
                <a href="#enquire-parent" className="btn btn-primary">
                  Book a free water-safety day
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
                Coach + lifeguard, every batch
              </figcaption>
            </figure>
          </div>

          <div className="wrap">
            <ul className="facts" aria-label="Key facts">
              <li>
                <b>0 km</b>
                <span>the class is downstairs</span>
              </li>
              <li>
                <b>2 adults</b>
                <span>at every batch</span>
              </li>
              <li>
                <b>Max 10</b>
                <span>children a batch</span>
              </li>
              <li>
                <b>₹450</b>
                <span>a class</span>
              </li>
            </ul>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="wrap">
            <p className="eyebrow">How it works</p>
            <h2>The society gives the pool. We run the swim school.</h2>
            <ol className="steps">
              <li>
                <span className="step-n">1</span>
                <h3>Your society signs</h3>
                <p>The committee gives SwimSure the coaching rights and earns 15% of the fees.</p>
              </li>
              <li>
                <span className="step-n">2</span>
                <h3>We staff the pool</h3>
                <p>A certified coach and a lifeguard at every batch, fully insured.</p>
              </li>
              <li>
                <span className="step-n">3</span>
                <h3>Your child swims</h3>
                <p>Walk downstairs and drop them off. Pay by UPI, get updates on WhatsApp.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* SAFETY + COMPARISON */}
        <section className="section alt" id="safety">
          <div className="wrap">
            <p className="eyebrow">Safety first</p>
            <h2>Safe lessons shouldn&apos;t be across the city.</h2>
            <div className="safety">
              {SAFETY.map(([t, d]) => (
                <div key={t}>
                  <Check />
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>

            <div className="compare-wrap">
              <table className="compare">
                <caption className="sr-only">How SwimSure compares</caption>
                <thead>
                  <tr>
                    <td />
                    <th scope="col" className="us">
                      SwimSure
                    </th>
                    <th scope="col">Top academy</th>
                    <th scope="col">Freelance coach</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([label, ...cells]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((c, i) => (
                        <td key={i} className={i === 0 ? "us" : undefined}>
                          {c === true ? (
                            <>
                              <Check />
                              <span className="sr-only">Yes</span>
                            </>
                          ) : c === false ? (
                            <>
                              <Cross />
                              <span className="sr-only">No</span>
                            </>
                          ) : (
                            c
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className="section" id="price">
          <div className="wrap price-grid">
            <div>
              <p className="eyebrow">Price</p>
              <h2>One simple monthly plan</h2>
              <p className="sub">Less than the ₹525 a class a top academy charges, and no driving.</p>
              <div className="timetable">
                <p className="tt-title">Evening batches</p>
                <div className="tt-days" aria-label="Days">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div className="tt-batches" aria-label="Times">
                  {BATCHES.map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>
                <p className="tt-note">Your child joins one batch, three evenings a week.</p>
              </div>
            </div>
            <div className="price-card">
              <p className="price-big">
                ₹5,400<span> / month</span>
              </p>
              <p className="price-sub">12 classes · ₹450 a class · pay by UPI</p>
              <ul className="ticks">
                <li>
                  <Check /> 12 classes, grouped by level
                </li>
                <li>
                  <Check /> Coach + lifeguard at every class
                </li>
                <li>
                  <Check /> Free water-safety day first
                </li>
              </ul>
              <a href="#enquire-parent" className="btn btn-primary btn-block">
                Book a free water-safety day
              </a>
              <p className="fine">Fees shown before GST.</p>
            </div>
          </div>
        </section>

        {/* SOCIETIES */}
        <section className="section dark" id="societies">
          <div className="wrap split">
            <div>
              <p className="eyebrow">For society committees</p>
              <h2>Your pool, made safe and earning.</h2>
              <ul className="ticks">
                <li>
                  <Check /> A trained lifeguard at every batch
                </li>
                <li>
                  <Check /> 15% of all fees to the society fund
                </li>
                <li>
                  <Check /> Zero cost, insured, 1-year written agreement
                </li>
              </ul>
              <blockquote className="callout">
                <b>Why it matters:</b> in Aug 2024 the Karnataka High Court sent a Bengaluru society&apos;s office
                bearers to trial after a 9-year-old drowned in their unguarded pool.
              </blockquote>
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
            <p className="eyebrow">FAQ</p>
            <h2>Questions parents ask</h2>
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
              <p className="eyebrow">Get started</p>
              <h2>Save your child&apos;s spot</h2>
              <p className="sub">
                Fill this in and you&apos;ll get a confirmation email straight away. We call back within one working
                day.
              </p>
              <figure className="founder">
                <blockquote>&ldquo;12 years in the water: I know who to hire, and what safe looks like.&rdquo;</blockquote>
                <figcaption>
                  <span className="avatar" aria-hidden>
                    VD
                  </span>
                  <span>
                    <b>Vion Dsouza</b>, founder
                    <br />
                    State-level competitive swimmer for 12 years
                  </span>
                </figcaption>
              </figure>
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
        <p className="wrap sources">
          Sources: academy price from Nisha Millet&apos;s Swimming Academy website (₹6,300 for 12 classes, Nov 2026).
          Court case reported by Deccan Herald (7 Aug 2024).
        </p>
      </footer>

      {/* Phones: booking button always within reach */}
      <div className="mobile-cta">
        <a href="#enquire-parent" className="btn btn-primary btn-block">
          Book a free water-safety day
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
