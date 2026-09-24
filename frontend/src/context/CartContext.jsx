import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const key = `${item.id}-${item.size}-${item.color}`;
    setItems((prev) =>
      prev.find((i) => i.key === key)
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, key, qty: 1 }]
    );
    setOpen(true);
  };

  const updateQty = (key, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, addItem, updateQty, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}