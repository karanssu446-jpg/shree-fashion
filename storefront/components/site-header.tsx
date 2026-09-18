import Link from "next/link";
import { BagLink } from "./bag-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">Complimentary shipping on orders above ₹1499</div>
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Left nav links */}
        <div className="nav-links">
          <Link href="/products">Shop all</Link>
          <Link href="/products?category=new-arrivals">New arrivals</Link>
          <Link href="/products?category=kurta-sets">Kurta sets</Link>
        </div>

        {/* Centre logo */}
        <Link href="/" className="nav-logo-link" aria-label="Shree Fashion home">
          <img src="/logo.webp" alt="Shree Fashion" className="nav-logo" />
        </Link>

        {/* Right: account icon + cart */}
        <div className="nav-actions">
          <Link href="/account" className="nav-icon-link" aria-label="My account" title="My account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </Link>
          <BagLink />
        </div>
      </nav>
    </header>
  );
}
