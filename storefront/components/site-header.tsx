import Link from "next/link";
import { BagLink } from "./bag-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">Complimentary shipping on orders above ₹999</div>
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Shree Fashion home">SHREE <span>FASHION</span></Link>
        <div className="nav-links">
          <Link href="/products">Shop all</Link>
          <Link href="/products?category=new-arrivals">New arrivals</Link>
          <Link href="/products?category=kurta-sets">Kurta sets</Link>
        </div>
        <BagLink />
      </nav>
    </header>
  );
}
