const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options) {
  const res = await fetch(`${API_BASE}/api${path}`, options);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const getProducts = (params = {}) => {
  const clean = Object.entries(params).filter(([, v]) => v !== "" && v != null);
  return request(`/products?${new URLSearchParams(clean)}`);
};

export const getProduct = (slug) => request(`/products/${slug}`);
export const getFilters = () => request("/filters");

const post = (path, body) =>
  request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const subscribe = (email) => post("/newsletter", { email });
export const createOrder = (items) => post("/orders", { items });
