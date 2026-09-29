"use client";

// Global cart: React Context + slide-in drawer.
// Wrap the app in <CartProvider> (done in app/layout.jsx).

import { createContext, useContext, useState } from "react";

const CREAM = "#FAFAF8";
const MAROON = "#8B1A2B";
const INK = "#111110";
const mono = { fontFamily: `'Roboto Mono', monospace` };
const display = { fontFamily: `'Vintage Halloween', 'Lobster Two', serif` };

export const parsePrice = (s) => Number(String(s).replace(/[^\d]/g, ""));
export const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // Adds qty 1, or increments if already in the cart
  const add = (p) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id);
      return found
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id: p.id, name: p.name, price: p.price, img: p.img, raw: p.raw, qty: 1 }];
    });

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * parsePrice(i.price), 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, count, subtotal, open, setOpen }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function BagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 8h12l-1 13H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function CartDrawer() {
  const cart = useCart();
  if (!cart) return null;
  const { items, remove, setQty, subtotal, open, setOpen } = cart;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />
      {/* Panel */}
      <aside
        className={
          "fixed inset-y-0 right-0 z-[70] flex w-[380px] max-w-full flex-col shadow-2xl transition-transform duration-300 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
        style={{ backgroundColor: CREAM }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: "rgba(17,17,16,0.15)" }}>
          <h3 className="uppercase text-xl" style={{ ...display, color: INK }}>
            Your Cart
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: INK }}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm" style={{ color: "rgba(17,17,16,0.6)" }}>
              Your cart is empty.
            </p>
          ) : (
            items.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-4 border-b py-4"
                style={{ borderColor: "rgba(17,17,16,0.1)" }}
              >
                <img
                  src={i.img}
                  alt={i.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (i.raw && el.src !== i.raw) el.src = i.raw;
                  }}
                  className="h-16 w-16 rounded-lg object-contain"
                  style={{ backgroundColor: "#F2F0EC" }}
                />
                <div className="flex-1">
                  <p className="text-sm uppercase" style={{ color: INK }}>{i.name}</p>
                  <p className="text-xs" style={{ ...mono, color: MAROON }}>{i.price}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border text-sm leading-none"
                      style={{ borderColor: "rgba(17,17,16,0.3)", color: INK }}
                      aria-label={`Decrease ${i.name} quantity`}
                    >
                      −
                    </button>
                    <span className="text-sm" style={mono}>{i.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border text-sm leading-none"
                      style={{ borderColor: "rgba(17,17,16,0.3)", color: INK }}
                      aria-label={`Increase ${i.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i.id)}
                  className="text-[10px] uppercase tracking-[0.15em] opacity-50 transition-opacity hover:opacity-100"
                  style={{ ...mono, color: INK }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t px-6 py-5" style={{ borderColor: "rgba(17,17,16,0.15)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em]" style={{ ...mono, color: INK }}>
              Subtotal
            </span>
            <span className="text-lg" style={{ ...mono, color: MAROON }}>
              {formatINR(subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert("Checkout coming soon")}
            className="mt-4 w-full rounded-full py-3 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
            style={{ ...mono, backgroundColor: INK }}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
