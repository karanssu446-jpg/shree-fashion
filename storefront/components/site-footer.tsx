import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-brand">
      <Link href="/" aria-label="Shree Fashion home"><img src="/logo.webp" alt="Shree Fashion" /></Link>
    </div>
    <nav className="footer-links" aria-label="Footer navigation">
      <Link href="/products">Shop all</Link>
      <Link href="/products?category=new-arrivals">New arrivals</Link>
      <Link href="/products?category=kurta-sets">Kurta sets</Link>
      <Link href="/account">Account</Link>
    </nav>
    <nav className="footer-links" aria-label="Policies">
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/shipping-policy">Shipping Policy</Link>
      <Link href="/refund-policy">Refund Policy</Link>
      <Link href="/terms-of-service">Terms of Service</Link>
    </nav>
    <div className="footer-contact">
      <span>Have a question?</span>
      <a href="mailto:hello@shree-fashion.com">hello@shree-fashion.com</a>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Shree Fashion</span><span>Made with care in India</span></div>
  </footer>;
}
