import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route
            path="*"
            element={
              <div className="section">
                <p>Page not found.</p>
                <Link to="/" className="link-u">Return home</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}