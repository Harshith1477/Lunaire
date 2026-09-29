"use client";

// Shared UI: constants, header, cards, modal, marquee, footer.
// npm install gsap lenis

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { NEW_ARRIVALS } from "../data/products";
import { useCart, BagIcon } from "./cart";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const CREAM = "#FAFAF8";
export const MAROON = "#8B1A2B";
export const INK = "#111110";

// Display: Vintage Halloween (custom OTF in /public/fonts, @font-face in
// app/layout.jsx) · Body: Roboto · Prices/labels: Roboto Mono
export const serif = {
  fontFamily: `'Vintage Halloween', 'Lobster Two', serif`,
};
export const sans = {
  fontFamily: `'Roboto', 'Helvetica Neue', Arial, sans-serif`,
};
export const mono = {
  fontFamily: `'Roboto Mono', monospace`,
};

// Mount once per page: Lenis smooth scroll synced with ScrollTrigger
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

export function LogoMark({ size = 28, color = MAROON }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="14" cy="14" r="10.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M18 5.5a10.5 10.5 0 1 1-8 0 8.5 8.5 0 1 0 8 0Z"
        fill={color}
        transform="rotate(38 14 14)"
      />
    </svg>
  );
}

// overlay: absolute over hero video (homepage). false: in-flow (subpages).
export function SiteHeader({ overlay = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={
          (overlay ? "absolute inset-x-0 top-0 " : "relative ") +
          "z-40 pointer-events-auto flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8"
        }
        style={{ color: MAROON, ...sans }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span
            className="text-lg font-semibold uppercase leading-none tracking-wide sm:text-xl"
            style={serif}
          >
            Lunaire
          </span>
        </Link>

        <div className="flex items-center gap-6 rounded-full bg-white/60 px-5 py-2.5 backdrop-blur-md shadow-sm sm:gap-12">
          <Link
            href="/products"
            className="text-[11px] font-medium uppercase tracking-[0.25em] transition-opacity hover:opacity-60 sm:text-xs"
            style={mono}
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-[11px] font-medium uppercase tracking-[0.25em] transition-opacity hover:opacity-60 sm:text-xs"
            style={mono}
          >
            About
          </Link>
          <CartButton />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-6 w-8 cursor-pointer flex-col items-end justify-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <span className="h-px w-8 transition-transform" style={{ backgroundColor: MAROON, transform: menuOpen ? "rotate(45deg) translate(2px, 3px)" : "none" }} />
            <span className="h-px w-8 transition-transform" style={{ backgroundColor: MAROON, transform: menuOpen ? "rotate(-45deg) translate(2px, -3px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile / Slide-down Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF8]/95 backdrop-blur-md p-8" style={sans}>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 text-2xl font-light text-[#111110] hover:opacity-60"
          >
            ×
          </button>
          <nav className="flex flex-col items-center gap-8 text-center">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-3xl uppercase tracking-widest hover:text-[#8B1A2B] transition-colors"
              style={serif}
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-3xl uppercase tracking-widest hover:text-[#8B1A2B] transition-colors"
              style={serif}
            >
              All Products
            </Link>
            <Link
              href="/products?category=Rings"
              onClick={() => setMenuOpen(false)}
              className="text-xl uppercase tracking-widest text-black/70 hover:text-[#8B1A2B]"
              style={mono}
            >
              Rings
            </Link>
            <Link
              href="/products?category=Bands"
              onClick={() => setMenuOpen(false)}
              className="text-xl uppercase tracking-widest text-black/70 hover:text-[#8B1A2B]"
              style={mono}
            >
              Bands
            </Link>
            <Link
              href="/products?category=Signets"
              onClick={() => setMenuOpen(false)}
              className="text-xl uppercase tracking-widest text-black/70 hover:text-[#8B1A2B]"
              style={mono}
            >
              Signets
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-3xl uppercase tracking-widest hover:text-[#8B1A2B] transition-colors mt-4"
              style={serif}
            >
              About Lunaire
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function CartButton() {
  const cart = useCart();
  if (!cart) return null;
  return (
    <button
      type="button"
      onClick={() => cart.setOpen(true)}
      aria-label={`Open cart (${cart.count} items)`}
      className="relative transition-opacity hover:opacity-60"
      style={{ color: MAROON }}
    >
      <BagIcon />
      {cart.count > 0 && (
        <span
          className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] leading-none text-white"
          style={{ ...mono, backgroundColor: MAROON }}
        >
          {cart.count}
        </span>
      )}
    </button>
  );
}

export function SectionHeading({ children }) {
  return (
    <h2
      className="px-6 pb-8 pt-16 uppercase text-3xl sm:px-10 sm:text-4xl"
      style={{ ...serif, color: INK, fontWeight: 500 }}
    >
      {children}
    </h2>
  );
}

// Card tones rotate by index; glow loosely matches the stone
// (override per product with a `glow` field in the data if needed).
const CARD_TONES = ["#FAF6F0", "#F2F0EC", "#F5EEEA"];
const CARD_GLOWS = [
  "rgba(139,26,43,0.14)", // ruby / garnet
  "rgba(30,58,138,0.12)", // sapphire
  "rgba(125,125,135,0.14)", // stoneless silver
];

// Neutral placeholder if a product image fails to load
export const IMG_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='#F2F0EC'/><circle cx='100' cy='100' r='42' fill='none' stroke='#C9C5BE' stroke-width='6'/></svg>`
  );

// Editorial card: rounded image tile (soft tone + glow + hover-reveal
// ADD TO CART), text sits on the page background — no bounding box.
export function ProductCard({ p, onSelect, idx = 0 }) {
  const tone = CARD_TONES[idx % 3];
  const glow = p.glow || CARD_GLOWS[idx % 3];
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    cart?.add(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group w-full text-center">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect && onSelect(p)}
        onKeyDown={(e) => e.key === "Enter" && onSelect && onSelect(p)}
        className="relative w-full cursor-pointer overflow-hidden rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-[#8B1A2B]/60 hover:shadow-[0_14px_36px_rgba(17,17,16,0.14)] sm:p-5"
        style={{ backgroundColor: tone }}
      >
        {/* Radial ambient glow behind the ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
        />
        <img
          src={p.img}
          alt={p.name}
          loading={idx < 4 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={idx < 4 ? "high" : "auto"}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const el = e.currentTarget;
            if (p.raw && el.src !== p.raw) {
              el.src = p.raw;
            } else if (el.src !== IMG_FALLBACK) {
              el.src = IMG_FALLBACK;
            }
          }}
          className="relative aspect-square w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          style={{ minHeight: '200px' }}
        />
        {/* Barely-there maker's mark — neutral gray */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 right-2.5 z-[5] opacity-35"
        >
          <LogoMark size={20} color="#8A8781" />
        </span>
        {/* Touch & Hover ADD TO CART */}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute inset-x-4 bottom-4 z-10 rounded-full py-2.5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:opacity-90 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:inset-x-5 sm:bottom-5"
          style={{ ...mono, backgroundColor: added ? MAROON : INK }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
      <h3
        className="mt-3 uppercase tracking-wide cursor-pointer"
        onClick={() => onSelect && onSelect(p)}
        style={{ ...serif, color: INK, fontSize: 18, fontWeight: 500 }}
      >
        {p.name}
        {/* Maroon underline accent, grows on hover */}
        <span
          className="mx-auto mt-1 block h-px w-0 transition-all duration-300 group-hover:w-8"
          style={{ backgroundColor: MAROON }}
          aria-hidden="true"
        />
      </h3>
      <p
        className="mt-1 text-[rgba(17,17,16,0.65)] transition-colors duration-300 group-hover:text-[#8B1A2B]"
        style={{ fontSize: 16, ...mono }}
      >
        {p.price}
      </p>
    </div>
  );
}

export function ProductModal({ product, onClose }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const [enquired, setEnquired] = useState(false);

  useEffect(() => {
    if (!product) return;
    setAdded(false);
    setEnquired(false);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div
        className="relative z-10 grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-auto rounded-3xl p-6 shadow-2xl sm:grid-cols-2 sm:p-10"
        style={{ backgroundColor: CREAM }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: INK }}
        >
          ×
        </button>
        <div className="flex items-center justify-center rounded-2xl p-4" style={{ backgroundColor: "#F2F0EC" }}>
          <img
            src={product.img}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              el.src = product.raw && el.src !== product.raw ? product.raw : IMG_FALLBACK;
            }}
            className="mx-auto aspect-square w-full max-w-[320px] object-contain"
          />
        </div>
        <div className="flex flex-col justify-center text-left">
          {product.category && (
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ ...mono, color: MAROON }}>
              {product.category}
            </span>
          )}
          <h3 className="mt-1 uppercase text-2xl sm:text-3xl" style={{ ...serif, color: INK, fontWeight: 500 }}>
            {product.name}
          </h3>
          <p className="mt-2 text-lg font-medium" style={{ color: MAROON, ...mono }}>{product.price}</p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(17,17,16,0.7)" }}>
            {product.desc}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                cart?.add(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-xs uppercase tracking-[0.22em] text-white transition-all hover:opacity-90"
              style={{ ...mono, backgroundColor: added ? MAROON : INK }}
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>

            <button
              type="button"
              onClick={() => setEnquired(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white"
              style={{ borderColor: "rgba(17,17,16,0.3)", color: INK, ...mono }}
            >
              {enquired ? "Inquiry Received ✓" : "Enquire About Piece"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scrolling product-name strip
export function MarqueeSection() {
  const items = NEW_ARRIVALS.map((p) => p.name);
  const row = [...items, ...items];
  return (
    <section
      className="overflow-hidden border-y py-6 sm:py-8"
      style={{ backgroundColor: CREAM, borderColor: "rgba(17,17,16,0.15)" }}
    >
      <style>{`
        @keyframes lunaire-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-max items-center whitespace-nowrap"
        style={{ animation: "lunaire-marquee 24s linear infinite" }}
      >
        {row.map((name, i) => (
          <span key={i} className="flex items-center">
            <span className="uppercase text-3xl sm:text-5xl" style={{ ...serif, color: MAROON, fontWeight: 500 }}>
              {name}
            </span>
            <span className="mx-6 text-xl sm:mx-10" style={{ color: MAROON, opacity: 0.5 }} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer style={{ backgroundColor: CREAM, color: INK, ...sans }}>
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-32">
        <p className="text-2xl leading-snug sm:text-3xl" style={{ ...serif, fontWeight: 500 }}>
          Cast in shadow, finished by hand. Every Lunaire piece is measured,
          poured and polished in small batches — nothing more than it needs
          to be, nothing less than it should be.
        </p>
        <Link
          href="/about"
          className="mt-10 inline-block text-[11px] uppercase tracking-[0.25em] underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{ color: MAROON }}
        >
          The House of Lunaire
        </Link>
      </div>

      <div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-10 border-t px-6 py-14 sm:grid-cols-4"
        style={{ borderColor: "rgba(17,17,16,0.15)" }}
      >
        <div className="flex items-start gap-2.5">
          <LogoMark />
          <span
            className="uppercase leading-none tracking-wide"
            style={{ ...serif, color: MAROON, fontSize: 18, fontWeight: 600 }}
          >
            Lunaire
          </span>
        </div>
        {[
          {
            title: "Collections",
            links: [
              { name: "Rings", href: "/products?category=Rings" },
              { name: "Bands", href: "/products?category=Bands" },
              { name: "Signets", href: "/products?category=Signets" },
              { name: "All Pieces", href: "/products" },
            ],
          },
          {
            title: "House",
            links: [
              { name: "About", href: "/about" },
              { name: "Craft", href: "/about" },
              { name: "Journal", href: "/about" },
              { name: "Ateliers", href: "/about" },
            ],
          },
          {
            title: "Support",
            links: [
              { name: "Contact", href: "#" },
              { name: "Shipping", href: "#" },
              { name: "Care Guide", href: "#" },
              { name: "Sizing", href: "#" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] uppercase tracking-[0.25em]" style={{ color: MAROON }}>
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                    style={{ color: INK }}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="overflow-hidden px-6">
        <p
          className="select-none text-center uppercase leading-none text-[22vw] sm:text-[18vw]"
          style={{ ...serif, color: MAROON, fontWeight: 600, opacity: 0.9 }}
          aria-hidden="true"
        >
          Lunaire
        </p>
      </div>
      <div
        className="flex flex-col items-center justify-between gap-3 border-t px-6 py-6 sm:flex-row sm:px-10"
        style={{ borderColor: "rgba(17,17,16,0.15)" }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
          © 2026 Lunaire. All rights reserved.
        </p>
        <div className="flex gap-8">
          {["Instagram", "Pinterest", "Privacy"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
              style={{ color: INK }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
