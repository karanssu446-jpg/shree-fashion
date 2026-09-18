import type { Product } from "@/lib/supabase/types";

export const formatPrice = (value: number | string | null | undefined) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));

export const productImage = (product: Pick<Product, "images">) =>
  product.images?.[0] || "/product-placeholder.png";
