import Link from "next/link";
import type { Product } from "@/lib/supabase/types";
import { formatPrice, productImage } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const originalPrice = product.compare_at_price && Number(product.compare_at_price) > Number(product.price);
  return <article className="product-card">
    <Link href={`/products/${product.slug}`} className="product-image-wrap">
      <img src={productImage(product)} alt={product.name} className="product-image" loading="lazy" />
      {originalPrice && <span className="sale-chip">Sale</span>}
    </Link>
    <div className="product-card-info"><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p>{formatPrice(product.price)} {originalPrice && <del>{formatPrice(product.compare_at_price)}</del>}</p></div>
  </article>;
}
