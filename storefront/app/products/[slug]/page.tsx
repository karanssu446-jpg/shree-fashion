import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetails } from "@/components/product-details";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/supabase/types";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("*").eq("slug", params.slug).maybeSingle();
  if (!data) notFound();
  return <ProductDetails product={data as Product} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("name, description, images, price").eq("slug", params.slug).maybeSingle();
  const product = data as Pick<Product, "name" | "description" | "images" | "price"> | null;
  if (!product) return {};
  const description = product.description ?? `Shop ${product.name} at Shree Fashion.`;
  return { title: product.name, description, alternates: { canonical: `/products/${params.slug}` }, openGraph: { type: "website", title: product.name, description, images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : undefined } };
}
