import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, setOpen } = useCart();
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setSearching(false);
    setQ("");
  };

  return (
    <>
      <div className="utility eyebrow">
        Complimentary standard delivery on all orders over $150
      </div>
      <header className="header">
        <nav className="header__left">
          <Link to="/shop?gender=women">Women</Link>
          <Link to="/shop?gender=men">Men</Link>
          <a href="/#lookbook" className="hide-sm">Lookbook</a>
          <a href="/#about" className="hide-sm">About</a>
        </nav>

        <Link to="/" className="wordmark">Atelier 09</Link>

        <div className="header__right">
          {searching ? (
            <form onSubmit={submit}>
              <input
                className="search"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onBlur={() => !q && setSearching(false)}
                placeholder="Search"
              />
            </form>
          ) : (
            <button onClick={() => setSearching(true)}>Search</button>
          )}
          <button className="hide-sm" onClick={() => alert("Accounts: next step!")}>Account</button>
          <button onClick={() => setOpen(true)}>Bag ({count})</button>
        </div>
      </header>
    </>
  );
}