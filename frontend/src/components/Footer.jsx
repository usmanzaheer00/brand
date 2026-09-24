import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cols">
        <div>
          <h4 className="eyebrow">Client Service</h4>
          <ul>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">The Brand</h4>
          <ul>
            <li><a href="#">Sustainability</a></li>
            <li><a href="/#lookbook">Lookbook</a></li>
            <li><a href="#">Stores</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">Legal &amp; Accessibility</h4>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">Follow</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><Link to="/#newsletter">Newsletter</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} Atelier 09. All rights reserved.</span>
        <select aria-label="Currency" defaultValue="USD">
          <option value="USD">USD $</option>
          <option value="PKR">PKR ₨</option>
          <option value="EUR">EUR €</option>
        </select>
      </div>
    </footer>
  );
}