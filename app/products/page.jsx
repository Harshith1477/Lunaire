"use client";

// /products — all 27 pieces with luxury filter, search, & sort controls.
// New Arrivals: auto-scrolling marquee (starts on mount, pauses on hover).
// Full Collection: responsive grid (4 / 2 / 1 columns) with live filtering.

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CREAM,
  MAROON,
  INK,
  sans,
  serif,
  mono,
  SmoothScroll,
  SiteHeader,
  SectionHeading,
  ProductCard,
  ProductModal,
  FooterSection,
} from "../../components/site";
import { NEW_ARRIVALS, ALL_PRODUCTS, CATEGORIES } from "../../data/products";

function parsePriceVal(priceStr) {
  return Number(String(priceStr).replace(/[^\d]/g, "")) || 0;
}

function ProductsGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const arrivalsRow = [...NEW_ARRIVALS, ...NEW_ARRIVALS];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    if (activeCategory !== "All") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sortBy === "low-high") {
      list = [...list].sort((a, b) => parsePriceVal(a.price) - parsePriceVal(b.price));
    } else if (sortBy === "high-low") {
      list = [...list].sort((a, b) => parsePriceVal(b.price) - parsePriceVal(a.price));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <>
      {/* ── New Arrivals: continuous auto-scroll ── */}
      <section className="overflow-hidden pb-10">
        <SectionHeading>New Arrivals</SectionHeading>
        <style>{`
          @keyframes lunaire-arrivals {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .lunaire-arrivals-track { will-change: transform; }
          .lunaire-arrivals-track:hover { animation-play-state: paused; }
        `}</style>
        <div
          className="lunaire-arrivals-track flex w-max gap-2 px-2"
          style={{ animation: "lunaire-arrivals 45s linear infinite" }}
        >
          {arrivalsRow.map((p, i) => (
            <div key={`${p.id}-${i}`} className="w-[280px] shrink-0 sm:w-[320px]">
              <ProductCard p={p} onSelect={setSelected} idx={i % NEW_ARRIVALS.length} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Filter & Search Controls ── */}
      <section className="px-6 pt-10 pb-6 sm:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#111110]/15 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    isActive
                      ? "text-white shadow-sm"
                      : "bg-white/60 text-[#111110] hover:bg-white"
                  }`}
                  style={{
                    ...mono,
                    backgroundColor: isActive ? INK : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-black/20 bg-white/70 px-4 py-2 pl-9 text-xs tracking-wide focus:border-black focus:outline-none"
                style={mono}
              />
              <svg
                className="absolute left-3 top-2.5 h-3.5 w-3.5 text-black/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-xs text-black/50 hover:text-black"
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-black/20 bg-white/70 px-4 py-2 text-xs tracking-wide focus:border-black focus:outline-none cursor-pointer"
              style={mono}
            >
              <option value="featured">Sort: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── Collection Grid ── */}
      <section className="px-2 pb-20">
        <div className="flex items-center justify-between px-4 pb-4">
          <SectionHeading>
            {activeCategory === "All" ? "Full Collection" : activeCategory}
          </SectionHeading>
          <span className="text-xs uppercase tracking-widest text-black/50" style={mono}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg uppercase" style={serif}>No pieces match your search.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-4 text-xs uppercase tracking-widest underline cursor-pointer"
              style={{ ...mono, color: MAROON }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {filteredProducts.map((p, i) => (
              <div
                key={p.id}
                className="w-full sm:w-[calc(50%-4px)] lg:w-[calc(25%-6px)]"
              >
                <ProductCard p={p} onSelect={setSelected} idx={i} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ambient brand video at the bottom of the products section */}
      <section className="px-2 pb-2">
        <video
          src="/products-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-[70vh] w-full rounded-2xl object-cover"
          style={{ backgroundColor: '#1a1a1a' }}
        />
      </section>

      <FooterSection />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default function ProductsPage() {
  return (
    <main style={{ backgroundColor: CREAM, ...sans }}>
      <SmoothScroll />
      <SiteHeader overlay={false} />
      <Suspense fallback={<div className="min-h-screen py-20 text-center">Loading collection...</div>}>
        <ProductsGrid />
      </Suspense>
    </main>
  );
}
