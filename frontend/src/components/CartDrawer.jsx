import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api";

const FREE_OVER = 150;

export default function CartDrawer() {
  const { items, open, setOpen, updateQty, clear, subtotal } = useCart();
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  const close = () => {
    setOpen(false);
    setTimeout(() => setOrder(null), 400);
  };

  const checkout = async () => {
    setBusy(true);
    setError(false);
    try {
      const o = await createOrder(
        items.map((i) => ({ product_id: i.id, size: i.size, color: i.color, qty: i.qty }))
      );
      setOrder(o);
      clear();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  const remaining = Math.max(0, FREE_OVER - subtotal);
  const progress = Math.min(100, (subtotal / FREE_OVER) * 100);

  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={close} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer__head">
          <span className="eyebrow">Your Bag</span>
          <button className="eyebrow" onClick={close}>Close</button>
        </div>

        <div className="drawer__body">
          {order && items.length === 0 && (
            <div style={{ padding: "32px 0" }}>
              <h3 style={{ fontSize: 30 }}>Thank you.</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                Order #{order.order_id} received. Total ${order.total}
                {order.shipping === 0 ? " (complimentary delivery)" : ` (incl. $${order.shipping} delivery)`}.
              </p>
            </div>
          )}

          {!order && items.length === 0 && (
            <p className="muted" style={{ padding: "32px 0" }}>Your bag is empty.</p>
          )}

          {items.map((i) => (
            <div className="line" key={i.key}>
              <Link to={`/product/${i.slug}`} onClick={close}>
                <img src={i.image} alt={i.name} />
              </Link>
              <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
                <div className="row"><span>{i.name}</span><span>${i.price * i.qty}</span></div>
                <span className="muted">{i.color} · {i.size}</span>
                <div className="qty">
                  <button onClick={() => updateQty(i.key, i.qty - 1)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => updateQty(i.key, i.qty + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="bar"><i style={{ width: `${progress}%` }} /></div>
            <p className="muted" style={{ fontSize: 12 }}>
              {remaining > 0
                ? `You are $${remaining} away from complimentary delivery.`
                : "Complimentary delivery applied."}
            </p>
            <div className="row"><span className="eyebrow">Subtotal</span><span>${subtotal}</span></div>
            {error && <p style={{ fontSize: 12 }}>Something went wrong. Is the backend running?</p>}
            <button className="btn btn--solid btn--full" onClick={checkout} disabled={busy}>
              {busy ? "Processing…" : "Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}