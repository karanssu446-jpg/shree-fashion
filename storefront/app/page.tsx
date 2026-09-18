import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/supabase/types";

export default async function HomePage() {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false }).limit(8);
  const products = (data ?? []) as Product[];
    return <>
      <section className="hero">
        <div className="hero-models" aria-hidden="true">
          <img className="hero-model hero-model-1" src="/model_1.webp" alt="" />
          <img className="hero-model hero-model-2" src="/model_2.webp" alt="" />
          <img className="hero-model hero-model-8" src="/model_8.webp" alt="" />
          <img className="hero-model hero-model-9" src="/model_7.webp" alt="" />
        </div>
        <div className="hero-foot">
          <Link href="/products" className="button-dark">Shop now <span>→</span></Link>
        </div>
      </section>

      <div className="trust-strip" aria-hidden="true">
        <div className="trust-track">
          <span>Complimentary shipping over ₹1499</span>
          <span>Secure payments via Razorpay</span>
          <span>Easy 7-day returns</span>
          <span>Handpicked fabrics, made to last</span>
          <span>Complimentary shipping over ₹1499</span>
          <span>Secure payments via Razorpay</span>
          <span>Easy 7-day returns</span>
          <span>Handpicked fabrics, made to last</span>
        </div>
      </div>

      <section className="intro">
        <p className="eyebrow">The Shree edit</p>
        <h2>Effortless Indian wear</h2>
        <p>Pieces to wear often, love for longer, and make entirely your own.</p>
      </section>

      <section className="category-section">
        <div className="section-heading"><div><h2>Find your fit</h2></div></div>
        <div className="category-grid">
          <Link href="/products?category=kurta-sets" className="category-tile">
            <img src="/model_3.webp" alt="Kurta sets" loading="lazy" />
            <div className="category-copy"><span>Everyday</span><h3>Kurta sets</h3><em>Shop now</em></div>
          </Link>
          <Link href="/products?category=co-ords" className="category-tile">
            <img src="/model_6.webp" alt="Co-ord sets" loading="lazy" />
            <div className="category-copy"><span>Easy layering</span><h3>Co-ord sets</h3><em>Shop now</em></div>
          </Link>
          <Link href="/products?category=festive" className="category-tile">
            <img src="/model_7.webp" alt="Festive wear" loading="lazy" />
            <div className="category-copy"><span>Occasion wear</span><h3>Festive edit</h3><em>Shop now</em></div>
          </Link>
        </div>
      </section>

      <section className="collection-section">
        <div className="section-heading"><div><p className="eyebrow">Just in</p><h2>New arrivals</h2></div><Link href="/products">View all <span>→</span></Link></div>
        {products.length ? <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-products"><p>Our latest collection is being prepared.</p><Link href="/products" className="text-link">Browse all products</Link></div>}
      </section>

      <section className="lookbook">
        <div className="lookbook-images" aria-hidden="true">
          <img src="/model_5.webp" alt="" loading="lazy" />
          <img src="/model_4.webp" alt="" loading="lazy" />
        </div>
        <div className="lookbook-copy">
          <p className="eyebrow">The lookbook</p>
          <h2>Dressed for the everyday, ready for the occasion</h2>
          <p>Considered silhouettes and hand-finished details, cut from fabrics that soften with every wear.</p>
          <p><Link href="/products" className="text-link">Explore the full collection →</Link></p>
        </div>
      </section>

      <section className="value-strip">
        <div><span>01</span><h3>Considered design</h3><p>Details that make everyday dressing feel special.</p></div>
        <div><span>02</span><h3>Made to be worn</h3><p>Comfort, confidence, and room to move.</p></div>
        <div><span>03</span><h3>Delivered with care</h3><p>Secure online payments and reliable delivery.</p></div>
      </section>

      <section className="promo-band">
        <p className="eyebrow">New season</p>
        <h2>Your everyday wardrobe, reimagined</h2>
        <p>Discover the pieces everyone will be asking about this season.</p>
        <Link href="/products" className="button-light">Shop the collection</Link>
      </section>
    </>;
}
