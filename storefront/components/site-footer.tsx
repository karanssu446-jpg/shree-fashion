import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><p>© {new Date().getFullYear()} Shree Fashion</p><div><Link href="/products">Shop</Link><a href="mailto:hello@shree-fashion.com">Contact</a></div></footer>;
}
