import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/supabase/types";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("*").eq("slug", params.slug).maybeSingle();
  if (!data) notFound();
  return <ProductDetails product={data as Product} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("name, description").eq("slug", params.slug).maybeSingle();
  const product = data as Pick<Product, "name" | "description"> | null;
  return product ? { title: product.name, description: product.description ?? `Shop ${product.name} at Shree Fashion` } : {};
}
