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

      <section className="testimonial-section">
        <div className="section-heading"><div><p className="eyebrow">Loved by our customers</p><h2>What they&apos;re saying</h2></div></div>
        <div className="testimonial-grid">
          <div className="testimonial-card"><div className="testimonial-stars">★★★★★</div><p>The fabric quality is so much better than what I usually find online. My kurta set fit perfectly and the colours look exactly like the photos.</p><div className="testimonial-person"><span className="testimonial-avatar">P</span><div><strong>Priya M.</strong><span>Jaipur</span></div></div></div>
          <div className="testimonial-card"><div className="testimonial-stars">★★★★★</div><p>Ordered a co-ord set for a family function and got so many compliments. Delivery was quick and the packaging felt genuinely premium.</p><div className="testimonial-person"><span className="testimonial-avatar">A</span><div><strong>Ananya R.</strong><span>Delhi</span></div></div></div>
          <div className="testimonial-card"><div className="testimonial-stars">★★★★★</div><p>Shree Fashion is now my go-to for festive wear. The embroidery detailing is beautiful and true to the pictures on the site.</p><div className="testimonial-person"><span className="testimonial-avatar">K</span><div><strong>Kavita S.</strong><span>Mumbai</span></div></div></div>
        </div>
      </section>

      <section className="value-strip">
        <div><span>01</span><h3>Considered design</h3><p>Details that make everyday dressing feel special.</p></div>
        <div><span>02</span><h3>Made to be worn</h3><p>Comfort, confidence, and room to move.</p></div>
        <div><span>03</span><h3>Delivered with care</h3><p>Secure online payments and reliable delivery.</p></div>
      </section>

      <section className="social-gallery">
        <div className="section-heading"><div><p className="eyebrow">Community</p><h2>@shreefashion</h2></div><a href="https://www.instagram.com/shreefashion656?stkn=NTBybmM2bGxuY3g0" target="_blank" rel="noopener noreferrer">Follow us <span>→</span></a></div>
        <div className="social-grid">
          {["model_2", "model_6", "model_8", "model_3"].map((image) => <a key={image} className="social-tile" href="https://www.instagram.com/shreefashion656?stkn=NTBybmM2bGxuY3g0" target="_blank" rel="noopener noreferrer"><img src={`/${image}.webp`} alt="Shree Fashion on Instagram" loading="lazy" /><div className="social-tile-overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg></div></a>)}
        </div>
      </section>

      <section className="promo-band">
        <img src="/community_section.webp" alt="Join the Shree Fashion WhatsApp Community" className="promo-band-img" />
        <div className="promo-band-overlay">
          <a href="https://chat.whatsapp.com/BrjFXiemC0z2oaecdTeylL" target="_blank" rel="noopener noreferrer" className="promo-whatsapp-btn" aria-label="Join Shree Fashion on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.964-1.422A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182A8.166 8.166 0 013.818 12a8.166 8.166 0 018.181-8.182A8.166 8.166 0 0120.182 12a8.166 8.166 0 01-8.183 8.182z"/></svg>
            Join the Community
          </a>
        </div>
      </section>
    </>;
}
