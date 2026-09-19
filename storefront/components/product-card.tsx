import Link from "next/link";
import type { Product } from "@/lib/supabase/types";
import { formatPrice, productImage } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.compare_at_price && Number(product.compare_at_price) > Number(product.price);
  const discount = isOnSale
    ? Math.round(100 - (Number(product.price) / Number(product.compare_at_price)) * 100)
    : null;

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        <img
          src={productImage(product)}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {/* Chips */}
        <div className="product-chips">
          {isOnSale && discount && (
            <span className="product-chip chip-sale">{discount}% off</span>
          )}
        </div>
        {/* Quick view overlay */}
        <div className="product-overlay" aria-hidden="true">
          <span className="product-overlay-label">View details</span>
        </div>
      </Link>

      <div className="product-card-info">
        <Link href={`/products/${product.slug}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {isOnSale && (
            <del className="price-original">{formatPrice(product.compare_at_price)}</del>
          )}
        </div>
      </div>
    </article>
  );
}
