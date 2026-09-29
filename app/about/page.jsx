"use client";

// /about — Lunaire brand story page

import {
  CREAM,
  MAROON,
  INK,
  sans,
  serif,
  mono,
  SmoothScroll,
  SiteHeader,
  FooterSection,
  LogoMark,
} from "../../components/site";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: CREAM, ...sans }}>
      <SmoothScroll />
      <SiteHeader overlay={false} />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-32">
        <span
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ ...mono, color: MAROON }}
        >
          The House of Lunaire
        </span>
        <h1
          className="mt-6 uppercase text-4xl sm:text-5xl md:text-6xl"
          style={{ ...serif, color: INK, fontWeight: 500, lineHeight: 1 }}
        >
          Cast in Shadow,
          <br />
          Finished by Hand
        </h1>
        <p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(17,17,16,0.7)" }}
        >
          Lunaire was founded on a single conviction: jewellery should be
          measured — in material, in meaning, in the way light moves across its
          surface. Every piece is hand-cast and hand-polished in small batches,
          using reclaimed metals and ethically sourced stones.
        </p>
      </section>

      {/* Video strip */}
      <section className="px-2 pb-2">
        <video
          src="/reveal-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-[60vh] w-full rounded-2xl object-cover"
          style={{ backgroundColor: "#1a1a1a" }}
        />
      </section>

      {/* Values */}
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-3 sm:py-28">
        {[
          {
            title: "Material Integrity",
            text: "We use only reclaimed 925 sterling silver and 18k gold vermeil — no plating shortcuts, no hollow cores.",
          },
          {
            title: "Small-Batch Craft",
            text: "Every Lunaire piece passes through seven hands before it reaches yours: from wax carver to final polisher.",
          },
          {
            title: "Measured Design",
            text: "Nothing more than it needs to be, nothing less than it should be. Each design is refined over months.",
          },
        ].map((v) => (
          <div key={v.title} className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(139,26,43,0.08)" }}>
              <LogoMark size={22} color={MAROON} />
            </div>
            <h3
              className="uppercase text-lg"
              style={{ ...serif, color: INK, fontWeight: 500 }}
            >
              {v.title}
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "rgba(17,17,16,0.65)" }}
            >
              {v.text}
            </p>
          </div>
        ))}
      </section>

      <FooterSection />
    </main>
  );
}
