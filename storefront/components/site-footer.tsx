import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-brand">
      <Link href="/" aria-label="Shree Fashion home"><img src="/logo.webp" alt="Shree Fashion" loading="lazy" /></Link>
    </div>
    <nav className="footer-links" aria-label="Footer navigation">
      <Link href="/products">Shop all</Link>
      <Link href="/products?category=new-arrivals">New arrivals</Link>
      <Link href="/products?category=kurta-sets">Kurta sets</Link>
      <Link href="/account">Account</Link>
    </nav>
    <nav className="footer-links" aria-label="Policies">
      <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
      <Link href="/shipping-policy" target="_blank" rel="noopener noreferrer">Shipping Policy</Link>
      <Link href="/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</Link>
      <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
    </nav>
    <div className="footer-contact">
      <span>Have a question?</span>
      <a className="contact-link" href="mailto:karanssu446@gmail.com">
        <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3z" /><path d="m3 6 9 7 9-7" /></svg>
        <span>karanssu446@gmail.com</span>
      </a>
      <a className="contact-link" href="tel:+919024827421">
        <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5 10 3l2 5-2.2 1.7a15.2 15.2 0 0 0 4.5 4.5L16 12l5 2-.5 2.8c-.3 1.7-1.8 2.7-3.4 2.5C10.1 18.4 5.6 13.9 4.7 7c-.2-1.7.8-3.2 2.5-3.5Z" /></svg>
        <span>90248 27421</span>
      </a>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Shree Fashion</span><span>Made with care in India</span></div>
  </footer>;
}
