"use client";

// Homepage: pinned hero (video scrub) → featured teaser (4 products +
// VIEW ALL → /products) → expanding video reveal → marquee → footer.
// Videos: hero-video.mp4 and reveal-video.mp4 in /public.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  gsap,
  ScrollTrigger,
  CREAM,
  MAROON,
  INK,
  serif,
  sans,
  SmoothScroll,
  SiteHeader,
  SectionHeading,
  ProductCard,
  ProductModal,
  MarqueeSection,
  FooterSection,
  LogoMark,
} from "../components/site";
import { FEATURED } from "../data/products";

// ── Hero: pinned for +=400%, video scrubbed to scroll progress ────
function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const targetProgress = useRef(0);
  const currentTime = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        targetProgress.current = p;
        // Kinetic type: letters spread + drift up as you scrub
        if (headlineRef.current) {
          gsap.set(headlineRef.current, {
            letterSpacing: `${-0.01 + p * 0.12}em`,
            y: p * -60,
          });
        }
      },
    });

    let rafId;
    const loop = () => {
      if (video.duration) {
        const targetTime = targetProgress.current * video.duration;
        currentTime.current += (targetTime - currentTime.current) * 0.15;
        // Seeking guard — only seek once the previous frame is rendered
        if (
          !video.seeking &&
          Math.abs(video.currentTime - currentTime.current) > 0.01
        ) {
          video.currentTime = currentTime.current;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden supports-[height:100svh]:h-[100svh]"
      style={{ backgroundColor: CREAM, ...sans }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "75% 15%" }}
        />

        <SiteHeader overlay />

        {/* Bottom-left kinetic headline in brand red */}
        <main className="pointer-events-none absolute inset-0 z-10 flex flex-col items-start justify-end px-6 pb-6 text-left sm:px-10 sm:pb-8">
          <h1
            ref={headlineRef}
            className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              ...serif,
              color: MAROON,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
          >
            Measured
            <br />
            Purity
          </h1>

          <Link
            href="/products"
            className="pointer-events-auto mt-5 inline-flex w-fit items-center gap-4 rounded-full border py-1.5 pl-5 pr-1.5 transition-colors hover:bg-white sm:mt-6 cursor-pointer"
            style={{ borderColor: "rgba(17,17,16,0.4)", backgroundColor: CREAM }}
          >
            <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: INK }}>
              Discover
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none text-white"
              style={{ backgroundColor: INK }}
              aria-hidden="true"
            >
              +
            </span>
          </Link>
        </main>
      </div>
    </section>
  );
}

// ── Featured: pinned horizontal side-scroll (4 products + VIEW ALL) ──
// Desktop: GSAP pins the section, vertical scroll translates the row
// left until the last card is in view, then unpins. Mobile: native swipe.
function FeaturedTeaser({ onSelect }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Small delay to ensure DOM is fully laid out before GSAP measures
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (pointer: fine)", () => {
      const prevOverflow = track.style.overflowX;
      const prevSnap = track.style.scrollSnapType;
      track.style.overflowX = "visible";
      track.style.scrollSnapType = "none";

      const dist = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (dist() || 1),
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "x" });
        track.style.overflowX = prevOverflow;
        track.style.scrollSnapType = prevSnap;
      };
    });

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="flex w-full flex-col justify-center overflow-hidden py-2 sm:min-h-screen"
      style={{ backgroundColor: CREAM, ...sans }}
    >
      <SectionHeading>Featured</SectionHeading>
      <div
        ref={trackRef}
        className="flex w-full gap-2 overflow-x-auto px-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "thin" }}
      >
        {FEATURED.map((p, i) => (
          <div key={p.id} className="w-[280px] shrink-0 sm:w-[360px]" style={{ scrollSnapAlign: "start" }}>
            <ProductCard p={p} onSelect={onSelect} idx={i} />
          </div>
        ))}

        {/* Last card in the row → /products */}
        <Link
          href="/products"
          className="group relative flex w-[280px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white/60 px-4 py-8 text-center transition-colors hover:bg-white min-h-[340px] sm:w-[360px]"
          style={{ scrollSnapAlign: "start" }}
        >
          <span className="uppercase text-2xl" style={{ ...serif, color: INK, fontWeight: 500 }}>
            View All
          </span>
          <span
            className="mt-5 flex h-10 w-10 items-center justify-center rounded-full text-lg leading-none text-white transition-transform group-hover:scale-110"
            style={{ backgroundColor: INK }}
            aria-hidden="true"
          >
            +
          </span>
        </Link>
      </div>
    </section>
  );
}

// ── Expanding video reveal (pinned, clipPath + scrub) ─────────────
function VideoRevealSection() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const targetProgress = useRef(0);
  const currentTime = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const video = videoRef.current;
    if (!section || !panel || !video) return;

    // Use direct src instead of blob fetch — avoids loading entire 7MB file into memory
    video.src = "/reveal-video.mp4";
    video.load();

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const expand = Math.min(p / 0.3, 1);
        const inset = 50 * (1 - expand);
        gsap.set(panel, { clipPath: `inset(0% ${inset}% 0% ${inset}%)` });
        targetProgress.current = Math.max(0, (p - 0.3) / 0.7);
      },
    });

    let rafId;
    const loop = () => {
      if (video.duration) {
        const targetTime = targetProgress.current * video.duration;
        currentTime.current += (targetTime - currentTime.current) * 0.15;
        if (
          !video.seeking &&
          Math.abs(video.currentTime - currentTime.current) > 0.01
        ) {
          video.currentTime = currentTime.current;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden supports-[height:100svh]:h-[100svh]"
      style={{ backgroundColor: CREAM }}
    >
      <div ref={panelRef} className="absolute inset-0" style={{ clipPath: "inset(0% 50% 0% 50%)" }}>
        <video ref={videoRef} muted playsInline preload="metadata" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <FeaturedTeaser onSelect={setSelected} />
      <VideoRevealSection />
      <MarqueeSection />
      <FooterSection />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
