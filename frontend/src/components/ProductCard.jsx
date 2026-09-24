import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const quickAdd = (size) =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color: product.colors[0].name,
    });

  return (
    <article className="card">
      <div className="card__frame">
        <Link to={`/product/${product.slug}`} className="card__media">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          <img className="card__alt" src={product.images[1]} alt="" loading="lazy" />
          {product.is_new && <span className="tag eyebrow">New</span>}
        </Link>
        <div className="card__quick">
          {product.sizes.map((s) => (
            <button key={s} onClick={() => quickAdd(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="card__info">
        <div className="card__row">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
          <span>${product.price}</span>
        </div>
        <p className="muted">{product.material} · {product.fit} fit</p>
      </div>
    </article>
  );
}