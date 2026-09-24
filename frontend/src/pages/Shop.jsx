import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFilters, getProducts } from "../api";
import ProductCard from "../components/ProductCard";

const STEP = 8;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const gender = params.get("gender") || "";
  const category = params.get("category") || "";
  const fit = params.get("fit") || "";
  const size = params.get("size") || "";
  const sort = params.get("sort") || "featured";
  const q = params.get("q") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ categories: [], fits: [], sizes: [] });
  const [cols, setCols] = useState(4);
  const [visible, setVisible] = useState(STEP);
  const sentinel = useRef(null);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  useEffect(() => {
    getFilters().then(setFilters).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setVisible(STEP);
    getProducts({ gender, category, fit, size, sort, q })
      .then((d) => setItems(d.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [gender, category, fit, size, sort, q]);

  // Infinite scroll
  useEffect(() => {
    const el = sentinel.current;
    if (!el || visible >= items.length) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible((v) => v + STEP),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items.length, visible]);

  const title = q ? `“${q}”` : gender === "women" ? "Women" : gender === "men" ? "Men" : "All Pieces";
  const shown = Math.min(visible, items.length);

  return (
    <>
      <div className="shop__title">
        <h1>{title}</h1>
        <span className="eyebrow muted">{items.length} Pieces</span>
      </div>

      <div className="filterbar">
        <div className="tabs">
          {[["", "All"], ["women", "Women"], ["men", "Men"]].map(([v, label]) => (
            <button key={label} className={gender === v ? "on" : ""} onClick={() => setParam("gender", v)}>
              {label}
            </button>
          ))}
        </div>

        <select value={category} onChange={(e) => setParam("category", e.target.value)}>
          <option value="">Category</option>
          {filters.categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={fit} onChange={(e) => setParam("fit", e.target.value)}>
          <option value="">Fit</option>
          {filters.fits.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={size} onChange={(e) => setParam("size", e.target.value)}>
          <option value="">Size</option>
          {filters.sizes.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setParam("sort", e.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <div className="filterbar__right tabs">
          <button className={cols === 2 ? "on" : ""} onClick={() => setCols(2)}>2 Columns</button>
          <button className={cols === 4 ? "on" : ""} onClick={() => setCols(4)}>4 Columns</button>
        </div>
      </div>

      <div className="shop__grid">
        {!loading && items.length === 0 && <p className="muted">No pieces match your selection.</p>}
        <div className={`grid grid--${cols}`}>
          {items.slice(0, visible).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div ref={sentinel} style={{ height: 1 }} />
        {items.length > 0 && (
          <p className="count muted">Showing {shown} of {items.length} Pieces</p>
        )}
      </div>
    </>
  );
}