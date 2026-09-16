"use client";

import { useState } from "react";
import type { Product } from "@/lib/supabase/types";
import { useCart } from "./cart-provider";

export function AddToBag({ product, size, color }: { product: Product; size?: string; color?: string }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const add = () => {
    addItem(product, { size, color });
    setAdded(true);
  };
  return <button className="add-button" onClick={add} disabled={product.stock < 1}>{product.stock < 1 ? "Sold out" : added ? "Added to bag" : "Add to bag"}</button>;
}
