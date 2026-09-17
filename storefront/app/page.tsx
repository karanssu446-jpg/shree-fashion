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
          <img className="hero-model hero-model-one" src="/model_1.png" alt="" />
          <img className="hero-model hero-model-two" src="/model_2.png" alt="" />
          <img className="hero-model hero-model-three" src="/model_3.png" alt="" />
          <img className="hero-model hero-model-four" src="/model_4.png" alt="" />
          <img className="hero-model hero-model-five" src="/model_5.png" alt="" />
          <img className="hero-model hero-model-six" src="/model_6.png" alt="" />
          <img className="hero-model hero-model-seven" src="/model_7.png" alt="" />
          <img className="hero-model hero-model-eight" src="/model_8.png" alt="" />
          <img className="hero-model hero-model-nine" src="/model_9.png" alt="" />
          <img className="hero-model hero-model-ten" src="/model_10.png" alt="" />
          <img className="hero-model hero-model-eleven" src="/model_11.png" alt="" />
        </div>
      </section>
      <section className="intro">
        <p className="eyebrow">The Shree edit</p>
        <h2>Effortless Indian wear</h2>
        <p>Pieces to wear often, love for longer, and make entirely your own.</p>
      </section>
      <section className="collection-section">
        <div className="section-heading"><div><p className="eyebrow">Just in</p><h2>New arrivals</h2></div><Link href="/products">View all <span>→</span></Link></div>
        {products.length ? <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-products"><p>Our latest collection is being prepared.</p><Link href="/products" className="text-link">Browse all products</Link></div>}
      </section>
      <section className="value-strip">
        <div><span>01</span><h3>Considered design</h3><p>Details that make everyday dressing feel special.</p></div>
        <div><span>02</span><h3>Made to be worn</h3><p>Comfort, confidence, and room to move.</p></div>
        <div><span>03</span><h3>Delivered with care</h3><p>Secure online payments and reliable delivery.</p></div>
      </section>
    </>;
}
