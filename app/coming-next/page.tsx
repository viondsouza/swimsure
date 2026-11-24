import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../_ui/SiteHeader";
import SiteFooter from "../_ui/SiteFooter";
import { PIPELINE, type Stage } from "@/lib/pipeline";

export const metadata: Metadata = {
  title: "Coming next · SwimSure",
  description:
    "What SwimSure plans after children's classes: aqua yoga for women, calm water sessions, summer camps, adult lessons, seniors' aqua fitness and a junior lifeguard course.",
};

const STAGE_NOTE: Record<Stage, string> = {
  Next: "after the pilot, 2027",
  Planned: "2027–28",
  Exploring: "ideas we're testing",
};

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=${w}&h=${Math.round(w * 0.7)}`;

export default function ComingNext() {
  return (
    <>
      <SiteHeader current="next" />
      <main>
        <section className="section pipeline page-top" id="next">
          <div className="wrap">
            <div className="pipe-head">
              <div>
                <p className="eyebrow">Coming next</p>
                <h1>More ways to use the pool downstairs.</h1>
                <p className="sub">
                  Children&apos;s classes come first. Once they run well, these are in our pipeline. Tap the ones
                  you&apos;d join, and we&apos;ll start where the interest is.
                </p>
              </div>
              <ol className="stages" aria-label="Pipeline stages">
                {(Object.keys(STAGE_NOTE) as Stage[]).map((st) => (
                  <li key={st}>
                    <span className={`stage stage-${st.toLowerCase()}`}>{st}</span>
                    {STAGE_NOTE[st]}
                  </li>
                ))}
              </ol>
            </div>
            <ul className="pipe-grid">
              {PIPELINE.map((p) => (
                <li key={p.slug} className="pipe-card">
                  <div className="pipe-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img(p.photo, 640)}
                      srcSet={`${img(p.photo, 420)} 420w, ${img(p.photo, 640)} 640w, ${img(p.photo, 900)} 900w`}
                      sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 360px"
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={`stage stage-${p.stage.toLowerCase()}`}>{p.stage}</span>
                  </div>
                  <div className="pipe-body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <Link href={`/#interest-${p.slug}`} className="pipe-link">
                      I&apos;m interested <span aria-hidden>→</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pipe-cta">
          <div className="wrap">
            <div className="pipe-cta-inner">
              <div>
                <h2>Children&apos;s classes start first.</h2>
                <p className="sub">Book a free water-safety day for your child while we build what&apos;s next.</p>
              </div>
              <div className="pipe-cta-btns">
                <Link href="/#enquire-parent" className="btn btn-primary">
                  Book a free water-safety day
                </Link>
                <Link href="/" className="btn btn-ghost">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
