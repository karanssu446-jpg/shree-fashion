import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" aria-label="Shree Fashion home"><img src="/logo.webp" alt="Shree Fashion" loading="lazy" /></Link>
          <span className="footer-ornament" aria-hidden="true">◆</span>
          <p className="footer-about">Elegant Indian wear, made for every moment and designed to be loved for longer.</p>
          <div className="footer-social-row">
            <a href="https://www.instagram.com/shreefashion656?stkn=NTBybmM2bGxuY3g0" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/insta_logo.webp" alt="" loading="lazy" /></a>
            <a href="https://youtube.com/@shreefashion-123?si=Sj7gKtPEXA8Gm_lv" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src="/youtube_logo.webp" alt="" loading="lazy" /></a>
            <a href="https://www.facebook.com/share/1EAU7TCfjo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="/facebook_logo.webp" alt="" loading="lazy" /></a>
            <a href="mailto:karanssu446@gmail.com" aria-label="Email Shree Fashion" title="Email Shree Fashion"><img src="/mail.webp" alt="" loading="lazy" /></a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Shop">
          <p className="footer-heading">Shop</p>
          <span className="footer-heading-rule" aria-hidden="true" />
          <Link href="/products">All products</Link>
          <Link href="/products?category=new-arrivals">New arrivals</Link>
          <Link href="/products?category=kurta-sets">Kurta sets</Link>
          <Link href="/products?category=co-ords">Co-ord sets</Link>
          <Link href="/products?category=festive">Festive edit</Link>
        </nav>

        <nav className="footer-col" aria-label="Help and policies">
          <p className="footer-heading">Help</p>
          <span className="footer-heading-rule" aria-hidden="true" />
          <Link href="/account">My account</Link>
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
          <Link href="/shipping-policy" target="_blank" rel="noopener noreferrer">Shipping Policy</Link>
          <Link href="/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</Link>
          <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
        </nav>

      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shree Fashion. All rights reserved.</span>
      </div>
    </footer>
  );
}
