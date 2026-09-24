import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";
import { IMAGES } from "../images";
import ProductCard from "../components/ProductCard";
import Lookbook from "../components/Lookbook";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [arrivals, setArrivals] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts({ new: true, limit: 8 })
      .then((d) => setArrivals(d.items))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__text">
          <span className="eyebrow muted">Autumn / Winter</span>
          <h1>The Tailoring<br />Collection</h1>
          <div className="hero__cta">
            <Link to="/shop?gender=women" className="btn">Explore Women</Link>
            <Link to="/shop?gender=men" className="btn">Explore Men</Link>
          </div>
        </div>
        <div className="hero__img">
          <img src={IMAGES.hero} alt="Autumn/Winter tailoring collection" />
        </div>
      </section>

      {/* Category gateway */}
      <section className="section">
        <div className="gateway">
          <Link to="/shop?gender=women" className="gate">
            <img src={IMAGES.women} alt="Women" />
            <div className="gate__cap">
              <h3>Women</h3>
              <span className="muted-light">Tailored Trousers · Oversized Poplin Shirts · Sculpted Denim</span>
              <span className="link-u" style={{ alignSelf: "flex-start" }}>Shop collection →</span>
            </div>
          </Link>
          <Link to="/shop?gender=men" className="gate">
            <img src={IMAGES.men} alt="Men" />
            <div className="gate__cap">
              <h3>Men</h3>
              <span className="muted-light">Pleated Trousers · Structured Overshirts · Straight-Leg Jeans</span>
              <span className="link-u" style={{ alignSelf: "flex-start" }}>Shop collection →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="section">
        <div className="section__head">
          <h2>New Arrivals</h2>
          <Link to="/shop?sort=newest" className="link-u">View all</Link>
        </div>
        {error && <p className="muted">Could not load products. Is the backend running on port 8000?</p>}
        <div className="grid grid--4">
          {arrivals.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial story */}
      <section className="section" id="about">
        <div className="story">
          <img src={IMAGES.craft} alt="Fabric and craft" />
          <div className="story__text">
            <span className="eyebrow muted">The Fabric &amp; Craft</span>
            <h2>Made slowly, from materials that last.</h2>
            <p className="muted">
              Every piece begins with the cloth. We work with mills that share our
              patience, and cut for movement first, silhouette second.
            </p>
            <ul className="story__list">
              <li><span>Japanese selvedge denim</span><span className="muted">Okayama</span></li>
              <li><span>Italian wool blends</span><span className="muted">Biella</span></li>
              <li><span>Organic heavyweight cotton</span><span className="muted">GOTS certified</span></li>
            </ul>
          </div>
        </div>
      </section>

      <Lookbook products={arrivals} />
      <Newsletter />
    </>
  );
}