import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [p, setP] = useState(null);
  const [error, setError] = useState(false);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [needSize, setNeedSize] = useState(false);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    setP(null);
    setError(false);
    setSize(null);
    setNeedSize(false);
    getProduct(slug)
      .then((d) => {
        setP(d);
        setColor(d.colors[0]);
      })
      .catch(() => setError(true));
  }, [slug]);

  if (error)
    return (
      <div className="section">
        <p>This piece could not be found.</p>
        <Link to="/shop" className="link-u">Back to shop</Link>
      </div>
    );
  if (!p) return <div className="section muted">Loading…</div>;

  const add = () => {
    if (!size) return setNeedSize(true);
    addItem({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0],
      size,
      color: color.name,
    });
  };

  return (
    <div className="pdp">
      <div className="pdp__gallery">
        {p.images.map((src, i) => (
          <img key={i} src={src} alt={`${p.name} ${i + 1}`} className={i === 0 ? "wide" : ""} />
        ))}
      </div>

      <div className="pdp__panel">
        <div className="crumbs muted">
          <Link to="/shop">Shop</Link> / <Link to={`/shop?gender=${p.gender}`}>{p.gender}</Link> / {p.category}
        </div>

        <div>
          <h1>{p.name}</h1>
          <p style={{ marginTop: 8, fontSize: 16 }}>${p.price}</p>
        </div>

        <p className="muted">{p.description}</p>

        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Colour — <span className="muted">{color.name}</span></p>
          <div className="swatches">
            {p.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                aria-label={c.name}
                className={`swatch ${color.name === c.name ? "on" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="row" style={{ marginBottom: 10 }}>
            <span className="eyebrow">Size</span>
            <button className="link-u" onClick={() => setGuide(true)}>Size &amp; measurement guide</button>
          </div>
          <div className="sizes">
            {p.sizes.map((s) => (
              <button
                key={s}
                className={`size ${size === s ? "on" : ""}`}
                onClick={() => { setSize(s); setNeedSize(false); }}
              >
                {s}
              </button>
            ))}
          </div>
          {needSize && <p style={{ fontSize: 12, marginTop: 8 }}>Please select a size.</p>}
        </div>

        <button className="btn btn--solid btn--full" style={{ padding: "18px" }} onClick={add}>
          Add to bag
        </button>

        <div>
          <details open>
            <summary>Composition &amp; Care</summary>
            <p>{p.composition}</p>
          </details>
          <details>
            <summary>Fit &amp; Measurements</summary>
            <p>{p.fit_note}</p>
          </details>
          <details>
            <summary>Shipping &amp; Returns</summary>
            <p>Complimentary standard delivery on orders over $150. Returns accepted within 30 days in original condition.</p>
          </details>
        </div>
      </div>

      <div className={`overlay ${guide ? "show" : ""}`} onClick={() => setGuide(false)} />
      {guide && (
        <div className="modal">
          <div className="row" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 28 }}>Size guide</h3>
            <button className="eyebrow" onClick={() => setGuide(false)}>Close</button>
          </div>
          <table>
            <thead>
              <tr className="eyebrow muted">
                <th>Size</th><th>Chest (cm)</th><th>Waist (cm)</th><th>Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {p.size_guide.map((r) => (
                <tr key={r.size}>
                  <td>{r.size}</td><td>{r.chest}</td><td>{r.waist}</td><td>{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}