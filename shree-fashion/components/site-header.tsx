import Link from "next/link";

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
        <Link className="bag-link" href="/cart">Bag <span aria-hidden="true">(0)</span></Link>
      </nav>
    </header>
  );
}
