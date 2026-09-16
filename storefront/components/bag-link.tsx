"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function BagLink() {
  const { itemCount } = useCart();
  return <Link className="bag-link" href="/cart">Bag <span aria-label={`${itemCount} item${itemCount === 1 ? "" : "s"}`}>({itemCount})</span></Link>;
}
