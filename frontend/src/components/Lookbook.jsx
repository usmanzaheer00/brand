import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../images";

// Pin positions (percent of the photo). Adjust to match your own lookbook image.
const PINS = [
  { x: "48%", y: "28%" },
  { x: "52%", y: "56%" },
  { x: "47%", y: "84%" },
];

export default function Lookbook({ products }) {
  const [active, setActive] = useState(null);
  const p = active !== null ? products[active] : null;

  return (
    <section className="section" id="lookbook">
      <div className="section__head">
        <h2>Shop the Look</h2>
        <span className="eyebrow muted">Lookbook · AW26</span>
      </div>

      <div className="lookbook">
        <img src={IMAGES.look} alt="Lookbook" />
        {products.slice(0, PINS.length).map((_, i) => (
          <button
            key={i}
            className="pin"
            style={{ left: PINS[i].x, top: PINS[i].y }}
            onClick={() => setActive(i)}
            aria-label={`View piece ${i + 1}`}
          >
            +
          </button>
        ))}
      </div>

      <div className={`overlay ${p ? "show" : ""}`} onClick={() => setActive(null)} />
      <aside className={`drawer ${p ? "open" : ""}`}>
        <div className="drawer__head">
          <span className="eyebrow">In this look</span>
          <button className="eyebrow" onClick={() => setActive(null)}>Close</button>
        </div>
        {p && (
          <div className="drawer__body" style={{ paddingTop: 24 }}>
            <img src={p.images[0]} alt={p.name} style={{ aspectRatio: "3/4", objectFit: "cover" }} />
            <div className="row" style={{ marginTop: 16 }}>
              <span>{p.name}</span><span>${p.price}</span>
            </div>
            <p className="muted" style={{ margin: "4px 0 20px" }}>{p.material} · {p.fit} fit</p>
            <Link to={`/product/${p.slug}`} className="btn btn--solid btn--full">View piece</Link>
          </div>
        )}
      </aside>
    </section>
  );
}