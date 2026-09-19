"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BagLink } from "./bag-link";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="announcement">
          <span>Complimentary shipping on orders above ₹1499</span>
        </div>

        <nav className="nav-shell" aria-label="Main navigation">
          {/* Left: Mobile hamburger + Brand logo */}
          <div className="nav-left">
            <button
              type="button"
              className="nav-menu-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>

            <Link href="/" className="nav-logo-link" aria-label="Shree Fashion home">
              <img src="/logo.webp" alt="Shree Fashion" className="nav-logo" />
            </Link>
          </div>

          {/* Centre nav links */}
          <div className="nav-links">
            <Link href="/products" className={pathname === "/products" ? "active" : ""}>Shop all</Link>
            <Link href="/products?category=new-arrivals">New arrivals</Link>
            <Link href="/products?category=kurta-sets">Kurta sets</Link>
          </div>

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

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={`mobile-nav-drawer ${mobileOpen ? "open" : ""}`}
        aria-label="Mobile navigation drawer"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav-head">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Shree Fashion home" className="mobile-nav-logo-wrap">
            <img src="/logo.webp" alt="Shree Fashion" className="mobile-nav-logo" />
          </Link>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-body">
          <Link href="/products" className={`mobile-nav-item ${pathname === "/products" ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
            <span>Shop all</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
          <Link href="/products?category=new-arrivals" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <span>New arrivals</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
          <Link href="/products?category=kurta-sets" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <span>Kurta sets</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
          <Link href="/products?category=festive" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <span>Festive edit</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
          <div className="mobile-nav-divider" />
          <Link href="/account" className={`mobile-nav-item ${pathname === "/account" ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
            <span>My Account</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
          <Link href="/cart" className={`mobile-nav-item ${pathname === "/cart" ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
            <span>Shopping Cart</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        </div>

        <div className="mobile-nav-foot">
          <p className="mobile-nav-highlight">
            Complimentary shipping over ₹1499
          </p>
          <a href="https://wa.me/919024827421" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            <span>Need help? Chat with us on WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  );
}
