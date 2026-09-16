"use client";

import { useState } from "react";
import type { Product } from "@/lib/supabase/types";

export function AddToBag({ product, size, color }: { product: Product; size?: string; color?: string }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    const current = JSON.parse(localStorage.getItem("shree-fashion-cart") || "[]") as unknown[];
    localStorage.setItem("shree-fashion-cart", JSON.stringify([...current, { productId: product.id, name: product.name, price: product.price, image: product.images?.[0], size, color, quantity: 1 }]));
    setAdded(true);
  };
  return <button className="add-button" onClick={add} disabled={product.stock < 1}>{product.stock < 1 ? "Sold out" : added ? "Added to bag" : "Add to bag"}</button>;
}
