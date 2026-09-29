// Product data: 27 pieces, prices in INR (Indian grouping)
export const DESC =
  "Hand-cast and hand-polished in the Lunaire atelier. Complete description coming soon.";

// Use direct high-speed image CDN URLs directly to avoid ad-blocker (i0.wp.com) issues
const optimize = (url) => url;

export function getCategory(name) {
  const lower = name.toLowerCase();
  if (lower.includes("band")) return "Bands";
  if (lower.includes("signet") || lower.includes("sigil") || lower.includes("seal")) return "Signets";
  if (lower.includes("ring")) return "Rings";
  return "Sculptural";
}

export const CATEGORIES = ["All", "Rings", "Bands", "Signets", "Sculptural"];

export const FULL_COLLECTION = [
  ["Obsidian Coil", "₹69,000", "https://i.postimg.cc/MHQxpwW5/product-1.png"],
  ["Void Arc", "₹72,500", "https://i.postimg.cc/j5G2XZ23/product-2.png"],
  ["Onyx Hex", "₹78,000", "https://i.postimg.cc/ZY842TM6/product-3.png"],
  ["Shadow Sigil", "₹84,500", "https://i.postimg.cc/RZDBKqNw/prodcut-4.png"],
  ["Eclipse Band", "₹71,000", "https://i.postimg.cc/PJ2cHFDM/prodcut-5.png"],
  ["Matte Skull", "₹95,000", "https://i.postimg.cc/FsCqn8NL/product-6.png"],
  ["Iron Halo", "₹76,500", "https://i.postimg.cc/7hWVmv0H/prodcut-7.png"],
  ["Noir Crest", "₹88,000", "https://i.postimg.cc/nh7kYPLd/product-8.png"],
  ["Raven Knot", "₹92,500", "https://i.postimg.cc/Qt6kdL6S/product-9.png"],
  ["Slate Orbit", "₹74,000", "https://i.postimg.cc/ZKvF4M6W/product-10.png"],
  ["Ash Signet", "₹81,500", "https://i.postimg.cc/K8yLFvZ0/product-11.png"],
  ["Cinder Loop", "₹69,500", "https://i.postimg.cc/MXJcWd80/product-12.png"],
  ["Umbra Ring", "₹1,05,000", "https://i.postimg.cc/jqwMvXZ9/prodcut-13.png"],
  ["Basalt Twist", "₹79,000", "https://i.postimg.cc/2SmTkfmK/prodcut-14.png"],
  ["Graphite Vow", "₹86,500", "https://i.postimg.cc/ryr95pwB/product-15.png"],
  ["Ember Seal", "₹1,12,000", "https://i.postimg.cc/dV4RJk5F/product-16.png"],
  ["Sable Ridge", "₹90,000", "https://i.postimg.cc/Qxq1qKGm/product-17.png"],
  ["Tempest Coil", "₹98,500", "https://i.postimg.cc/6Q8ZwH7z/product-18.png"],
  ["Dusk Facet", "₹1,24,000", "https://i.postimg.cc/RVGJtrKj/product-19.png"],
  ["Nocturne Band", "₹83,000", "https://i.postimg.cc/j5VDTRYh/product-20.png"],
].map(([name, price, img], i) => ({
  id: i + 1,
  name,
  price,
  category: getCategory(name),
  img: optimize(img),
  raw: img,
  desc: DESC,
}));

export const NEW_ARRIVALS = [
  ["Lunar Veil", "₹1,15,000", "https://i.postimg.cc/CLKLWRfp/product-21.png"],
  ["Crimson Heart", "₹1,38,000", "https://i.postimg.cc/q72k8nWt/product-22.png"],
  ["Midnight Prism", "₹1,52,000", "https://i.postimg.cc/zXM560rm/product-23.png"],
  ["Frost Ember", "₹1,19,500", "https://i.postimg.cc/fLwhmPx0/product-24.png"],
  ["Gilded Shadow", "₹1,65,000", "https://i.postimg.cc/qM9Vjqss/product-25.png"],
  ["Velvet Torc", "₹1,29,000", "https://i.postimg.cc/mDJfJrxs/product-26.png"],
  ["Astral Signet", "₹1,80,000", "https://i.postimg.cc/g02C0hds/product-27.png"],
].map(([name, price, img], i) => ({
  id: i + 21,
  name,
  price,
  category: getCategory(name),
  img: optimize(img),
  raw: img,
  desc: DESC,
}));

// Homepage featured carousel
export const FEATURED = FULL_COLLECTION.slice(0, 8);

export const ALL_PRODUCTS = [...FULL_COLLECTION, ...NEW_ARRIVALS];

