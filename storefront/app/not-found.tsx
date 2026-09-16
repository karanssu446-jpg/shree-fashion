import Link from "next/link";
export default function NotFound() { return <section className="not-found"><p className="eyebrow">404</p><h1>This piece has moved on.</h1><p>Let’s find another one you’ll love.</p><Link className="button-dark" href="/products">Explore collection</Link></section>; }
