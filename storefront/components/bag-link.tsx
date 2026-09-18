"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function BagLink() {
  const { itemCount } = useCart();
  return <Link className="bag-link" href="/cart" aria-label={`Shopping cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`} title="Shopping cart">
    <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 5h2l1.7 9.2a2 2 0 0 0 2 1.8h7.9a2 2 0 0 0 1.9-1.5L20.5 8H7" />
      <circle cx="10" cy="19" r="1.2" />
      <circle cx="17" cy="19" r="1.2" />
    </svg>
    <span className="cart-count" aria-hidden="true">{itemCount}</span>
  </Link>;
}
